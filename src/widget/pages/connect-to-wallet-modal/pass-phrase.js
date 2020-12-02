import { getWallet } from '../../..';

import { CloseIcon } from '../../assets/images/close-icon';
import { InbloxLogo } from '../../assets/images/inblox-logo';
import { InbloxMe } from '../../assets/images/inblox-me';

import { Loader } from '../loaders/loader';
import { setUserPublicAddress } from '../../utils';
import { setSwapVia } from '../../utils/storage-and-user-helper';

export function ConnectViaPassPhraseModal() {
  return `<div class="custom-modal"  id="connect-via-pass-phrase-modal">
  <div class="custom-dialog">
    ${Loader}
    <div class="content">
      <div class="common-modal-body">
        <div class="wallet-modal">
          <div class="widget-modal-content">
            <div class="wallet-head">
              <div class="image">
                ${InbloxLogo}
                <h4>Connect your Wallet  <span class="via">via </span> Inblox Key Store</h4>
                <h2>
                This is not a recommended method of using Swaps.
                </h2>
              </div>
            </div>
            <div class="wallet-form custom-form handle">
              <div class="custom-input">
                <label>Enter Pass Phrase</label>
                <input type="password" placeholder="Pass Phrase" id="pass-phrase">
              </div>
              <div class="custom-input">
                <label id="error-message"></label>
              </div>
              <div class="button-section">
                <button class="blue-btn" id="connect-with-pass-phrase-button">
                  Connect
                </button>
              </div>
              <div class="notes">
                <label>powered by <a href="https://inblox.me/" target="_blank">${InbloxMe}</a></label>
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

export const connectWithKeyStore = async (widgetInstance) => {
  const passPhrase = document.getElementById('pass-phrase').value;
  const encryptedJson = widgetInstance.encryptedJson;

  let keyStoreCredentials = {
    wallet: 'keyStore',
    keystoreJson: encryptedJson,
    passphrase: passPhrase
  };

  return await getWallet(keyStoreCredentials).then((res) => {
    const errorMessage = document.getElementById('error-message');

    if (res.address) {
      errorMessage.style.display = 'none';
      widgetInstance.privateKey = res.privateKey.slice(2);
      widgetInstance.userAddress = res.address;
      setUserPublicAddress(res.address);
      setSwapVia('keyStore');
      return { status: true };
    } else {
      errorMessage.innerHTML = res.error;
      errorMessage.style.display = 'block';
      return { status: false };
    }
  });
};
