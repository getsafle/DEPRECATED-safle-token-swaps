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
}

module.exports = Swaps;