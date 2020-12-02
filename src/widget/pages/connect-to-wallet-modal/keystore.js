import { getWallet } from '../../../';

import { CloseIcon } from '../../assets/images/close-icon';
import { BackIcon } from '../../assets/images/back-icon';
import { InbloxLogo } from '../../assets/images/inblox-logo';
import { UploadIcon } from '../../assets/images/upload-icon';
import { InbloxMe } from '../../assets/images/inblox-me';

import { Loader } from '../loaders/loader';

export function ConnectViaKeyStoreModal() {
  return `<div class="custom-modal" id="connect-via-pass-phrase-modal">
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
                ${InbloxLogo}
                <h4>Connect your Wallet <span class="via">via </span>KeyStore File</h4>
                <h2>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry
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
                <button class="blue-btn" id="connect-with-keystore-button">
                  Upload
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
