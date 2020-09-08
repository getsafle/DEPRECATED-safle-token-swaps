import { CloseIcon } from '../../assets/images/close-icon';
import { InbloxLogo } from '../../assets/images/inblox-logo';
import { UploadIcon } from '../../assets/images/upload-icon';
import { InbloxMe } from '../../assets/images/inblox-me';

import { Loader } from '../loaders/loader';

export function KeyStoreToSwap() {
  return `<div class="custom-modal" id="key-store-to-swap">
  <div class="custom-dialog">
    ${Loader}
    <div class="content">
      <div class="common-modal-body">
        <div class="wallet-modal">
          <div class="widget-modal-content">
            <div class="wallet-head">
              <div class="image">
                ${InbloxLogo}
                <h4>Inblox Key Store</h4>
                <h2>
                  Upload your keystore file.
                </h2>
              </div>
            </div>
            <div class="wallet-form custom-form handle">
              <div class="upload-key-store">
                <span>
                  ${UploadIcon}
                </span>
                <p>
                  Drag & Drop keystore file here to upload
                </p>
                <label for="key-store-file">Browse File</label>
                <input id="key-store-file" name="key-store-file" type="file">
              </div>
              <div class="upload-msg" id="show-file-name">
                <span id="file-name"></span>
              </div>
              <div class="upload-msg" id="show-uploading-message">
                <span>Uploading...</span>
              </div>
              <div class="upload-msg" id="show-uploaded-message">
                <span>Uploaded</span>
              </div>
              <div class="button-section">
                <button class="blue-btn" id="keystore-to-swap-button">
                  Upload
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
