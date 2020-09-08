import {
  setUserToken,
  getUserToken,
  whetherUserLoggedIn,
  setUserPublicAddress,
  getUserPublicAddress
} from './storage-and-user-helper';

import {
  generateModal,
  showLoader,
  hideLoader,
  showModalLoader,
  hideModalLoader,
  updateAuthModal
} from './ui-helper';

export { default as EVENTS } from './events';

export {
  getUserToken,
  setUserToken,
  whetherUserLoggedIn,
  generateModal,
  showLoader,
  hideLoader,
  showModalLoader,
  hideModalLoader,
  setUserPublicAddress,
  getUserPublicAddress,
  updateAuthModal
};