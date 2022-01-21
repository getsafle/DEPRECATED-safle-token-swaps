const  supportedDex  = require('../dex');
const response = require('../constants/responses')

class Swaps {

    constructor(dex) {
        this.dex = dex;
    }

    async getDex() {

        return supportedDex;
    }
}

module.exports = Swaps;