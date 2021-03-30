import { setActiveTab, showLoader, hideLoader, closeModal } from './ui-helper';

import {
  getDestinationQuantity,
  getSourceQuantity,
  updateTokenSwapsValue,
  updateSlippagePercentage,
  updateSwapConfiguration,
  toggleSourceAndDestinationTokens,
  changeWallet,
  checkGasPrice
} from '../pages/swap-modals/swap-modal';

import { connectWithMetaMask } from '../pages/connect-to-wallet-modal/meta-mask';
import { connectWithPrivateKey } from '../pages/connect-to-wallet-modal/private-key';
import { connectWithKeyStore } from '../pages/connect-to-wallet-modal/pass-phrase';
import {
  swapTokenUsingSafleId,
  swapTokenUsingPrivateKey,
  swapTokenUsingMetaMask
} from '../pages/swap-modals/swap-via-helper';

import { setUserPublicAddress, setSwapVia } from './storage-and-user-helper';
import { getPrivateKeyFromKeyStore } from '../pages/swap-modals/pass-pharse-to-swap';

import {
  INVALID_WALLET_OPTION,
  ENTER_PRIVATE_KEY,
  ENTER_PASS_PHRASE
} from '../../constants/responses';

let tempTimer;

// User input delay helper method.
function waitForUserInput(callback) {
  //if already have a timout, clear it
  if (tempTimer) {
    clearTimeout(tempTimer);
  }

  //start new time, to perform ajax stuff in 1000ms
  tempTimer = setTimeout(function () {
    callback();
  }, 1000);
}

function initialiseKeylessWidget(widgetInstance) {
  widgetInstance.keylessWidget.initLogin();

  // Listening to login success event.
  widgetInstance.keylessWidget.on(
    widgetInstance.keylessWidget.EVENTS.LOGIN_SUCCESS,
    (widgetData) => {
      if (widgetData.status) {
        widgetInstance.safleId = widgetData.data.safleId;
        widgetInstance.userAddress = widgetData.data.publicAddress;
        widgetInstance.userLoggedIn = true;
        setUserPublicAddress(widgetData.data.publicAddress);
        setSwapVia('safleId');
      }
    }
  );

  // Listening to keyless widget closed event.
  widgetInstance.keylessWidget.on(
    widgetInstance.keylessWidget.EVENTS.KEYLESS_WIDGET_CLOSED,
    (widgetCloseData) => {
      if (widgetCloseData.status) {
        const initMethod = widgetCloseData.initMethod;
        const tranxHashExist =
          widgetCloseData.transactionHash != undefined &&
          widgetCloseData.transactionHash != '';

        if (initMethod == 'login') {
          setActiveTab(widgetInstance, 'swap-modal');
        } else if (
          initMethod == 'sign-and-send-transaction' &&
          tranxHashExist
        ) {
          setActiveTab(widgetInstance, 'success-modal');
        } else {
          // Default redirection to swap widget.
          setActiveTab(widgetInstance, 'swap-modal');
        }
      }
    }
  );
}

function signAndSendTransactionUsingKeyless(widgetInstance, rawTransaction) {
  widgetInstance.keylessWidget.initSendTransaction(rawTransaction);

  // Listening to transaction success event.
  widgetInstance.keylessWidget.on(
    widgetInstance.keylessWidget.EVENTS.SIGN_AND_SEND_TRANSACTION_SUCCESSFUL,
    (transactionData) => {
      if (transactionData.status) {
        const transactionHash = transactionData.data.transactionHash;
        widgetInstance.response = {
          transactionHash: transactionHash
        };
        widgetInstance.transactionHash = transactionHash;
        successEmitter(widgetInstance);
      } else {
        widgetInstance.response = {};
        failureEmitter(widgetInstance);
      }
    }
  );

  // Listening to transaction failure event.
  widgetInstance.keylessWidget.on(
    widgetInstance.keylessWidget.EVENTS.SIGN_AND_SEND_TRANSACTION_FAILED,
    (transactionData) => {
      widgetInstance.response = transactionData.data;
      failureEmitter(widgetInstance);
    }
  );

  // Listening to keyless widget closed event.
  widgetInstance.keylessWidget.on(
    widgetInstance.keylessWidget.EVENTS.KEYLESS_WIDGET_CLOSED,
    (widgetCloseData) => {
      const tranxHashExist =
        widgetCloseData.transactionHash != undefined &&
        widgetCloseData.transactionHash != '';

      if (
        widgetCloseData.status &&
        widgetCloseData.initMethod == 'sign-and-send-transaction' &&
        tranxHashExist
      ) {
        setActiveTab(widgetInstance, 'success-modal');
      } else {
        // Default redirection to swap widget.
        setActiveTab(widgetInstance, 'swap-modal');
      }
    }
  );
}

async function swapTokensBasedOnWalletSelected(widgetInstance) {
  switch (widgetInstance.swapVia) {
    case 'safleId':
      const rawTransactionDetails = await swapTokenUsingSafleId(
        widgetInstance
      );

      closeModal(widgetInstance);
      signAndSendTransactionUsingKeyless(widgetInstance, rawTransactionDetails);
      break;
    case 'metamask':
      const metaResponse = await swapTokenUsingMetaMask(widgetInstance);

      hideLoader();
      if (metaResponse.status) {
        widgetInstance.response = {};
        successEmitter(widgetInstance);
        setActiveTab(widgetInstance, 'check-with-meta-mask-modal');
      } else {
        failureEmitter(widgetInstance);
      }
      break;
    case 'privateKey':
      if (widgetInstance.privateKey) {
        const privateResponse = await swapTokenUsingPrivateKey(widgetInstance);
        hideLoader();
        if (privateResponse.status) {
          successEmitter(widgetInstance);
          setActiveTab(widgetInstance, 'success-modal');
        } else {
          failureEmitter(widgetInstance);
        }
      } else {
        setActiveTab(widgetInstance, 'private-key-to-swap');
      }
      break;
    case 'keyStore':
      if (widgetInstance.privateKey) {
        const keyStoreResponse = await swapTokenUsingPrivateKey(widgetInstance);
        hideLoader();
        if (keyStoreResponse.status) {
          successEmitter(widgetInstance);
          setActiveTab(widgetInstance, 'success-modal');
        } else {
          failureEmitter(widgetInstance);
        }
      } else {
        setActiveTab(widgetInstance, 'key-store-to-swap');
      }
      break;
    default:
      throw new Error(INVALID_WALLET_OPTION);
  }
}

function swapModalEvents(widgetInstance) {
  const swapNowButton = document.getElementById('swap-now-button');
  swapNowButton.onclick = async() => {
    showLoader();

    const swapValueResponse = updateTokenSwapsValue(widgetInstance);
    if (swapValueResponse.status) {
      swapTokensBasedOnWalletSelected(widgetInstance);
    }
  };

  const sourceQuantityInput = document.getElementById('source-quantity');
  sourceQuantityInput.onkeydown = () => {
    waitForUserInput(async () => {
      showLoader();
      await updateSlippagePercentage(widgetInstance);
      await getDestinationQuantity(widgetInstance);
      await checkGasPrice(widgetInstance);
      hideLoader();
    });
  };

  const sourceTokenSelect = document.getElementById('source-token');
  sourceTokenSelect.onchange = async () => {
    showLoader();
    document.getElementById('source-quantity').value = '';
    await updateSwapConfiguration(widgetInstance);
    await getDestinationQuantity(widgetInstance);
    await checkGasPrice(widgetInstance);
    hideLoader();
  };

  const destinationQuantityInput = document.getElementById(
    'destination-quantity'
  );
  destinationQuantityInput.onkeydown = () => {
    waitForUserInput(async () => {
      showLoader();
      await updateSlippagePercentage(widgetInstance);
      await getSourceQuantity(widgetInstance);
      await checkGasPrice(widgetInstance);
      hideLoader();
    });
  };

  const destinationTokenSelect = document.getElementById('destination-token');
  destinationTokenSelect.onchange = async () => {
    showLoader();
    document.getElementById('destination-quantity').value = '';
    updateTokenSwapsValue(widgetInstance);
    await updateSwapConfiguration(widgetInstance);
    await getSourceQuantity(widgetInstance);
    await checkGasPrice(widgetInstance);
    hideLoader();
  };

  const toggleSwap = document.getElementById('toggle-swap');
  toggleSwap.onclick = async () => {
    showLoader();
    await toggleSourceAndDestinationTokens(widgetInstance);
    const selectCustomDesign = new CustomEvent('initCustomSelectDesign', {});
    document.dispatchEvent(selectCustomDesign);
    hideLoader();
  };

  const changeWalletText = document.getElementById('change-wallet');
  changeWalletText.onclick = async () => {
    showLoader();
    await changeWallet(widgetInstance);
    setActiveTab(widgetInstance, 'connect-to-wallet-modal');
  };
}

function successEmitter(widgetInstance) {
  const swapValues = widgetInstance.swapValues;
  const userAddress = widgetInstance.userAddress;
  const swapVia = widgetInstance.swapVia;

  widgetInstance.eventEmitter.emit(
    widgetInstance.EVENTS.TOKEN_SWAP_TRANSACTION_SUCCESSFUL,
    {
      status: true,
      eventName: widgetInstance.EVENTS.TOKEN_SWAP_TRANSACTION_SUCCESSFUL,
      data: {
        srcToken: swapValues.srcTokenAddress,
        destToken: swapValues.dstTokenAddress,
        srcQty: swapValues.srcQty,
        dstQty: swapValues.dstQty,
        walletType: swapVia,
        publicAddress: userAddress,
        txHash: widgetInstance.transactionHash,
        txReceipt: widgetInstance.response
      }
    }
  );
}

function failureEmitter(widgetInstance) {
  const swapValues = widgetInstance.swapValues;
  const userAddress = widgetInstance.userAddress;
  const swapVia = widgetInstance.swapVia;

  widgetInstance.eventEmitter.emit(
    widgetInstance.EVENTS.TOKEN_SWAP_TRANSACTION_FAILED,
    {
      status: true,
      eventName: widgetInstance.EVENTS.TOKEN_SWAP_TRANSACTION_FAILED,
      data: {
        srcToken: swapValues.srcTokenAddress,
        destToken: swapValues.dstTokenAddress,
        srcQty: swapValues.srcQty,
        dstQty: swapValues.dstQty,
        walletType: swapVia,
        publicAddress: userAddress,
        txHash: widgetInstance.transactionHash
          ? widgetInstance.transactionHash
          : '',
        txReceipt: widgetInstance.response
      }
    }
  );
}

export function initOnClickEvents(widgetInstance) {
  const activeId = widgetInstance.activeTabIdName;

  switch (activeId) {
    case 'connect-to-wallet-modal':
      const connectViaHanleName = document.getElementById(
        'connect-via-handle-name-modal'
      );
      connectViaHanleName.onclick = () => {
        widgetInstance.swapVia = 'safleId';
        closeModal(widgetInstance);
        initialiseKeylessWidget(widgetInstance);
      };

      const connectViaMetaMask = document.getElementById(
        'connect-via-meta-mask-modal'
      );
      connectViaMetaMask.onclick = async () => {
        showLoader();
        widgetInstance.swapVia = 'metamask';
        const metaMaskResponse = await connectWithMetaMask(widgetInstance);

        if (metaMaskResponse.status) {
          widgetInstance.userLoggedIn = true;
          setActiveTab(widgetInstance, 'swap-modal');
        }
        hideLoader();
      };

      const connectViaPrivateKey = document.getElementById(
        'connect-via-private-key-modal'
      );
      connectViaPrivateKey.onclick = () => {
        setActiveTab(widgetInstance, 'connect-via-private-key-modal');
      };

      const connectViaKeyStore = document.getElementById(
        'connect-via-keystore-modal'
      );
      connectViaKeyStore.onclick = () => {
        setActiveTab(widgetInstance, 'connect-via-keystore-modal');
      };
      break;
    case 'connect-via-private-key-modal':
      const connectViaPrivateKeyButton = document.getElementById(
        'connect-with-private-key-button'
      );
      connectViaPrivateKeyButton.onclick = async () => {
        showLoader();
        const privateKeyResponse = await connectWithPrivateKey(widgetInstance);

        if (privateKeyResponse.status) {
          widgetInstance.userLoggedIn = true;
          setActiveTab(widgetInstance, 'swap-modal');
        }
        hideLoader();
      };

      const privateBackIcon = document.getElementById('back-arrow-icon');
      privateBackIcon.onclick = () => {
        setActiveTab(widgetInstance, 'connect-to-wallet-modal');
      };
      break;
    case 'connect-via-keystore-modal':
      const keyStoreFile = document.getElementById('key-store-file');
      keyStoreFile.onchange = () => {
        document.getElementById('file-name').innerHTML =
          keyStoreFile.files[0].name;
        document.getElementById('show-file-name').style.display = 'block';
      };

      const connectViaKeyStoreButton = document.getElementById(
        'connect-with-keystore-button'
      );
      connectViaKeyStoreButton.onclick = () => {
        const updateEncryptedJsonAndProceed = async (encryptedJson) => {
          document.getElementById('show-uploading-message').style.display =
            'none';
          document.getElementById('show-uploaded-message').style.display =
            'block';
          widgetInstance.encryptedJson = encryptedJson;
          setTimeout(function () {
            setActiveTab(widgetInstance, 'connect-via-pass-phrase-modal');
          }, 1000);
        };

        document.getElementById('show-file-name').style.display = 'none';
        document.getElementById('show-uploading-message').style.display =
          'block';
        setTimeout(function () {
          let file = keyStoreFile.files[0];
          let fileread = new FileReader();

          fileread.onload = function (e) {
            updateEncryptedJsonAndProceed(JSON.parse(e.target.result));
          };
          fileread.readAsText(file);
        }, 1500);
      };

      const keyStoreBackIcon = document.getElementById('back-arrow-icon');
      keyStoreBackIcon.onclick = () => {
        setActiveTab(widgetInstance, 'connect-to-wallet-modal');
      };
      break;
    case 'connect-via-pass-phrase-modal':
      const connectViaPassPhraseButton = document.getElementById(
        'connect-with-pass-phrase-button'
      );

      connectViaPassPhraseButton.onclick = async () => {
        showLoader();
        const passPhraseResponse = await connectWithKeyStore(widgetInstance);

        if (passPhraseResponse.status) {
          widgetInstance.userLoggedIn = true;
          setActiveTab(widgetInstance, 'swap-modal');
        }
        hideLoader();
      };
      break;
    case 'swap-modal':
      swapModalEvents(widgetInstance);
      break;
    case 'private-key-to-swap':
      const proceedSwappingButton = document.getElementById('proceed-swapping');
      proceedSwappingButton.onclick = () => {
        const privateKey = document.getElementById('private-key').value;
        const errorMessage = document.getElementById('error-message');

        if (privateKey && privateKey != '') {
          showLoader();
          errorMessage.style.display = 'none';
          widgetInstance.privateKey = privateKey;
          swapTokensBasedOnWalletSelected(widgetInstance);
        } else {
          errorMessage.innerHTML = ENTER_PRIVATE_KEY;
          errorMessage.style.display = 'block';
        }
      };
      break;
    case 'key-store-to-swap':
      const keyStoreToSwapFile = document.getElementById('key-store-file');
      keyStoreToSwapFile.onchange = () => {
        document.getElementById('file-name').innerHTML =
          keyStoreToSwapFile.files[0].name;
        document.getElementById('show-file-name').style.display = 'block';
      };

      const keyStoreToSwapButton = document.getElementById(
        'keystore-to-swap-button'
      );
      keyStoreToSwapButton.onclick = () => {
        const updateEncryptedJsonAndProceed = async (encryptedJson) => {
          document.getElementById('show-uploading-message').style.display =
            'none';
          document.getElementById('show-uploaded-message').style.display =
            'block';
          widgetInstance.encryptedJson = encryptedJson;
          setTimeout(function () {
            setActiveTab(widgetInstance, 'pass-phrase-to-swap');
          }, 1000);
        };

        document.getElementById('show-file-name').style.display = 'none';
        document.getElementById('show-uploading-message').style.display =
          'block';
        setTimeout(function () {
          let file = keyStoreToSwapFile.files[0];
          let fileread = new FileReader();

          fileread.onload = function (e) {
            updateEncryptedJsonAndProceed(JSON.parse(e.target.result));
          };
          fileread.readAsText(file);
        }, 1500);
      };
      break;
    case 'pass-phrase-to-swap':
      const passPhraseToSwapButton = document.getElementById(
        'pass-phrase-to-swap-button'
      );
      passPhraseToSwapButton.onclick = async () => {
        const passPhrase = document.getElementById('pass-phrase').value;
        const errorMessage = document.getElementById('error-message');

        if (passPhrase && passPhrase != '') {
          showLoader();
          errorMessage.style.display = 'none';
          const passPhraseResponse = await getPrivateKeyFromKeyStore(
            widgetInstance
          );
          if (passPhraseResponse.status) {
            swapTokensBasedOnWalletSelected(widgetInstance);
          }
        } else {
          errorMessage.innerHTML = ENTER_PASS_PHRASE;
          errorMessage.style.display = 'block';
        }
      };
      break;
    case 'check-with-meta-mask-modal':
      const checkWithMetaMaskButton = document.getElementById(
        'check-with-meta-mask-button'
      );
      checkWithMetaMaskButton.onclick = () => {
        closeModal(widgetInstance);
      };
      break;
    case 'success-modal':
      const swapMoreButton = document.getElementById('swap-more-button');
      swapMoreButton.onclick = () => {
        setActiveTab(widgetInstance, 'swap-modal');
      };
      break;
    default:
      setActiveTab(widgetInstance, 'connect-to-wallet-modal');
  }
}
