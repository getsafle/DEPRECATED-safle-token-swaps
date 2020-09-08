import { CloseIcon } from '../../assets/images/close-icon';

export function ModalLoader() {
  return `<div class="custom-modal"  id="modalloader">
  <div class="custom-dialog">
    <div>
      <div class="inblox-loader">
        <div class="loader-container">
          <div class="bar1 bar"></div>
          <div class="bar2 bar"></div>
          <div class="bar3 bar"></div>
          <div class="bar4 bar"></div>
          <div class="bar5 bar"></div>
          <div class="bar6 bar"></div>
          <div class="bar7 bar"></div>
          <div class="bar8 bar"></div>
          <div class="bar9 bar"></div>
          <div class="bar10 bar"></div>

          <div class="progress-container">
            <div class="progress"></div>
          </div>
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
