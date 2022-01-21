const  supportedDex  = require('../dex');
const response = require('../constants/responses')

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
}

module.exports = Swaps;