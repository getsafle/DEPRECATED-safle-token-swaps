import { getWallet } from '../../../';

import { CloseIcon } from '../../assets/images/close-icon';
import { BackIcon } from '../../assets/images/back-icon';
import { SafleFavicon } from '../../assets/images/safle-favicon';
import { SafleLogo } from '../../assets/images/safle-logo';

import { Loader } from '../loaders/loader';
import { setUserPublicAddress } from '../../utils';
import { setSwapVia } from '../../utils/storage-and-user-helper';

import { ERROR_CONNECTING_WALLET } from '../../../constants/responses';

export function ConnectViaPrivateKeyModal() {
  return `<div class="custom-modal"  id="connect-via-private-key-modal">
  <div class="custom-dialog">
    ${Loader}
    <div class="content">
      <div id="back-arrow-icon">
        ${BackIcon}
      </div>
      <div class="common-modal-body">
        <div class="wallet-modal">
          <div class="widget-modal-content">
            <div class="wallet-head">
              <div class="image">
                ${SafleFavicon}
                <h4>Connect your Wallet  <span class="via">via </span>Private Key</h4>
                <h2>
                This is not a recommended method of using Swaps.
                </h2>
              </div>
            </div>
            <div class="wallet-form custom-form handle">
              <div class="custom-input">
                <label>Enter Private Key</label>
                <input type="password" placeholder="Private Key" autocomplete="off" id="private-key">
              </div>
              <div class="custom-input">
                <label id="error-message"></label>
              </div>
              <div class="button-section">
                <button class="blue-btn btn-centered" id="connect-with-private-key-button">
                  Connect
                </button>
              </div>
              <div class="notes">
                <label>powered by <a href="https://getsafle.com" target="_blank">${SafleLogo}</a></label>
              </div>
            </div>
          </div>
        </div>

        <div class="close-button">
          <button id="close-icon" type="button">
            ${CloseIcon}
          </button>
        </div>
      </div>
    </div>
  </div>
</div>`;
}

export const connectWithPrivateKey = async (widgetInstance) => {
  let privateKey = document.getElementById('private-key').value;
  const privateKeyCredentials = {
    wallet: 'privateKey',
    privateKey: privateKey
  };

  return await getWallet(privateKeyCredentials).then((res) => {
    const errorMessage = document.getElementById('error-message');
    privateKey = privateKey.includes('0x') ? privateKey.slice(2) : privateKey;

    if (res.wallet) {
      errorMessage.style.display = 'none';
      widgetInstance.privateKey = privateKey;
      widgetInstance.userAddress = res.wallet.address;
      setUserPublicAddress(res.wallet.address);
      setSwapVia('privateKey');
      return { status: true };
    } else {
      errorMessage.style.display = 'block';
      errorMessage.innerHTML = ERROR_CONNECTING_WALLET;
      return { status: false };
    }
  });
};
