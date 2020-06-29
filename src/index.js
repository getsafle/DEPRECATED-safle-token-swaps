const Web3 = require("web3");
const Tx = require("ethereumjs-tx").Transaction;
const fetch = require('node-fetch');
const inbloxHandlename = require('@inbloxme/inbloxme-identity-wallet').InbloxHandlename;
const inblox = require('@inbloxme/keyless-transactions');

const HELPER = require('./utils/helper');
const { kyberProxyContractAddress, KYBER_CURRENCY_URL, KYBER_GET_GAS_LIMIT_URL, REF_ADDRESS, ETH_TOKEN_ADDRESS } = require('../config')
const { kyberProxyContractABI } = require('./constants/ABI/kyber-proxy-contract');
const { erc20Contract } = require('./constants/ABI/erc20-contract')
let web3;

//Method to return list of supported tokens
async function getTokensList() {
    const { data } = await HELPER.getRequest({
        url: KYBER_CURRENCY_URL
    })
    if (data) {

        return { response: data.data };
    }
    return { error: 'Error occured. Please try again.' };
}

// method to return data for selected token
async function getTokenDetails(tokenSymbol) {
    const { data } = await HELPER.getRequest({
        url: KYBER_CURRENCY_URL
    })

    if (data) {
        const tokens = data.data;
        tokens.forEach(element => {
            if (element.symbol == tokenSymbol) {
                return { response: element };
            }
        });
    }
    return { error: 'Invalid token symbol. Please try again.' };
}

// method to get quantity of destination tokens
async function getDstQty(srcQty, srcDecimals, dstDecimals, rate) {
    const PRECISION = (10 ** 18);
    if (dstDecimals >= srcDecimals) {
        return (srcQty * rate * (10 ** (dstDecimals - srcDecimals))) / PRECISION;
    } else {
        return (srcQty * rate) / (PRECISION * (10 ** (srcDecimals - dstDecimals)));
    }
}

// method to get quantity of source tokens
function getSrcQty(dstQty, srcDecimals, dstDecimals, rate) {
    const PRECISION = (10 ** 18);
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
        url: `${KYBER_GET_GAS_LIMIT_URL}?source=${srcTokenAddress}&dest=${dstTokenAddress}&amount=${amount}`
    })
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

    async swapTokens({ srcTokenAddress, dstTokenAddress, srcDecimal, srcQty, maxAllowance, privateKey, wallet, userAddress, userName, inbloxPassword }) {

        const srcQtyWei = (srcQty * 10 ** srcDecimal).toString();
        let pvtKey;
        if (privateKey) {
            pvtKey = Buffer.from(privateKey, "hex");
            userAddress = web3.eth.accounts.privateKeyToAccount(
                "0x" + privateKey.toString("hex")
            ).address;
        }
        const refAddress = REF_ADDRESS;
        if (srcTokenAddress != ETH_TOKEN_ADDRESS) {
            let results = await this.getRates(srcTokenAddress, dstTokenAddress, srcQtyWei);
            const srcTokenContract = new web3.eth.Contract(erc20Contract, srcTokenAddress);
            let contractAllowance = await srcTokenContract.methods
                .allowance(userAddress, kyberProxyContractAddress)
                .call();

            if (srcQtyWei <= contractAllowance) {
                await this.trade(
                    srcTokenAddress,
                    srcQtyWei,
                    dstTokenAddress,
                    userAddress,
                    maxAllowance,
                    results.slippageRate,
                    refAddress,
                    srcQty,
                    userAddress,
                    pvtKey,
                    wallet,
                    userName,
                    inbloxPassword
                );
            } else {
                await this.approveContract(maxAllowance, userAddress, srcTokenAddress, srcTokenContract, pvtKey, wallet);
                await this.trade(srcTokenAddress,
                    srcQtyWei,
                    dstTokenAddress,
                    userAddress,
                    maxAllowance,
                    results.slippageRate,
                    refAddress,
                    srcQty,
                    userAddress,
                    pvtKey,
                    wallet,
                    userName,
                    inbloxPassword
                );
            }
            // Quit the program
            process.exit(0);
        }
        let results = await this.getRates(srcTokenAddress, dstTokenAddress, srcQtyWei);
        await this.trade(
            srcTokenAddress,
            srcQtyWei,
            dstTokenAddress,
            userAddress,
            maxAllowance,
            results.slippageRate,
            refAddress,
            srcQty,
            userAddress,
            pvtKey,
            wallet,
            userName,
            inbloxPassword
        );
        // Quit the program
        process.exit(0);
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
        userAddress,
        pvtKey,
        wallet,
        userName,
        inbloxPassword
    ) {
        let txData = await this.kyberNetworkContract.methods
            .trade(
                srcTokenAddress,
                srcQtyWei,
                dstTokenAddress,
                dstAddress,
                maxDstAmount,
                minConversionRate,
                walletId
            )
            .encodeABI();
        let gasLimit = await getGasLimit(srcTokenAddress, dstTokenAddress, srcQty);
        if (srcTokenAddress != ETH_TOKEN_ADDRESS) {
            await this.broadcastTx(
                userAddress,
                kyberProxyContractAddress,
                txData,
                0,
                gasLimit,
                userAddress,
                pvtKey,
                wallet,
                userName,
                inbloxPassword
            );
        }
        else {
            await this.broadcastTx(
                userAddress,
                kyberProxyContractAddress,
                txData,
                srcQtyWei,
                gasLimit,
                userAddress,
                pvtKey,
                wallet,
                userName,
                inbloxPassword
            );
        }
    }
    // Function to broadcast transactions
    async broadcastTx(from, to, txData, value, gasLimit, userAddress, pvtKey, wallet, userName, inbloxPassword) {

        let txCount = await web3.eth.getTransactionCount(userAddress);
        let gasPrice = web3.eth.getGasPrice();
        let maxGasPrice = await this.kyberNetworkContract.methods
            .maxGasPrice()
            .call();

        if (gasPrice >= maxGasPrice) gasPrice = maxGasPrice;
        let rawTx = {
            from: from,
            to: to,
            data: txData,
            value: web3.utils.toHex(value),
            gasLimit: web3.utils.toHex(gasLimit),
            gasPrice: web3.utils.toHex(gasPrice),
            nonce: txCount
        };


        var txReceipt = await signAndSendTransaction({ wallet: wallet, pvtKey: pvtKey, rawTx: rawTx, userName: userName, inbloxPassword: inbloxPassword });
        console.log(txReceipt);
        return;
    }

    // Function to get expected and slippage rates
    async getRates(srcTokenAddress, dstTokenAddress, srcQtyWei) {
        const rate = await this.kyberNetworkContract.methods
            .getExpectedRate(srcTokenAddress, dstTokenAddress, srcQtyWei)
            .call();
        return rate;
    }

    // Function to approve KNP contract
    async approveContract(allowance, userAddress, srcTokenAddress, srcTokenContract, pvtKey, wallet, userName, inbloxPassword) {
        let txData = await srcTokenContract.methods
            .approve(kyberProxyContractAddress, allowance)
            .encodeABI();

        await this.broadcastTx(
            userAddress,
            srcTokenAddress,
            txData,
            0, //Ether value to be sent should be zero
            "200000", //gasLimit
            userAddress,
            pvtKey,
            wallet,
            userName,
            inbloxPassword
        );
    }

    // method to return wallet ether balance
    async getWalletBalance(walletAddress) {
        const balance = await web3.eth.getBalance(walletAddress);
        return balance;
    }

}

async function signAndSendTransaction({ wallet, pvtKey, rawTx, userName, inbloxPassword }) {
    switch (wallet) {
        case 'handlename': {
            return signViaInblox(rawTx, userName, inbloxPassword);
        }
            break;
        case 'keyStore': {
            return signViaPrivateKey(pvtKey, rawTx);
        }
            break;
        case 'privateKey': {
            return signViaPrivateKey(pvtKey, rawTx);
        }
            break;
        case 'metamask':
            {
                return signViaMetamask(rawTx);
            }
            break;
    }
}


async function signViaInblox(rawTx, userName, password) {
    const keyless = new inblox.Keyless({ infuraKey: '5771ac7556054b998e809aeadb16a31c' });

    const getUser = await keyless.getUser({ userName: userName, password: password });

    const to = rawTx.to;
    const data = rawTx.data;
    const value = rawTx.value;
    const gasPrice = rawTx.gasPrice;
    const gasLimit = rawTx.gasLimit;
    const nonce = rawTx.nonce;
    const signAndSendTx = keyless.signAndSendTx({ to, value, gasPrice, gasLimit, data, nonce, password });

    return signAndSendTx;
}

async function signViaPrivateKey(pvtKey, rawTx) {
    let tx = new Tx(rawTx, { chain: 'ropsten', hardfork: 'petersburg' });
    tx.sign(pvtKey);
    const stringTx = `0x${tx.serialize().toString('hex')}`;
    let txReceipt = await web3.eth.sendSignedTransaction(stringTx)
        .catch(error => console.log(error));
    return txReceipt;
}

async function signViaMetamask(rawTx) {   
    ethereum.sendAsync(
        {
          method: 'eth_sendTransaction',
            params: [{
                data: rawTx.data,
                value: rawTx.value,
                from: rawTx.from,
                to: rawTx.to
           } ],
        },
        (err, result) => {
          if (err) console.error(err);
          else console.log(result);
        }
      );
}


async function getWallet({ wallet, infuraKey, userHandlename, keystoreJson, passphrase, privateKey }) {
    switch (wallet) {

        case 'handlename': {
            return getWalletFromHandlename(infuraKey, userHandlename);
        }
            break;
        case 'keyStore': {
            return getWalletFromKeyStoreFile(keystoreJson, passphrase);
        }
            break;
        case 'privateKey': {
            return getWalletFromPrivateKey(infuraKey, privateKey)
        }
            break;
        case 'metamask':
            {
                return getWalletFromMetamask();
            }
            break;
    }
}

// method to get user wallet from handlename
async function getWalletFromHandlename(infuraKey, userHandlename) {
    const handlename = new inbloxHandlename({ infuraKey });
    const userAddress = await handlename.resolveAddressFromHandleName(userHandlename);
    return {
        userAddress: userAddress,
    };
}

//method to get waller from keystore file
async function getWalletFromKeyStoreFile(keystoreJson, passphrase) {
    const wallet = await inblox.importFromEncryptedJson(keystoreJson, passphrase);
    return wallet.response;
}

// method to get user wallet from private key
async function getWalletFromPrivateKey(infuraKey, privateKey) {
    const web3 = new Web3(new Web3.providers.HttpProvider(`https://ropsten.infura.io/v3/${infuraKey}`));
    let wallet = await web3.eth.accounts.privateKeyToAccount(privateKey);
    return {
        wallet: wallet,
    }
}
// method to get wallet from metamask 
async function getWalletFromMetamask() {
    if (typeof window.ethereum !== 'undefined') {
        console.log("MetaMask is installed!");
    }
    if (window.ethereum) {
        let ethereum = window.ethereum;
        const accounts = await ethereum.enable();
        const account = accounts[0];
        return account;
    }

    return 'metamask not detected'
}
module.exports = {
    getTokenDetails,
    getTokensList,
    getDstQty,
    getSrcQty,
    getGasLimit,
    getWallet,
    signAndSendTransaction,
    TokenSwap,
}