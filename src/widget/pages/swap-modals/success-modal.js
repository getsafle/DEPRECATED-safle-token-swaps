import { CloseIcon } from '../../assets/images/close-icon';
import { GreenTick } from '../../assets/images/green-tick';
import { SafleLogo } from '../../assets/images/safle-logo';

export function SuccessModal(widgetInstance) {
  const swapValues = widgetInstance.swapValues;

  return `<div class="custom-modal"  id="success-modal">
  <div class="custom-dialog">
    <div class="content">
      <div class="common-modal-body">
        <div class="wallet-modal connect-modal success">
          <div class="widget-modal-content">
            <div class="wallet-head">
              <div class="image">
                ${GreenTick}
                <h4> Success</h4>
                <p><span>${swapValues.srcQty} ${swapValues.srcSymbol}</span> successfully converted to <span>${swapValues.dstQty} ${swapValues.dstSymbol}</span></p>
                <label>Check your transaction on <a href="https://ropsten.etherscan.io/tx/${widgetInstance.transactionHash}" target="_blank"><img src="https://etherscan.io/images/logo-ether.png" alt="ether-scan" class="ether-scan-logo"></a></label>
              </div>
            </div>
            <div class="wallet-form">
              <div class="button-section">
                <button id="swap-more-button" class="blue-btn btn-centered">Swap More</button>
              </div>
              <div class="notes">
                <label>powered by <a href="https://getsafle.com">${SafleLogo}</a></label>
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
  </div>
</div>`;
}
