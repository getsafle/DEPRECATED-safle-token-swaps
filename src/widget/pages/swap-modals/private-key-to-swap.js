import { CloseIcon } from '../../assets/images/close-icon';
import { InbloxLogo } from '../../assets/images/inblox-logo';
import { InbloxMe } from '../../assets/images/inblox-me';

import { Loader } from '../loaders/loader';

export function PrivateKeyToSwap() {
  return `<div class="custom-modal"  id="private-key-to-swap">
  <div class="custom-dialog">
    ${Loader}
    <div class="content">
      <div class="common-modal-body">
        <div class="wallet-modal">
          <div class="widget-modal-content">
            <div class="wallet-head">
              <div class="image">
                ${InbloxLogo}
                <h4>Inblox Private Key</h4>
                <h2>
                  Type your private key to proceed swapping.
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
                <button class="blue-btn" id="proceed-swapping">
                  Proceed
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
