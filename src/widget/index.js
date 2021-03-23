import events from 'events';

import Keyless from '@getsafle/keyless-transactions';

const TokenSwapSDK = require('..');

import { ConnectToWalletModal } from './pages';

import {
  isUserLoggedIn,
  generateModal,
  getUserPublicAddress,
  updateAuthModal,
  EVENTS
} from './utils';

export class Widget {
  constructor({ rpcURL, env, etherscanSecret }) {
    const userAddress = getUserPublicAddress();

    this.userLoggedIn = isUserLoggedIn();
    this.swapVia = '';
    this.safleId = '';
    this.userAddress = userAddress != null ? userAddress : '';
    this.privateKey = '';
    this.encryptedJson = '';
    this.transactionHash = '';
    this.activeTabIdName = 'connect-to-wallet-modal';
    this.activeTab = ConnectToWalletModal();
    this.swapValues = {};
    this.response = {};
    this.rpcURL = rpcURL;
    this.tokenSwap = new TokenSwapSDK.TokenSwap(rpcURL, etherscanSecret);
    this.keylessWidget = new Keyless.Widget({
      rpcURL,
      env
    });

    this.isInitialised = false;
    this.EVENTS = EVENTS;
    this.ALL_EVENTS = '*';
    this.ERROR = 'TOKEN_SWAP_ERROR';
    this.INITIALISED_EVENTS = [];
    this.eventEmitter = new events.EventEmitter();
  }

  async initTokenSwap() {
    try {
      await updateAuthModal(this);
      generateModal(this);
    } catch (error) {
      throw error;
    }
  }
}

Widget.prototype.on = function (type, cb) {
  if (type === this.ALL_EVENTS) {
    for (let evKey in EVENTS) {
      const evName = EVENTS[evKey];

      if (!this.INITIALISED_EVENTS.includes(evName)) {
        this.INITIALISED_EVENTS.push(evName);
        this.eventEmitter.on(evName, cb);
      }
    }
  }

  if (EVENTS[type] && !this.INITIALISED_EVENTS.includes(EVENTS[type])) {
    this.INITIALISED_EVENTS.push(EVENTS[type]);
    this.eventEmitter.on(type, cb);
  }

  if (type === this.ERROR && !this.INITIALISED_EVENTS.includes(this.ERROR)) {
    this.INITIALISED_EVENTS.push(this.ERROR);
    this.eventEmitter.on(this.ERROR, cb);
  }
};
