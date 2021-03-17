import { CloseIcon } from '../../assets/images/close-icon';
import { LoaderGif } from '../../assets/images/loader';

export function ModalLoader() {
  return `<div class="custom-modal"  id="modalloader">
  <div class="custom-dialog">
    <div>
      <div class="safle-loader">
        <div class="loader-container">
          ${LoaderGif}
        </div>
      </div>
    </div>

    <div class="content">
      <div class="common-modal-body">
        <div class="wallet-modal connect-modal">
          <div class="widget-modal-content modal-loader-content">
          </div>
          <div class="close-button">
            <button id="close-icon" type="button" data-dismiss="modal">
              ${CloseIcon}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;
}
