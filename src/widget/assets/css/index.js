export function WidgetCSS() {
  return `#safleTokenSwapWidget {
    font-family: 'Poppins', sans-serif !important;
    font-weight: 300;
    margin: 0px;
  }
  #safleTokenSwapWidget h1,
  #safleTokenSwapWidget h2,
  #safleTokenSwapWidget h3,
  #safleTokenSwapWidget h4,
  #safleTokenSwapWidget h5,
  #safleTokenSwapWidget h6 {
    margin: 0px;
    color: #2e2e2f;
    font-weight: 400;
  }
  
  #safleTokenSwapWidget p {
    margin: 0px;
  }
  #safleTokenSwapWidget input {
    outline: 0;
  }
  .blue-btn {
    /*background-image: linear-gradient(to right, #12bde2, #0669f8);
    text-align: center;
    color: #fff;
    padding: 10px 0px;
    display: block;
    width: 100%;
    border-radius: 90px;
    text-decoration: none !important;
    cursor: pointer;
    border: none;
    font-size: 16px;*/

    outline: 0;
    cursor: pointer;
    border-radius: 8px;
    padding: 1rem 3rem;
    text-align: center;
    color: #fff;
    font-size: 15px;
    font-weight: 500;
    display: block;
    margin-bottom: 2.5rem;
    min-width: 15rem;
    background-color: #0669F8;
    border: 0px;
    transition: all 250ms ease-in-out;
    -webkit-transition: all 250ms ease-in-out;
    -moz-transition: all 250ms ease-in-out;
    -o-transition: all 250ms ease-in-out;
  }
  .blue-btn:disabled {
    background-color: #6484b9;
    cursor: not-allowed;
    background-image: none;
  }
  .blue-btn[disabled]:hover {
    background-color: #6484b9;
  }
  .blue-btn:hover {
    /*color: #fff;
    background-color: #0a367d;*/
    color: #fff;
    background-color: #12BDE2;
    opacity: 0.6;
  }
  .blue-btn:active {
    color: #fff;
    background-color: #0669F8;
  }
  .blue-btn:focus {
    color: #fff;
    background-color: #0669F8;
  }
  .btn-centered {
    margin-left: auto;
    margin-right: auto;
  }
  
  /* Widget Modal */
  .custom-modal {
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 9999;
  }
  .widget-modal-content {
    background-color: #fff;
    border: 1px solid #d7e5fc;
    border-radius: 10px;
    border-radius: 7px;
    padding: 20px 50px;
    margin: 0px auto;
  }
  .modal-loader-content {
    height: 630px;
  }
  .widget-modal-content.active {
    display: block;
  }
  .wallet-modal .wallet-head {
    margin: 0px auto;
    text-align: center;
  }
  .wallet-modal .wallet-head svg {
    width: 100px;
    height: 100px;
  }
  .wallet-modal .wallet-head h4 .via {
    display: block;
    color: #6f6f6f;
    font-size: 24px;
    padding: 4px 0px;
  }
  .wallet-modal .wallet-head h4 {
    font-size: 28px;
    color: #2e2e2f;
    padding-top: 0px;
    padding-bottom: 10px;
  }
  .wallet-modal .wallet-head h4.mb {
    margin-top: 50px;
  }
  .wallet-modal .wallet-head p span {
    font-weight: 800;
  }
  .wallet-modal .wallet-head label {
    padding-top: 10px;
    font-weight: 700;
    font-size: 18px;
    display: inline-block;
  }
  .wallet-modal .wallet-head label span {
    vertical-align: middle;
  }
  .wallet-modal .wallet-head p {
    color: #2e2e2f;
    font-size: 16px;
  }
  .wallet-modal .wallet-head h2 {
    color: #2e2e2f;
    font-size: 16px;
    text-align: center;
    padding-bottom: 20px;
  }
  .wallet-form .custom-input label {
    display: block;
    color: #2e2e2f;
    font-size: 16px;
    padding-bottom: 20px;
    margin-bottom: 0px;
  }
  #safleTokenSwapWidget .wallet-form .custom-input label {
    padding-bottom: 0;
  }
  .wallet-form .custom-input {
    position: relative;
    margin-bottom: 20px;
  }
  .wallet-form.handle .custom-input input {
    text-align: left;
  }
  .wallet-form .custom-input input {
    /*width: 100%;
    text-align: right;
    padding: 14px 20px;
    background: #f4f4f4;
    border-radius: 20px;
    border: none;
    color: #6f6f6f;
    font-size: 16px;
    height: 20px;*/

    font-size: 14px;
    font-weight: 500;
    color: #000000;
    opacity: 1;
    line-height: 1.2;
    padding: 1.3rem 1rem;
    box-sizing: border-box;
    z-index: 35;
    max-width: 100%;
    width: 100%;
    background: #fff;
    border-radius: 8px;
    border: 1px solid #e4e5e6;
    outline: none;
  }
  .wallet-form.custom-form .custom-input input {
    padding: 1.2rem 1rem;
  }
  .wallet-form .custom-input input.swap-input {
    text-align: right;
  }
  .wallet-form .upload-key-store {
    padding: 25px;
    text-align: center;
    border: 2px dashed #c2d7f8;
    margin-bottom: 25px;
    cursor: pointer;
  }
  .wallet-form .upload-msg {
    padding: 10px;
    border: 1px solid #eaf2ff;
    border-radius: 10px;
    display: none;
  }
  .wallet-form .upload-msg span {
    color: #359857;
  }
  .wallet-form .upload-key-store label {
    margin-top: 10px;
    display: block;
    color: #3974d4;
    text-decoration: underline;
    cursor: pointer;
    margin: 0 auto;
  }
  .wallet-form .custom-input p {
    color: #a0a0a0;
    font-size: 12px;
    line-height: 28px;
    text-align: right;
  }
  .wallet-form .custom-input p span {
    color: #2e2e2f;
    font-size: 12px;
    font-weight: 600;
  }
  .wallet-form .custom-input p label {
    color: #d93025;
    background-color: #ffe7e5;
    border-radius: 20px;
    display: inline;
    font-size: 10px;
    height: 15px;
    padding-bottom: 0px;
    padding: 0px 10px;
  }
  .wallet-form .custom-input p img {
    vertical-align: sub;
    margin-right: 5px;
  }
  .wallet-form .button-section .blue-btn {
    margin-bottom: 0.5rem;
  }
  .custom-input .custom-drop {
    position: absolute;
    top: 29px;
    left: 10px;
  }
  .custom-input select {
    color: #2e2e2f;
    border: none;
    background-color: transparent;
  }
  .custom-input select:focus {
    outline: none !important;
  }
  .custom-drop span {
    border: 100%;
    width: 28px;
    height: 32px;
    display: inline-block;
    border-radius: 100%;
    text-align: center;
    vertical-align: middle;
  }
  .custom-drop .align-bottom {
    vertical-align: bottom;
  }
  .custom-drop span img {
    width: 28px;
  }
  .custom-drop span img {
    margin-top: 3px;
  }
  .custom-drop span.green {
    background-color: transparent;
  }
  .custom-drop span.green img {
    margin-top: 0px;
  }
  
  .wallet-form .arrow {
    text-align: center;
    display: inline-block;
  }
  .wallet-form .arrow svg {
    cursor: pointer;
    width: 30px;
    text-align: center;
    margin: 0px auto;
  }
  .wallet-form .button-section {
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .wallet-form .notes {
    text-align: center;
  }
  .wallet-form .notes p {
    font-size: 12px;
    color: #6f6f6f;
    margin-bottom: 20px;
  }
  .wallet-form .notes p a {
    font-size: 12px;
    color: #1f4788;
    text-decoration: underline;
  }
  .wallet-form .notes label {
    color: #2e2e2f;
    font-size: 10px;
    height: 25px;
    line-height: 25px;
  }
  .wallet-form .notes label a {
    color: #1f4788;
    text-decoration: none;
    font-weight: 600;
    vertical-align: middle;
    display: inline-block;
    margin-top: -10px;
    height: 25px;
  }
  .wallet-form .notes label a svg {
    width: 60px;
  }
  .connect-modal .blue-btn {
    width: 300px;
    text-align: center;
    margin: 0px auto;
  }
  
  .connetwallet-card-wrap {
    display: flex;
    justify-content: space-evenly;
    margin-top: 0px;
  }
  .connetwallet-card-wrap .rsps-card {
    text-align: center;
    width: 25%;
    height: 165px;
  }
  .rsps-card-input-element {
    display: none;
  }
  .rsps-card-input {
    padding: 0px;
  }
  .rsps-card-input:hover {
    cursor: pointer;
  }
  
  .rsps-card-input-element:checked + .rsps-card-input .rsps-icon {
    border: 1px solid #1f4788;
  }
  
  .rsps-icon {
    border-radius: 4px;
    background-color: #f5f6fa;
    padding: 0px;
    width: 115px;
    text-align: center;
    border: 1px solid #f5f6fa;
  }
  .rsps-text label {
    font-weight: 400;
    font-size: 14px;
    line-height: 25px;
    margin-top: 10px;
    color: #6f6f6f;
  }
  .success .blue-btn {
    background: #ffffff;
    border: 1px solid #1f4788;
    color: #1f4788;
    font-weight: 600;
  }
  .success .blue-btn:hover {
    background-image: linear-gradient(to right, #12bde2, #0669f8) !important;
    color: #fff;
  }
  .wallet-form.custom-form .custom-input input {
    // width: 91%;
  }
  
  /* modal */
  .custom-modal .custom-dialog {
    margin: 0px auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) !important;
    box-shadow: 0px 2px 8px #00000014;
    border: 1px solid #d7e5fc;
    border-radius: 7px;
  }
  .custom-modal .content {
    box-shadow: none;
    border: none !important;
    width: 555px;
    margin: 0px auto;
  }
  .custom-modal .close-button button {
    border: 0px;
    border-radius: 100%;
    background: #000;
    padding: 7px 9px;
    cursor: pointer;
  }
  
  .custom-modal button img {
    width: 10px;
  }
  .custom-modal button:focus {
    outline: none;
  }
  .custom-modal .close-button {
    position: absolute;
    top: -13px;
    right: -10px;
    z-index: 99999 !important;
  }
  .ether-scan-logo {
    width: 30%;
    cursor: pointer;
  }
  #key-store-file {
    visibility: hidden;
  }
  #error-message {
    font-size: 11px;
    color: red;
    padding-bottom: 0px;
    display: inline-block;
  }
  #show-file-name {
    display: none;
  }
  #change-wallet {
    color: #1f4788;
    cursor: pointer;
  }
  #change-wallet:hover {
    text-decoration: underline;
  }
  
  /* Chrome, Safari, Edge, Opera */
  .wallet-form .custom-input input::-webkit-outer-spin-button,
  .wallet-form .custom-input input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  /* Firefox */
  .wallet-form .custom-input input[type='number'] {
    -moz-appearance: textfield;
  }
  
  /* select */
  .ts-custom-select {
    width: 100px;
    display: inline-block;
    margin-left: 5px;
  }
  .ts-custom-select select {
    display: none;
  }
  
  .select-selected {
    display: inline-block;
  }
  
  /* Style the arrow inside the select element: */
  .select-selected:after {
    position: absolute;
    content: '';
    top: 12px;
    right: 10px;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    border: solid black;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 2px;
  }
  
  /* Point the arrow upwards when the select box is open (active): */
  .select-selected.select-arrow-active:after {
    transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
    border: solid black;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 2px;
  }
  .select-items span {
    height: 42px;
  }
  
  /* style the items (options), including the selected item: */
  .select-items div,
  .select-selected {
    color: #000;
    cursor: pointer;
    font-size: 14px;
    line-height: 30px;
  }
  
  /* Style items (options): */
  // eslint-disable-next-line max-lines
  .select-items {
    position: absolute;
    top: 40px;
    left: -25px;
    right: 0;
    z-index: 99;
    background: #fff;
    box-shadow: 0px 1px 4px #00000029;
    border-radius: 8px;
    width: 245px;
    height: 250px;
    overflow: auto;
    color: #2e2e2f;
    font-size: 12px;
  }
  
  /* Hide the items when the select box is closed: */
  .select-hide {
    display: none;
  }
  .select-items div {
    padding: 15px;
  }
  
  .select-items div:hover,
  .same-as-selected {
    background-color: rgba(0, 0, 0, 0.1);
  }
  
  .ts-custom-select ::-webkit-scrollbar {
    width: 8px;
  }
  
  .ts-custom-select ::-webkit-scrollbar-track {
    background-color: #f5f6fa;
    border-radius: 10px;
  }
  
  .ts-custom-select ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #cccccc;
  }
  
  #back-arrow-icon {
    float: left;
    cursor: pointer;
    padding: 15px 0px 0px 10px;
  }
  
  /* Loader CSS */
  #loader {
    display: none;
  }
  .safle-loader {
    background-color: #a09e9ee3;
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 99999 !important;
    top: 0;
    left: 0;
  }
  
  .loader-container {
    position: relative;
    z-index: 999;
    width: 12em;
    overflow: show;
    margin: auto;
    top: 50%;
    left: 0;
    bottom: 0;
    right: 0;
    transform: translateY(-50%);
    text-align: center;
  }
  
  .loader-container img {
    width: 80%;
  }

  .loader-container svg {
    width: 80%;
    transform: scale(1);
    animation: beat 1.4s 0s linear infinite;
  }
  @keyframes beat {
    0% {
      transform: scale(1)
    }
    50% {
      transform: scale(1.15)
    }
    100% {
      transform: scale(1)
    }
  }
  
  @media only screen and (max-width: 767px) {
    .wallet-modal .wallet-head h4.mb {
      margin-top: 20px;
    }
  
    .connect-modal .blue-btn {
      width: 100%;
    }
    .custom-input .custom-drop {
      top: 36px;
      left: 15px;
    }
    .wallet-form .custom-input input {
      padding: 10px;
      font-size: 14px;
    }
    .widget-modal-content {
      padding: 15px;
    }
    .custom-modal .content {
      width: 100%;
    }
  
    .rsps-icon {
      width: 85px;
    }
    .wallet-modal .wallet-head h4 {
      font-size: 18px;
    }
    .rsps-text label {
      font-size: 12px;
      line-height: 18px;
    }
    .connetwallet-card-wrap .rsps-card {
      margin-right: 15px;
    }
    .custom-modal .custom-dialog {
      width: 90%;
    }
    .wallet-modal .wallet-head svg {
      width: 50px;
      height: 50px;
    }
    .wallet-form .notes p {
      margin-bottom: 0px;
    }
    #change-wallet span {
      padding-left: 53%;
    }

    .ts-custom-select {
      margin-top: 13px;
    }
  }
  
  @media only screen and (max-width: 320px) {
    .widget-modal-content {
      padding: 5px;
    }
    .wallet-form .custom-input {
      margin-bottom: 0px;
    }
    .modal-loader-content {
      height: 500px;
    }
    .wallet-form .upload-key-store {
      padding: 10px;
      margin-bottom: 10px;
    }
  }

  @media only screen and (max-height: 700px) {
    .wallet-modal .wallet-head svg {
      width: 70px;
      height: 70px;
    }
  }`;
}
