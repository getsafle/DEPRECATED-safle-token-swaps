import { getWallet } from '../../../';

import { CloseIcon } from '../../assets/images/close-icon';
import { InbloxLogo } from '../../assets/images/inblox-logo';
import { InbloxMe } from '../../assets/images/inblox-me';

import { Loader } from '../loaders/loader';
import { setUserPublicAddress } from '../../utils';
import { setSwapVia } from '../../utils/storage-and-user-helper';

export function ConnectViaPrivateKeyModal() {
  return `<div class="custom-modal"  id="connect-via-private-key-modal">
  <div class="custom-dialog">
    ${Loader}
    <div class="content">
      <div class="common-modal-body">
        <div class="wallet-modal">
          <div class="widget-modal-content">
            <div class="wallet-head">
              <div class="image">
                ${InbloxLogo}
                <h4>Connect your Wallet  <span class="via">via </span> Inblox Private Key</h4>
                <h2>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry
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
                <button class="blue-btn" id="connect-with-private-key-button">
                  Connect
                </button>
              </div>
              <div class="notes">
                <label>powered by <a href="https://inblox.me/">${InbloxMe}</a></label>
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
    infuraKey: '7484a12fa3b544f79bf51ef44edd6db5',
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
      return { status: true, message: 'Got wallet address' };
    } else {
      errorMessage.style.display = 'block';
      errorMessage.innerHTML = 'Error connecting wallet';
      return { status: false, message: 'Error connecting wallet' };
    }
  });
};
