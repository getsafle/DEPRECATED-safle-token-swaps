import events from 'events';

import Keyless from '@inbloxme/keyless-transactions';
const KeylessWidget = new Keyless.Widget();

const TokenSwapSDK = require('..');

import { ConnectToWalletModal } from './pages';

import {
  whetherUserLoggedIn,
  generateModal,
  getUserPublicAddress,
  updateAuthModal,
  EVENTS
} from './utils';

export const eventEmitter = new events.EventEmitter();

export class Widget {
  constructor({ env, rpcURL}) {
    const userAddress = getUserPublicAddress();

    this.userLoggedIn = whetherUserLoggedIn();
    this.swapVia = '';
    this.handleName = '';
    this.userAddress = userAddress != null ? userAddress : '';
    this.privateKey = '';
    this.encryptedJson = '';
    this.transactionHash = '';
    this.activeTabIdName = 'connect-to-wallet-modal';
    this.activeTab = ConnectToWalletModal();
    this.swapValues = {};
    this.response = {};
    this.tokenSwap = new TokenSwapSDK.TokenSwap(
      rpcURL
    );

    this.keylessWidget = new Keyless.Widget({ env, rpcURL });

    this.isInitialised = false;
    this.EVENTS = EVENTS;
    this.ALL_EVENTS = '*';
    this.ERROR = 'TOKEN_SWAP_ERROR';
    this.INITIALISED_EVENTS = [];
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
        eventEmitter.on(evName, cb);
      }
    }
  }

  if (EVENTS[type] && !this.INITIALISED_EVENTS.includes(EVENTS[type])) {
    this.INITIALISED_EVENTS.push(EVENTS[type]);
    eventEmitter.on(type, cb);
  }

  if (type === this.ERROR && !this.INITIALISED_EVENTS.includes(this.ERROR)) {
    this.INITIALISED_EVENTS.push(this.ERROR);
    eventEmitter.on(this.ERROR, cb);
  }
};
