import { SafleFavicon } from '../../assets/images/safle-favicon';
import { CloseIcon } from '../../assets/images/close-icon';
import { SafleLogo } from '../../assets/images/safle-logo';

export function CheckWithMetaMaskModal() {
  return `<div class="custom-modal" id="check-with-meta-mask-modal">
  <div class="custom-dialog">
    <div class="content">
      <div class="common-modal-body">
        <div class="wallet-modal">
          <div class="widget-modal-content">
            <div class="wallet-head">
              <div class="image">
                ${SafleFavicon}
                <h4>Check Transaction <span class="via">with </span> Meta Mask</h4>
                <h2>
                Please check your Metamask to continue the transaction.
                </h2>
              </div>
            </div>
            <div class="wallet-form custom-form handle">
              <div class="button-section">
                <button class="blue-btn btn-centered" id="check-with-meta-mask-button">
                  Ok
                </button>
              </div>
              <div class="notes">
                <label>powered by <a href="https://getsafle.com">${SafleLogo}</a></label>
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
