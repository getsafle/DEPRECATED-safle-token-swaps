const Web3 = require('web3');
const  supportedDex  = require('../dex');
const response = require('../constants/responses');
const config = require('../config');
const helper = require('../utils/helper')

class Swaps {

    constructor({ dex, rpcURL }) {
        this.dex = dex;
        this.rpcURL = rpcURL;
        this.web3 = new Web3(new Web3.providers.HttpProvider(rpcURL));
    }

    async getDex() {

        return supportedDex;
    }

    async changeDex(dex) {
        if(!supportedDex.includes(dex))
        {
            return { error: response.INVALID_DEX }
        }
        this.dex = dex;
    }    

    async getSupportedTokens() {
        const { response } = await helper.getRequest({ url: config.SUPPORTED_TOKENS_URL });
    
        return response;
    }

    async getExchangeRates({ fromToken, toToken, quantity }) {

        const { error, response } = await this.dex.getRates(fromToken, toToken, quantity);

        if(error){
            return { error };
        }    

        return response;
    }

    async getSlippage({ fromToken, toToken, quantity }) {

        const { error, response } = await this.dex.getSlippage({ fromToken, toToken, quantity });

        if(error){
            return { error };
        }    

        return response;
    }

    async getEstimatedGas({ fromToken, toToken, quantity }) {

        const gasPrice = await this.web3.eth.getGasPrice();

        const { error, response } = await this.dex.getGasLimit({ fromToken, toToken, quantity });

        if(error){
            return { error };
        }    

        const { gasLimit } = response;

        return { gasLimit, gasPrice };
    }

    async getSignedTx({ walletAddress, toToken, fromToken, toQuantity, fromQuantity, slippageTolerance, }) {

        const { error, response } = await this.dex.getSignedTx({ walletAddress, toToken, fromToken, toQuantity, fromQuantity, slippageTolerance, });

        if(error){
            return { error };
        }    

        const { SignedTx } = response;

        return { SignedTx };
    }
}

module.exports = Swaps;