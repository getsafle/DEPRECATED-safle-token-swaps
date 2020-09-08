export function WidgetCSS() {
  return `body {
    font-family: 'Poppins', sans-serif !important;
    font-weight: 300;
    margin: 0px;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0px;
    color: #2e2e2f;
    font-weight: 400;
  }
  
  p {
    margin: 0px;
  }
  input {
    outline: 0;
  }
  .blue-btn {
    background-image: linear-gradient(to right, #12bde2, #0669f8);
    text-align: center;
    color: #fff;
    padding: 10px 0px;
    display: block;
    width: 100%;
    border-radius: 90px;
    text-decoration: none !important;
    cursor: pointer;
    border: none;
    font-size: 16px;
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
    color: #fff;
    background-color: #0a367d;
  }
  .blue-btn:active {
    color: #fff;
    background-color: #0a367d;
  }
  .blue-btn:focus {
    color: #fff;
    background-color: #0a367d;
  }
  
  /* Widget Modal */
  .custom-modal {
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0px;
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
  .wallet-modal .wallet-head h4 .via{
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
    margin-top:50px;
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
    padding-bottom: 0px;
  }
  .wallet-form .custom-input {
    position: relative;
    margin-bottom: 20px;
  }
  .wallet-form.handle .custom-input input {
    text-align: left;
  }
  .wallet-form .custom-input input {
    width: 100%;
    text-align: right;
    padding: 14px 20px;
    background: #f4f4f4;
    border-radius: 20px;
    border: none;
    color: #6f6f6f;
    font-size: 16px;
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
    display: inline-block;
    color: #3974d4;
    text-decoration: underline;
    cursor: pointer;
  }
  .wallet-form .custom-input p {
    color: #a0a0a0;
    font-size: 12px;
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
  .custom-input .custom-drop {
    position: absolute;
    top: 43px;
    left: 30px;
  }
  .custom-input select {
    color: #2e2e2f;
    border: none;
    background-color: transparent;
    width: 60px;
  }
  .custom-input select:focus {
    outline: none !important;
  }
  .custom-drop span {
    border: 100%;
    width: 28px;
    height: 28px;
    display: inline-block;
    border-radius: 100%;
    text-align: center;
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
  }
  .wallet-form .arrow svg {
    cursor: pointer;
    width: 30px;
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
  }
  .wallet-form .notes label a {
    color: #1f4788;
    text-decoration: none;
    font-weight: 600;
  }
  .wallet-form .notes label a svg {
    width:60px;
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
    width: 100%;
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
    padding: 3px 9px;
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
    padding-bottom:0px;
  }
  #show-file-name {
    display: none;
  }
  #change-wallet span {
    padding-left: 70%;
    color: #1f4788;
    cursor: pointer;
  }
  #change-wallet span:hover {
    text-decoration: underline;
  }

  /* Chrome, Safari, Edge, Opera */
  .wallet-form .custom-input input::-webkit-outer-spin-button,
  .wallet-form .custom-input input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  /* Firefox */
  .wallet-form .custom-input input[type=number] {
    -moz-appearance: textfield;
  }

  /* Loader CSS */
  #loader {
    display: none;
  }
  .inblox-loader {
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
  }

  .progress-message {
    padding-top: 15px;
    font-weight: 600;
    color: #ffffff;
  }

  .bar {
    width: 10px;
    height: 2px;
    margin-right: 4px;
    display: inline-block;
    background-color: #1e4788;
  }

  .progress {
    width: 140px;
    height: 5px;
    display: block;
    background-color: #1e4788;
    position: relative;
    top: 10px;
    animation-name: Progress;
    animation-duration: 800ms;
    animation-timing-function: ease-in-out;
    animation-delay: 0s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-fill-mode: forwards;
  }

  @media only screen and (max-width: 767px) {
    .wallet-modal .wallet-head h4.mb{
      margin-top:20px;
    }
  
    .connect-modal .blue-btn {
      width:100%;
    }
    .custom-input .custom-drop{
      top: 36px;
      left:15px;
    }
    .wallet-form .custom-input input{
      padding: 10px;
      font-size: 14px;
    }
    .widget-modal-content{
      padding:15px;
    }
    .custom-modal .content{
      width:100%;
    }
  
    .rsps-icon{
      width:85px;
    }
    .wallet-modal .wallet-head h4{
      font-size:18px;
    }
    .rsps-text label{
      font-size: 12px;
      line-height: 18px;
    }
    .connetwallet-card-wrap .rsps-card{
      margin-right:15px;
    }
    .custom-modal .custom-dialog{
      width:90%;
    }
    .wallet-modal .wallet-head svg{
      width:50px;
      height:50px;
    }
    .wallet-form .notes p{
      margin-bottom: 0px;
    }
    #change-wallet span{
      padding-left: 53%;
    }
  }
  @media only screen and (max-width: 320px) {
    .widget-modal-content{
      padding:5px;
    }
    .wallet-form .custom-input{
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

  @keyframes Progress {
    0% {
      width: 0px;
    }
    100% {
      width: 170px;
    }
  }
  .bar1 {
    animation-name: Bar;
    animation-duration: 800ms;
    animation-timing-function: cubic- bezier(0.54, -0.01, 0.42, 0.99);
    animation-iteration-count: infinite;
    animation-direction: alternate-reverse;
    animation-fill-mode: both;
    animation-delay: 0.03s;
  }

  .bar2 {
    animation-name: Bar;
    animation-duration: 800ms;
    animation-timing-function: cubic- bezier(0.54, -0.01, 0.42, 0.99);
    animation-iteration-count: infinite;
    animation-direction: alternate-reverse;
    animation-fill-mode: both;
    animation-delay: 0.06s;
  }

  .bar3 {
    animation-name: Bar;
    animation-duration: 800ms;
    animation-timing-function: cubic- bezier(0.54, -0.01, 0.42, 0.99);
    animation-iteration-count: infinite;
    animation-direction: alternate-reverse;
    animation-fill-mode: both;
    animation-delay: 0.09s;
  }

  .bar4 {
    animation-name: Bar;
    animation-duration: 800ms;
    animation-timing-function: cubic- bezier(0.54, -0.01, 0.42, 0.99);
    animation-iteration-count: infinite;
    animation-direction: alternate-reverse;
    animation-fill-mode: both;
    animation-delay: 0.12s;
  }

  .bar5 {
    animation-name: Bar;
    animation-duration: 800ms;
    animation-timing-function: cubic- bezier(0.54, -0.01, 0.42, 0.99);
    animation-iteration-count: infinite;
    animation-direction: alternate-reverse;
    animation-fill-mode: both;
    animation-delay: 0.15s;
  }

  .bar6 {
    animation-name: Bar;
    animation-duration: 800ms;
    animation-timing-function: cubic- bezier(0.54, -0.01, 0.42, 0.99);
    animation-iteration-count: infinite;
    animation-direction: alternate-reverse;
    animation-fill-mode: both;
    animation-delay: 0.18s;
  }

  .bar7 {
    animation-name: Bar;
    animation-duration: 800ms;
    animation-timing-function: cubic- bezier(0.54, -0.01, 0.42, 0.99);
    animation-iteration-count: infinite;
    animation-direction: alternate-reverse;
    animation-fill-mode: both;
    animation-delay: 0.21s;
  }

  .bar8 {
    animation-name: Bar;
    animation-duration: 800ms;
    animation-timing-function: cubic- bezier(0.54, -0.01, 0.42, 0.99);
    animation-iteration-count: infinite;
    animation-direction: alternate-reverse;
    animation-fill-mode: both;
    animation-delay: 0.24s;
  }

  .bar9 {
    animation-name: Bar;
    animation-duration: 800ms;
    animation-timing-function: cubic- bezier(0.54, -0.01, 0.42, 0.99);
    animation-iteration-count: infinite;
    animation-direction: alternate-reverse;
    animation-fill-mode: both;
    animation-delay: 0.27s;
  }

  .bar10 {
    animation-name: Bar;
    animation-duration: 800ms;
    animation-timing-function: cubic- bezier(0.54, -0.01, 0.42, 0.99);
    animation-iteration-count: infinite;
    animation-direction: alternate-reverse;
    animation-fill-mode: both;
    animation-delay: 0.3s;
  }

  @keyframes Bar {
    0% {
      background-color: #1e4788;
      transform: scaleY(0.5);
    }
    100% {
      transform: scaleY(10);
    }
   
  }`;
  
}
