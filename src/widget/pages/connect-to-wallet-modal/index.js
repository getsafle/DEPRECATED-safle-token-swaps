import { CloseIcon } from '../../assets/images/close-icon';
import { HandleNameIcon } from '../../assets/images/handle-name-icon';
import { KeyStoreIcon } from '../../assets/images/key-store-icon';
import { MetaMaskIcon } from '../../assets/images/meta-mask-icon';
import { PrivateKeyIcon } from '../../assets/images/private-key-icon';
import { InbloxMe } from '../../assets/images/inblox-me';

import { Loader } from '../loaders/loader';

export function ConnectToWalletModal() {
  return `<div class="custom-modal" id="connect-to-wallet-modal">
  <div class="custom-dialog">
    ${Loader}
    <div class="content">
      <div class="common-modal-body">
        <div class="wallet-modal connect-modal">
          <div class="widget-modal-content">
            <div class="wallet-head">
              <div class="image">
                <h4 class="mb"> Connect your Wallet</h4>
              </div>
            </div>
            <div class="custom-input">
              <label id="error-message"></label>
            </div>
            <div class="wallet-form">
              <div class="connetwallet-card-wrap">
                <div class="rsps-card">
                  <label>
                    <input type="radio" name="connect-wallet-via" value="connect-via-handle-name-modal" id="connect-via-handle-name-modal" class="rsps-card-input-element" />
                    <div class="rsps-card-input">
                      <div class="rsps-icon">
                        ${HandleNameIcon}
                      </div>
                      <div class="rsps-text">
                        <label>Inbloxme HandleName</label>
                      </div>
                    </div>
                  </label>
                </div>
                <div class="rsps-card">
                  <label>
                    <input type="radio" name="connect-wallet-via" value="connect-via-meta-mask-modal" id="connect-via-meta-mask-modal" class="rsps-card-input-element" />
                    <div class="rsps-card-input">
                      <div class="rsps-icon">
                        ${MetaMaskIcon}
                      </div>
                      <div class="rsps-text">
                        <label>MetaMask</label>
                      </div>
                    </div>
                  </label>
                </div>
                <div class="rsps-card">
                  <label>
                    <input type="radio" name="connect-wallet-via" value="connect-via-private-key-modal" id="connect-via-private-key-modal" class="rsps-card-input-element" />
                    <div class="rsps-card-input">
                      <div class="rsps-icon">
                        ${PrivateKeyIcon}
                      </div>
                      <div class="rsps-text">
                        <label>Private key</label>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
              <div class="connetwallet-card-wrap">
                <div class="rsps-card">
                  <label>
                    <input type="radio" name="connect-wallet-via" value="connect-via-keystore-modal" id="connect-via-keystore-modal" class="rsps-card-input-element" />
                    <div class="rsps-card-input">
                      <div class="rsps-icon">
                        ${KeyStoreIcon}
                      </div>
                      <div class="rsps-text">
                        <label>Keystore file</label>
                      </div>
                    </div>
                  </label>
                </div>
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
