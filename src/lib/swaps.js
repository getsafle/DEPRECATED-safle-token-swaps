const  supportedDex  = require('../dex');
const response = require('../constants/responses');
const config = require('../config');
const helper = require('../utils/helper')

class Swaps {

    constructor(dex) {
        this.dex = dex;
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

    async getExchangeRates(fromToken, toToken, quantity) {

        const { error, response } = await this.dex.getRates(fromToken, toToken, quantity);

        if(error){
            return { error };
        }    

        return response;
    }
}

module.exports = Swaps;