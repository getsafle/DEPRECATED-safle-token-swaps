import { eventEmitter } from '..';

import {
  ConnectToWalletModal,
  SwapModal,
  SuccessModal,
  ConnectViaPrivateKeyModal,
  ConnectViaKeyStoreModal,
  ConnectViaPassPhraseModal,
  CheckWithMetaMaskModal,
  PrivateKeyToSwap,
  KeyStoreToSwap,
  PassPhraseToSwap
} from '../pages';

import { ModalLoader } from '../pages/loaders/modal-loader';

import { WidgetCSS } from '../assets/css';

import { initOnClickEvents } from './on-click-events';

import { getUserPublicAddress, getSwapVia } from './storage-and-user-helper';

export async function generateModal(widgetInstance) {
  let wrapper = document.getElementById('inbloxTokenSwapWidget');
  if (wrapper == null) {
    wrapper = document.createElement('div');
    wrapper.id = 'inbloxTokenSwapWidget';
  }
  wrapper.innerHTML = `${widgetInstance.activeTab}`;

  let container = document.getElementsByTagName('body');
  if (!container) container = document.getElementsByTagName('html');
  if (!container) container = document.getElementsByTagName('div');
  await container[0].appendChild(wrapper);

  let inbloxTokenSwapWidget = document.getElementById('inbloxTokenSwapWidget');

  let style = await document.createElement('style');
  style.innerHTML = WidgetCSS();
  if (inbloxTokenSwapWidget) await inbloxTokenSwapWidget.appendChild(style);

  //Prevent background scrolling when overlay appears
  document.documentElement.style.overflow = 'hidden';
  document.body.scroll = 'no';

  if (inbloxTokenSwapWidget && inbloxTokenSwapWidget.style) {
    inbloxTokenSwapWidget.style.display = 'block';
  }

  if (!widgetInstance.isInitialised) {
    widgetInstance.isInitialised = true;
    eventEmitter.emit(widgetInstance.EVENTS.TOKEN_SWAP_WIDGET_INITIALISED, {
      status: true,
      eventName: widgetInstance.EVENTS.TOKEN_SWAP_WIDGET_INITIALISED
    });
  }

  initCloseEvents();
  initOnClickEvents(widgetInstance); // Initialise all onclick events.
}

export function showLoader() {
  const loader = document.getElementById('loader');
  loader.style.display = 'block';
}

export function hideLoader() {
  const loader = document.getElementById('loader');
  loader.style.display = 'none';
}

export async function showModalLoader() {
  let loaderWrapper = document.getElementById('widgetModalLoader');
  if (loaderWrapper == null) {
    loaderWrapper = document.createElement('div');
    loaderWrapper.id = 'widgetModalLoader';
  }
  loaderWrapper.innerHTML = ModalLoader();

  let container = document.getElementsByTagName('body');
  if (!container) container = document.getElementsByTagName('html');
  if (!container) container = document.getElementsByTagName('div');
  await container[0].appendChild(loaderWrapper);

  let widgetModalLoader = document.getElementById('widgetModalLoader');

  let style = await document.createElement('style');
  style.innerHTML = WidgetCSS();
  if (widgetModalLoader) await widgetModalLoader.appendChild(style);

  //Prevent background scrolling when overlay appears
  document.documentElement.style.overflow = 'hidden';
  document.body.scroll = 'no';

  if (widgetModalLoader && widgetModalLoader.style) {
    widgetModalLoader.style.display = 'block';
  }
}

export function hideModalLoader() {
  //Enable background scrolling when overlay removed
  document.documentElement.style.overflow = 'auto';
  document.body.scroll = 'yes';
  document.getElementById('widgetModalLoader').remove();
  return;
}

export function closeModal() {
  //Enable background scrolling when overlay removed
  document.documentElement.style.overflow = 'auto';
  document.body.scroll = 'yes';
  document.getElementById('inbloxTokenSwapWidget').remove();

  eventEmitter.emit('TOKEN_SWAP_WIDGET_CLOSED', {
    status: true,
    eventName: 'TOKEN_SWAP_WIDGET_CLOSED',
    data: {
      message: 'Token swap widget closed'
    }
  });
}

function initCloseEvents() {
  const closeIcon = document.getElementById('close-icon');
  // When the user clicks on close icon (x), close the modal
  closeIcon.onclick = () => {
    closeModal();
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = (event) => {
    const customModal = document.getElementsByClassName('custom-modal')[0];
    if (customModal && event.target.className === customModal.className) {
      closeModal();
    }
  };
}

export function setActiveTab(widgetInstance, nextActiveModalId) {
  const userAuthenticated = widgetInstance.userLoggedIn;
  const userAddress = widgetInstance.userAddress;

  const userNotAuthorizedAndNotConnectWithWallet =
    !userAuthenticated || userAddress == '' || userAddress == null;
  const accessProtectedModal = accessForAnyProtectedModal(nextActiveModalId);

  if (userNotAuthorizedAndNotConnectWithWallet && accessProtectedModal) {
    widgetInstance.activeTabIdName = 'connect-to-wallet-modal';
    widgetInstance.activeTab = ConnectToWalletModal();
    generateModal(widgetInstance);
    return;
  }

  switch (nextActiveModalId) {
    case 'connect-to-wallet-modal':
      widgetInstance.activeTabIdName = 'connect-to-wallet-modal';
      widgetInstance.activeTab = ConnectToWalletModal();
      generateModal(widgetInstance);
      break;
    case 'connect-via-private-key-modal':
      widgetInstance.swapVia = 'privateKey';
      widgetInstance.activeTabIdName = 'connect-via-private-key-modal';
      widgetInstance.activeTab = ConnectViaPrivateKeyModal();
      generateModal(widgetInstance);
      break;
    case 'connect-via-keystore-modal':
      widgetInstance.swapVia = 'keyStore';
      widgetInstance.activeTabIdName = 'connect-via-keystore-modal';
      widgetInstance.activeTab = ConnectViaKeyStoreModal();
      generateModal(widgetInstance);
      break;
    case 'connect-via-pass-phrase-modal':
      widgetInstance.activeTabIdName = 'connect-via-pass-phrase-modal';
      widgetInstance.activeTab = ConnectViaPassPhraseModal();
      generateModal(widgetInstance);
      break;
    case 'swap-modal':
      SwapModal(widgetInstance).then((swapModelWithRates) => {
        widgetInstance.activeTabIdName = 'swap-modal';
        widgetInstance.activeTab = swapModelWithRates;
        generateModal(widgetInstance);
      });
      break;
    case 'private-key-to-swap':
      widgetInstance.activeTabIdName = 'private-key-to-swap';
      widgetInstance.activeTab = PrivateKeyToSwap();
      generateModal(widgetInstance);
      break;
    case 'key-store-to-swap':
      widgetInstance.activeTabIdName = 'key-store-to-swap';
      widgetInstance.activeTab = KeyStoreToSwap();
      generateModal(widgetInstance);
      break;
    case 'pass-phrase-to-swap':
      widgetInstance.activeTabIdName = 'pass-phrase-to-swap';
      widgetInstance.activeTab = PassPhraseToSwap();
      generateModal(widgetInstance);
      break;
    case 'check-with-meta-mask-modal':
      widgetInstance.activeTabIdName = 'check-with-meta-mask-modal';
      widgetInstance.activeTab = CheckWithMetaMaskModal();
      generateModal(widgetInstance);
      break;
    case 'success-modal':
      widgetInstance.activeTabIdName = 'success-modal';
      widgetInstance.activeTab = SuccessModal(widgetInstance);
      generateModal(widgetInstance);
      break;
    default:
      setActiveTab(widgetInstance, 'connect-to-wallet-modal');
  }
}

export async function updateAuthModal(widgetInstance) {
  const userAddress = getUserPublicAddress();
  const swapVia = getSwapVia();

  if (userAddress != null && swapVia != null) {
    widgetInstance.activeTabIdName = 'swap-modal';
    widgetInstance.activeTab = await SwapModal(widgetInstance);
    widgetInstance.userAddress = userAddress;
    widgetInstance.swapVia = swapVia;
  } else {
    widgetInstance.activeTabIdName = 'connect-to-wallet-modal';
    widgetInstance.activeTab = await ConnectToWalletModal();
  }
}

function accessForAnyProtectedModal(nextActiveModalId) {
  return ['swap-modal', 'check-with-meta-mask-modal', 'success-modal'].includes(
    nextActiveModalId
  );
}
