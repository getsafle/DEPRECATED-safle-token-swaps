/* eslint-disable no-use-before-define */
const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;
const { InbloxHandlename } = require('@inbloxme/inbloxme-identity-wallet');
const inblox = require('@inbloxme/keyless-transactions');

const HELPER = require('./utils/helper');
const {
  kyberProxyContractAddress, KYBER_CURRENCY_URL, KYBER_GET_GAS_LIMIT_URL, REF_ADDRESS, ETH_TOKEN_ADDRESS, INFURA_KEY, ENV,
} = require('./config');
const { kyberProxyContractABI } = require('./constants/ABI/kyber-proxy-contract');
const { erc20Contract } = require('./constants/ABI/erc20-contract');

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
  constructor(wsProvider) {
    web3 = new Web3(new Web3.providers.WebsocketProvider(wsProvider));
    this.kyberProxyContractAddress = kyberProxyContractAddress;
    this.kyberProxyContractABI = kyberProxyContractABI;
    this.kyberNetworkContract = new web3.eth.Contract(this.kyberProxyContractABI, this.kyberProxyContractAddress);
  }

  async swapTokens({
    srcTokenAddress, dstTokenAddress, srcDecimal, srcQty, maxAllowance, privateKey, wallet, userAddress, userName, inbloxPassword,
  }) {
    const srcQtyWei = (srcQty * 10 ** srcDecimal).toString();
    let pvtKey;
    let userAdd = userAddress;
    let txReceipt;

    if (privateKey) {
      pvtKey = Buffer.from(privateKey, 'hex');
      userAdd = web3.eth.accounts.privateKeyToAccount(
        `0x${privateKey.toString('hex')}`,
      ).address;
    }
    const refAddress = REF_ADDRESS;

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
          maxAllowance,
          results.slippageRate,
          refAddress,
          srcQty,
          userAdd,
          pvtKey,
          wallet,
          userName,
          inbloxPassword,
        );

        return txReceipt;
      }
      await this.approveContract(maxAllowance, userAdd, srcTokenAddress, srcTokenContract, pvtKey, wallet);
      txReceipt = await this.trade(srcTokenAddress,
        srcQtyWei,
        dstTokenAddress,
        userAdd,
        maxAllowance,
        results.slippageRate,
        refAddress,
        srcQty,
        userAdd,
        pvtKey,
        wallet,
        userName,
        inbloxPassword);

      return txReceipt;
    }
    const results = await this.getRates(srcTokenAddress, dstTokenAddress, srcQtyWei);

    txReceipt = await this.trade(
      srcTokenAddress,
      srcQtyWei,
      dstTokenAddress,
      userAdd,
      maxAllowance,
      results.slippageRate,
      refAddress,
      srcQty,
      userAdd,
      pvtKey,
      wallet,
      userName,
      inbloxPassword,
    );

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
    wallet,
    userName,
    inbloxPassword,
  ) {
    let txReceipt;
    const txData = await this.kyberNetworkContract.methods
      .trade(
        srcTokenAddress,
        srcQtyWei,
        dstTokenAddress,
        dstAddress,
        maxDstAmount,
        minConversionRate,
        walletId,
      )
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
        wallet,
        userName,
        inbloxPassword,
      );

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
      wallet,
      userName,
      inbloxPassword,
    );

    return txReceipt;
  }

  // Function to broadcast transactions
  async broadcastTx(from, to, txData, value, gasLimit, userAdd, pvtKey, wallet, userName, inbloxPassword) {
    const txCount = await web3.eth.getTransactionCount(userAdd);
    let gasPrice = web3.eth.getGasPrice();
    const maxGasPrice = await this.kyberNetworkContract.methods
      .maxGasPrice()
      .call();

    if (gasPrice >= maxGasPrice) gasPrice = maxGasPrice;
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
      wallet, pvtKey, rawTx, userName, inbloxPassword,
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

  // Function to approve KNP contract
  async approveContract(allowance, userAdd, srcTokenAddress, srcTokenContract, pvtKey, wallet, userName, inbloxPassword) {
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
      wallet,
      userName,
      inbloxPassword,
    );
  }

  // method to return wallet ether balance
  async getWalletBalance(walletAddress) {
    const balance = await this.web3.eth.getBalance(walletAddress);

    return balance;
  }
}

async function signAndSendTransaction({
  wallet, pvtKey, rawTx, userName, inbloxPassword,
}) {
  switch (wallet) {
    case 'handlename': {
      return signViaInblox(rawTx, userName, inbloxPassword);
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

async function signViaInblox(rawTx, userName, password) {
  const keyless = new inblox.Keyless({ infuraKey: INFURA_KEY, env: ENV });
  const { error } = await keyless.getUser({ userName, password });

  if (error) {
    return error;
  }

  const {
    to, data, value, gasPrice, gasLimit, nonce,
  } = rawTx;

  const signAndSendTx = await keyless.signAndSendTx({
    to, value, gasPrice, gasLimit, data, nonce, password,
  });

  return signAndSendTx;
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
    },
  );
}

async function getWallet({
  wallet, infuraKey, userHandlename, keystoreJson, passphrase, privateKey,
}) {
  switch (wallet) {
    case 'handlename': {
      return getWalletFromHandlename(infuraKey, userHandlename);
    }
    case 'keyStore': {
      return getWalletFromKeyStoreFile(keystoreJson, passphrase);
    }
    case 'privateKey': {
      return getWalletFromPrivateKey(infuraKey, privateKey);
    }
    default:
    {
      return getWalletFromMetamask();
    }
  }
}

// method to get user wallet from handlename
async function getWalletFromHandlename(infuraKey, userHandlename) {
  const handlename = new InbloxHandlename({ infuraKey });
  const userAddress = await handlename.resolveAddressFromHandleName(userHandlename);

  return {
    userAddress,
  };
}

// method to get waller from keystore file
async function getWalletFromKeyStoreFile(keystoreJson, passphrase) {
  const Wallet = new inblox.Wallet();
  const wallet = await Wallet.importFromEncryptedJson(keystoreJson, passphrase);

  return wallet.response;
}

// method to get user wallet from private key
async function getWalletFromPrivateKey(infuraKey, privateKey) {
  web3 = new Web3(new Web3.providers.HttpProvider(`https://ropsten.infura.io/v3/${infuraKey}`));
  const wallet = await web3.eth.accounts.privateKeyToAccount(privateKey);

  return {
    wallet,
  };
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
