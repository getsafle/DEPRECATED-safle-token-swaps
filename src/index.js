/* eslint-disable class-methods-use-this */
/* eslint-disable no-use-before-define */
const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;
const ethers = require('ethers');
const EC = require('elliptic').ec;
const { keccak256 } = require('js-sha3');

const HELPER = require('./utils/helper');
const {
  kyberProxyContractAddress,
  KYBER_CURRENCY_URL,
  KYBER_GET_GAS_LIMIT_URL,
  REF_ADDRESS,
  ETH_TOKEN_ADDRESS,
  MAX_ALLOWANCE,
  ETHERSCAN_SERVICE_URL,
  ETHERSCAN_SECRET,
} = require('./config');
const { kyberProxyContractABI } = require('./constants/ABI/kyber-proxy-contract');
const { erc20Contract } = require('./constants/ABI/erc20-contract');

const { Widget } = require('./widget');

let web3;

// Method to return list of supported tokens
async function getTokensList() {
  const { data } = await HELPER.getRequest({
    url: KYBER_CURRENCY_URL,
  });

  if (data) {
    return { response: data.data };
  }

  return { error: 'Error occured. Please try again.' };
}

// method to get quantity of destination tokens
async function getDstQty(srcQty, srcDecimals, dstDecimals, rate) {
  const PRECISION = (10 ** 18);

  if (dstDecimals >= srcDecimals) {
    return (srcQty * rate * (10 ** (dstDecimals - srcDecimals))) / PRECISION;
  }

  return (srcQty * rate) / (PRECISION * (10 ** (srcDecimals - dstDecimals)));
}

// method to get quantity of source tokens
function getSrcQty(dstQty, srcDecimals, dstDecimals, rate) {
  const PRECISION = (10 ** 18);

  let numerator;
  let denominator;

  if (srcDecimals >= dstDecimals) {
    numerator = (PRECISION * dstQty * (10 ** (srcDecimals - dstDecimals)));
    denominator = rate;
  } else {
    numerator = (PRECISION * dstQty);
    denominator = (rate * (10 ** (dstDecimals - srcDecimals)));
  }

  return (numerator + denominator - 1) / denominator;
}
// method to calculate gas limit
async function getGasLimit(srcTokenAddress, dstTokenAddress, amount) {
  const { data } = await HELPER.getRequest({
    url: `${KYBER_GET_GAS_LIMIT_URL}?source=${srcTokenAddress}&dest=${dstTokenAddress}&amount=${amount}`,
  });

  if (data) {
    return data.data;
  }

  return { error: 'Error occured. Please try again.' };
}

class TokenSwap {
  constructor(rpcURL) {
    web3 = new Web3(new Web3.providers.HttpProvider(rpcURL));
    this.kyberProxyContractAddress = kyberProxyContractAddress;
    this.kyberProxyContractABI = kyberProxyContractABI;
    this.kyberNetworkContract = new web3.eth.Contract(this.kyberProxyContractABI, this.kyberProxyContractAddress);
  }

  async swapTokens({
    srcTokenAddress, dstTokenAddress, srcDecimal, srcQty, privateKey, wallet, userAddress,
  }) {
    const srcQtyWei = (srcQty * 10 ** srcDecimal).toString();
    let pvtKey;
    let userAdd = userAddress;
    let txReceipt;

    if (privateKey) {
      pvtKey = Buffer.from(privateKey, 'hex');
      userAdd = web3.eth.accounts.privateKeyToAccount(`0x${privateKey.toString('hex')}`).address;
    }
    const refAddress = REF_ADDRESS;
    const gasLimit = await getGasLimit(srcTokenAddress, dstTokenAddress, srcQty);
    const gasPrice = await web3.eth.getGasPrice();
    let gas = gasLimit * gasPrice;

    gas = gas.toString();
    const gasQtyEth = await web3.utils.fromWei(gas, 'ether');

    const { balance } = await this.getTokenBalance(srcTokenAddress, userAdd);

    if (srcTokenAddress === ETH_TOKEN_ADDRESS) {
      if ((srcQty + gasQtyEth) > balance) {
        return 'Insufficient Funds';
      }
    } else {
      const userEthBalance = await this.getTokenBalance(ETH_TOKEN_ADDRESS, userAdd);

      if ((userEthBalance < gasQtyEth) || (balance < srcQty)) {
        return 'Insufficient Funds';
      }
    }

    if (srcTokenAddress !== ETH_TOKEN_ADDRESS) {
      const results = await this.getRates(srcTokenAddress, dstTokenAddress, srcQtyWei);
      const srcTokenContract = new web3.eth.Contract(erc20Contract, srcTokenAddress);
      const contractAllowance = await srcTokenContract.methods
        .allowance(userAdd, kyberProxyContractAddress)
        .call();

      if (srcQtyWei <= contractAllowance) {
        txReceipt = await this.trade(
          srcTokenAddress,
          srcQtyWei,
          dstTokenAddress,
          userAdd,
          MAX_ALLOWANCE,
          results.slippageRate,
          refAddress,
          srcQty,
          userAdd,
          pvtKey,
          wallet);

        return txReceipt;
      }
      await this.approveContract(MAX_ALLOWANCE, userAdd, srcTokenAddress, srcTokenContract, pvtKey, wallet);
      txReceipt = await this.trade(srcTokenAddress,
        srcQtyWei,
        dstTokenAddress,
        userAdd,
        MAX_ALLOWANCE,
        results.slippageRate,
        refAddress,
        srcQty,
        userAdd,
        pvtKey,
        wallet);

      return txReceipt;
    }
    const results = await this.getRates(srcTokenAddress, dstTokenAddress, srcQtyWei);

    txReceipt = await this.trade(
      srcTokenAddress,
      srcQtyWei,
      dstTokenAddress,
      userAdd,
      MAX_ALLOWANCE,
      results.slippageRate,
      refAddress,
      srcQty,
      userAdd,
      pvtKey,
      wallet);

    return txReceipt;
  }

  async trade(
    srcTokenAddress,
    srcQtyWei,
    dstTokenAddress,
    dstAddress,
    maxDstAmount,
    minConversionRate,
    walletId,
    srcQty,
    userAdd,
    pvtKey,
    wallet) {
    let txReceipt;
    const txData = await this.kyberNetworkContract.methods
      .trade(
        srcTokenAddress,
        srcQtyWei,
        dstTokenAddress,
        dstAddress,
        maxDstAmount,
        minConversionRate,
        walletId )
      .encodeABI();
    const gasLimit = await getGasLimit(srcTokenAddress, dstTokenAddress, srcQty);

    if (srcTokenAddress !== ETH_TOKEN_ADDRESS) {
      txReceipt = await this.broadcastTx(
        userAdd,
        kyberProxyContractAddress,
        txData,
        0,
        gasLimit,
        userAdd,
        pvtKey,
        wallet);

      return txReceipt;
    }

    txReceipt = await this.broadcastTx(
      userAdd,
      kyberProxyContractAddress,
      txData,
      srcQtyWei,
      gasLimit,
      userAdd,
      pvtKey,
      wallet);

    return txReceipt;
  }

  // Function to broadcast transactions
  async broadcastTx(from, to, txData, value, gasLimit, userAdd, pvtKey, wallet) {
    const txCount = await web3.eth.getTransactionCount(userAdd);
    const gasPrice = await web3.eth.getGasPrice();

    const rawTx = {
      from,
      to,
      data: txData,
      value: web3.utils.toHex(value),
      gasLimit: web3.utils.toHex(gasLimit),
      gasPrice: web3.utils.toHex(gasPrice),
      nonce: txCount,
    };

    const txReceipt = await signAndSendTransaction({
      wallet, pvtKey, rawTx,
    });

    return txReceipt;
  }

  // Function to get expected and slippage rates
  async getRates(srcTokenAddress, dstTokenAddress, srcQtyWei) {
    const rate = await this.kyberNetworkContract.methods
      .getExpectedRate(srcTokenAddress, dstTokenAddress, srcQtyWei)
      .call();

    return rate;
  }

  // Function to convert eth to wei
  async convertEthToWei(srcQty) {
    const srcQtyWei = await web3.utils.toWei(srcQty, 'ether');

    return srcQtyWei;
  }

  // Function to approve KNP contract
  async approveContract(allowance, userAdd, srcTokenAddress, srcTokenContract, pvtKey, wallet) {
    const txData = await srcTokenContract.methods
      .approve(kyberProxyContractAddress, allowance)
      .encodeABI();

    await this.broadcastTx(
      userAdd,
      srcTokenAddress,
      txData,
      0,
      '200000',
      userAdd,
      pvtKey,
      wallet);
  }

  // method to return wallet ether balance
  async getWalletBalance(walletAddress) {
    let balance = await web3.eth.getBalance(walletAddress);

    balance = web3.utils.fromWei(balance, 'ether');

    return balance;
  }

  // Function to get slippage percentage
  async getSlippage(srcTokenAddress, dstTokenAddress, srcQty) {
    const quantity1 = await this.convertEthToWei('1');
    const quantity2 = await this.convertEthToWei(srcQty);
    const result1 = await this.getRates(srcTokenAddress, dstTokenAddress, quantity1);
    const result2 = await this.getRates(srcTokenAddress, dstTokenAddress, quantity2);
    const slippage = ((result1.expectedRate - result2.expectedRate) * 100) / (result1.expectedRate);

    return slippage;
  }

  // Method to fetch user token balance
  async getTokenBalance(srcTokenAddress, userAddress) {
    if (srcTokenAddress === ETH_TOKEN_ADDRESS) {
      let balance = await web3.eth.getBalance(userAddress);

      balance = web3.utils.fromWei(balance, 'ether');

      return { srcTokenAddress, balance };
    }

    const url = `${ETHERSCAN_SERVICE_URL}`;

    const { error, data } = await HELPER.getRequest({
      url,
      params: {
        module: 'account',
        action: 'tokenbalance',
        contractaddress: `${srcTokenAddress}`,
        address: `${userAddress}`,
        tag: 'latest',
        apiKey: `${ETHERSCAN_SECRET}`,
      },
    });

    if (error) {
      return { error };
    }

    const { result } = data;
    const balance = web3.utils.fromWei(result, 'ether');

    return { srcTokenAddress, balance };
  }

  // Method to sign transaction via inblox keyless
  async signViaInblox(signedTx) {
    const txReceipt = await web3.eth.sendSignedTransaction(signedTx)
      .catch((error) => error);

    return txReceipt;
  }

  async getExchangeRates(srcTokenAddress, dstTokenAddress, srcDecimal, dstDecimal) {
    const quantity = await this.convertEthToWei('1');
    const result = await this.getRates(srcTokenAddress, dstTokenAddress, quantity);
    const rate = await getDstQty('1', srcDecimal, dstDecimal, result.expectedRate);

    return rate;
  }
}

async function signAndSendTransaction({
  wallet, pvtKey, rawTx,
}) {
  switch (wallet) {
    case 'handlename': {
      return rawTx;
    }
    case 'keyStore': {
      return signViaPrivateKey(pvtKey, rawTx);
    }
    case 'privateKey': {
      return signViaPrivateKey(pvtKey, rawTx);
    }
    default: {
      return signViaMetamask(rawTx);
    }
  }
}

async function signViaPrivateKey(pvtKey, rawTx) {
  const tx = new Tx(rawTx, { chain: 'ropsten', hardfork: 'petersburg' });

  tx.sign(pvtKey);
  const stringTx = `0x${tx.serialize().toString('hex')}`;
  const txReceipt = await web3.eth.sendSignedTransaction(stringTx)
    .catch((error) => error);

  return txReceipt;
}

async function signViaMetamask(rawTx) {
  // eslint-disable-next-line no-undef
  ethereum.sendAsync(
    {
      method: 'eth_sendTransaction',
      params: [ {
        data: rawTx.data,
        value: rawTx.value,
        from: rawTx.from,
        to: rawTx.to,
      } ],
    },
    (err, result) => {
      if (err) {
        return (err);
      }

      return (result);
    });
}

async function getWallet({
  wallet, keystoreJson, passphrase, privateKey,
}) {
  switch (wallet) {
    case 'keyStore': {
      return getWalletFromKeyStoreFile(keystoreJson, passphrase);
    }
    case 'privateKey': {
      return getWalletFromPrivateKey(privateKey);
    }
    default:
    {
      return getWalletFromMetamask();
    }
  }
}

// method to get waller from keystore file
async function getWalletFromKeyStoreFile(keystoreJson, passphrase) {
  const json = JSON.stringify(keystoreJson);

  try {
    const wallet = await ethers.Wallet.fromEncryptedJson(json, passphrase);

    return wallet;
  } catch (error) {
    return { error: 'WRONG PASSWORD' };
  }
}

// method to get user wallet from private key
async function getWalletFromPrivateKey(privateKey) {
  try {
    const ec = new EC('secp256k1');

    const key = ec.keyFromPrivate(privateKey, 'hex');
    const publicKey = key.getPublic().encode('hex').slice(2);

    const address = keccak256(Buffer.from(publicKey, 'hex')).slice(64 - 40).toString();

    const checksumAddress = await Web3.utils.toChecksumAddress(`0x${address}`);

    return { wallet: { address: checksumAddress, privateKey } };
  } catch (error) {
    return { error };
  }
}
// method to get wallet from metamask
async function getWalletFromMetamask() {
  // eslint-disable-next-line no-undef
  if (window.ethereum) {
    // eslint-disable-next-line no-undef
    const { ethereum } = window;
    const accounts = await ethereum.enable();
    const account = accounts[0];

    return account;
  }

  return 'metamask not detected';
}

module.exports.getTokensList = getTokensList;
module.exports.getDstQty = getDstQty;
module.exports.getSrcQty = getSrcQty;
module.exports.getGasLimit = getGasLimit;
module.exports.getWallet = getWallet;
module.exports.signAndSendTransaction = signAndSendTransaction;
module.exports.TokenSwap = TokenSwap;
module.exports.Widget = Widget;
