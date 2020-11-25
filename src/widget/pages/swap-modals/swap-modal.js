const ethers = require('ethers');

import { getTokensList, getDstQty } from '../../..';

import { Loader } from '../loaders/loader';
import { CloseIcon } from '../../assets/images/close-icon';
import { SwapsIcon } from '../../assets/images/swaps-icon';
import { PoweredByKyber } from '../../assets/images/powered-by-kyber';
import { UpDownArrowIcon } from '../../assets/images/up-down-arrow-icon';
import { WalletIcon } from '../../assets/images/wallet-icon';

import { showModalLoader, hideModalLoader } from '../../utils';

import {
  INSUFFICIENT_FUNDS,
  TOKEN_UNDER_MAINTENANCE,
  CANT_SWAP_SAME_TOKEN
} from '../../../constants/responses';

import { KYBER_SWAP_TOKEN_IMAGE_BASE_URL } from '../../../config';

let allTokens = [];
let destinationQuantity;
let sourceQuantity;
let destinationSymbol;
let sourceSymbol;
let destinationAmount;
let sourceAmount;
let walletBalance;
let slippagePercentage;

export async function SwapModal(widgetInstance) {
  destinationQuantity = '';
  sourceQuantity = '';
  let sourceTokenListOptions = '';
  let destinationTokenListOptions = '';

  showModalLoader();
  // Functional called when modal is loaded.
  await getTokensList().then(async (res) => {
    if (res.response) {
      allTokens = res.response;
      await updateSwapConfiguration(widgetInstance, allTokens[0].address);

      allTokens.map((tokenDetail, index) => {
        sourceTokenListOptions += `<option value="${tokenDetail.symbol}" ${
          index === 0 ? 'selected' : ''
        }>${tokenDetail.symbol}</option>`;
        destinationTokenListOptions += `<option value="${tokenDetail.symbol}" ${
          index === 1 ? 'selected' : ''
        }>${tokenDetail.symbol}</option>`;
      });
    }
  });

  await hideModalLoader();

  return `<div class="custom-modal"  id="swap-modal">
  <div class="custom-dialog">
    ${Loader}
    <div class="content">
      <div class="common-modal-body">
        <div class="wallet-modal">
          <div class="widget-modal-content">
            <div class="wallet-head">
              <div class="image">
                ${SwapsIcon}
                <h4>Wallet</h4>
              </div>
            </div>
            <div style="text-align: right;">
              <span id="change-wallet">Change Wallet</span>
            </div>
            <div class="wallet-form custom-form">
              <div class="custom-input">
                <label>From</label>
                <input type="number" id="source-quantity" autocomplete="off" value="${sourceQuantity}" placeholder="0" >
                <div class="custom-drop ts-custom-select">
                  <span class="align-bottom">
                    <img src="${KYBER_SWAP_TOKEN_IMAGE_BASE_URL}/${sourceSymbol.toLowerCase()}.svg" alt="token-symbol" class="token-symbol-image" id="source-token-symbol-image">
                  </span>
                  <select id="source-token">
                    ${sourceTokenListOptions}
                  </select>
                </div>
                <p> ${WalletIcon} Wallet Bal : <span id="wallet-balance">${walletBalance}</span></p>
              </div>
              <div style="text-align: center;">
                <div class="arrow" id="toggle-swap">
                  ${UpDownArrowIcon}
                </div>
              </div>
              <div class="custom-input">
                <label>To</label>
                <input type="number" id="destination-quantity" autocomplete="off" value="${destinationQuantity}" placeholder="0">
                <div class="custom-drop ts-custom-select">
                  <span class="green align-bottom">
                  <img src="${KYBER_SWAP_TOKEN_IMAGE_BASE_URL}/${destinationSymbol.toLowerCase()}.svg" alt="token-symbol" class="token-symbol-image" id="destination-token-symbol-image">
                  </span>
                  <select id="destination-token">
                    ${destinationTokenListOptions}
                  </select>
                </div>
                <p> <span id='conversation-ratio'>${sourceAmount} ${sourceSymbol} = ${destinationAmount} ${destinationSymbol}</span>
                  <label style="display: ${
                    slippagePercentage > 1 ? 'inline' : 'none'
                  };" id="slippage-percentage">${slippagePercentage}%</label></p>
              </div>
              <div class="custom-input">
                <label id="error-message"></label>
              </div>
              <div class="button-section">
                <button id="swap-now-button" class="blue-btn" disabled>Swap Now</button>
              </div>
              <div class="notes">
                <p>By Transfering, you agree to the <a href="https://inblox.me/tncH" target="_blank">Terms and Conditions</a></p>
                <label>${PoweredByKyber}</label>
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

const tokenPairUnderMaintenance = () => {
  const errorMessage = document.getElementById('error-message');
  if (errorMessage) {
    errorMessage.innerHTML = TOKEN_UNDER_MAINTENANCE;
    errorMessage.style.display = 'block';
    document.getElementById('swap-now-button').disabled = true;
  }
};

const getSelectedTokens = () => {
  let selectedSourceToken;
  let selectedDestinationToken;

  const sourceToken = document.getElementById('source-token');
  const destinationToken = document.getElementById('destination-token');

  if (sourceToken != null && destinationToken != null) {
    const sourceTokenSymbol = sourceToken.value;
    const destinationTokenSymbol = destinationToken.value;

    allTokens.map((tokenDetail) => {
      if (tokenDetail.symbol === sourceTokenSymbol) {
        selectedSourceToken = tokenDetail;
      }

      if (tokenDetail.symbol === destinationTokenSymbol) {
        selectedDestinationToken = tokenDetail;
      }
    });

    return {
      sourceToken: selectedSourceToken,
      destinationToken: selectedDestinationToken
    };
  } else {
    return {};
  }
};

const getSourceSwapRates = async (widgetInstance) => {
  let swapRates = {};
  let destinationQuantityInWei;

  const selectedTokens = getSelectedTokens();
  destinationQuantity = document.getElementById('destination-quantity').value;

  await widgetInstance.tokenSwap
    .convertEthToWei(destinationQuantity)
    .then((res) => {
      destinationQuantityInWei = res;
    });

  await widgetInstance.tokenSwap
    .getRates(
      selectedTokens.destinationToken.address,
      selectedTokens.sourceToken.address,
      destinationQuantityInWei
    )
    .then((res) => {
      swapRates = res;
    });

  return swapRates;
};

const getDestinationSwapRates = async (widgetInstance) => {
  let swapRates = {};
  let sourceQuantityInWei;

  const selectedTokens = getSelectedTokens();
  sourceQuantity = document.getElementById('source-quantity').value;

  await widgetInstance.tokenSwap.convertEthToWei(sourceQuantity).then((res) => {
    sourceQuantityInWei = res;
  });

  await widgetInstance.tokenSwap
    .getRates(
      selectedTokens.sourceToken.address,
      selectedTokens.destinationToken.address,
      sourceQuantityInWei
    )
    .then((res) => {
      swapRates = res;
    });

  return swapRates;
};

const validSourceAndDestinationToken = () => {
  const errorMessage = document.getElementById('error-message');
  sourceSymbol = document.getElementById('source-token').value;
  destinationSymbol = document.getElementById('destination-token').value;

  sourceQuantity = document.getElementById('source-quantity').value;
  destinationQuantity = document.getElementById('destination-quantity').value;

  if (sourceSymbol == destinationSymbol) {
    errorMessage.innerHTML = CANT_SWAP_SAME_TOKEN;
    errorMessage.style.display = 'block';
    document.getElementById('swap-now-button').disabled = true;
    return false;
  } else if (sourceQuantity == 0 && destinationQuantity == 0) {
    document.getElementById('swap-now-button').disabled = true;
    return false;
  } else {
    document.getElementById('swap-now-button').disabled = false;
    errorMessage.style.display = 'none';
    return true;
  }
};

const updateConversationRatio = async (widgetInstance) => {
  const selectedTokens = getSelectedTokens();
  let sourceToken;
  let destinationToken;

  if (Object.keys(selectedTokens).length) {
    sourceToken = selectedTokens.sourceToken;
    destinationToken = selectedTokens.destinationToken;
  } else {
    sourceToken = allTokens[0];
    destinationToken = allTokens[1];
  }

  let srcTokenAddress = sourceToken.address;
  let srcDecimal = sourceToken.decimals.toString();
  let dstTokenAddress = destinationToken.address;
  let dstDecimal = destinationToken.decimals.toString();

  const conversationRatioElement = document.getElementById(
    'conversation-ratio'
  );

  if (srcTokenAddress == dstTokenAddress) {
    conversationRatioElement.style.display = 'none';
  } else {
    await widgetInstance.tokenSwap
      .getExchangeRates(
        srcTokenAddress,
        dstTokenAddress,
        srcDecimal,
        dstDecimal
      )
      .then((desAmount) => {
        destinationSymbol = destinationToken.symbol;
        sourceSymbol = sourceToken.symbol;
        destinationAmount = desAmount.toFixed(2);
        sourceAmount = 1;

        if (conversationRatioElement) {
          if (destinationAmount > 0) {
            document.getElementById('error-message').style.display = 'none';
            conversationRatioElement.style.display = 'inline';
            conversationRatioElement.innerHTML = `${sourceAmount} ${sourceSymbol} = ${destinationAmount} ${destinationSymbol}`;
          } else {
            conversationRatioElement.style.display = 'none';
            tokenPairUnderMaintenance();
          }
        }
      });
  }
};

const updateBalance = async (widgetInstance, tokenAddress = null) => {
  const walletBalanceSpan = document.getElementById('wallet-balance');
  let sourceTokenAddress;
  if (tokenAddress === null) {
    const selectedTokens = getSelectedTokens();
    sourceTokenAddress = selectedTokens.sourceToken.address;
  } else {
    sourceTokenAddress = tokenAddress;
  }

  await widgetInstance.tokenSwap
    .getTokenBalance(sourceTokenAddress, widgetInstance.userAddress)
    .then((res) => {
      const balance = parseFloat(res.balance);
      walletBalance = isNaN(balance) ? 0 : balance;
      if (walletBalanceSpan) {
        walletBalanceSpan.innerHTML = walletBalance;
      }
    });
};

const updateSourceAndDestinationImage = () => {
  const sourceSymbolElement = document.getElementById('source-token');
  const sourceTokenImageElement = document.getElementById(
    'source-token-symbol-image'
  );
  const destinationSymbolElement = document.getElementById('destination-token');
  const destinationTokenImageElement = document.getElementById(
    'destination-token-symbol-image'
  );

  if (sourceSymbolElement) {
    sourceSymbol = sourceSymbolElement.value;
  }

  if (destinationSymbolElement) {
    destinationSymbol = destinationSymbolElement.value;
  }

  if (sourceTokenImageElement != null && destinationTokenImageElement != null) {
    sourceTokenImageElement.src = `${KYBER_SWAP_TOKEN_IMAGE_BASE_URL}/${sourceSymbol.toLowerCase()}.svg`;
    destinationTokenImageElement.src = `${KYBER_SWAP_TOKEN_IMAGE_BASE_URL}/${destinationSymbol.toLowerCase()}.svg`;
  }
};

export const changeWallet = (widgetInstance) => {
  widgetInstance.swapVia = '';
  widgetInstance.userAddress = '';
  widgetInstance.userLoggedIn = false;

  if (localStorage.getItem('address')) {
    localStorage.removeItem('address');
  }
  if (localStorage.getItem('swapvia')) {
    localStorage.removeItem('swapvia');
  }
};

export const updateSwapConfiguration = async (
  widgetInstance,
  tokenAddress = null
) => {
  await updateBalance(widgetInstance, tokenAddress);
  await updateConversationRatio(widgetInstance);
  await updateSlippagePercentage(widgetInstance);
  await updateSourceAndDestinationImage();
};

export const updateSlippagePercentage = async (widgetInstance) => {
  const selectedTokens = getSelectedTokens();

  const slippageElement = document.getElementById('slippage-percentage');
  const sourceQuanity = document.getElementById('source-quantity');
  const destinationQuantity = document.getElementById('destination-quantity');

  let sourceToken;
  let destinationToken;
  let srcQty;

  if (Object.keys(selectedTokens).length) {
    sourceToken = selectedTokens.sourceToken;
    destinationToken = selectedTokens.destinationToken;
  } else {
    sourceToken = allTokens[0];
    destinationToken = allTokens[1];
  }

  if (sourceQuanity != null && sourceQuanity.value != '') {
    srcQty = sourceQuanity.value.toString();
  } else {
    srcQty = '1';
  }

  if (sourceToken.address == destinationToken.address) {
    slippageElement.style.display = 'none';
  } else {
    await widgetInstance.tokenSwap
      .getSlippage(sourceToken.address, destinationToken.address, srcQty)
      .then((slpPercentage) => {
        slippagePercentage = slpPercentage;
        if (slippageElement != null) {
          if (
            slpPercentage > 0 &&
            sourceQuanity.value > 0 &&
            destinationQuantity.value > 0
          ) {
            slippageElement.innerHTML = slpPercentage.toFixed(2);
            slippageElement.style.display = 'inline';
          } else {
            slippageElement.style.display = 'none';
          }
        }
      });
  }
};

export const toggleSourceAndDestinationTokens = async (widgetInstance) => {
  let tempQuantity = '';
  let tempToken = '';

  let sourceQuantityElement = document.getElementById('source-quantity');
  let destinationQuantityElement = document.getElementById(
    'destination-quantity'
  );

  let sourceTokenElement = document.getElementById('source-token');
  let destinationTokenElement = document.getElementById('destination-token');

  // Swap Quantity
  tempQuantity = sourceQuantityElement.value;
  sourceQuantityElement.value = destinationQuantityElement.value;
  destinationQuantityElement.value = tempQuantity;

  // Swap Token
  tempToken = sourceTokenElement.value;
  sourceTokenElement.value = destinationTokenElement.value;
  destinationTokenElement.value = tempToken;

  await updateSwapConfiguration(widgetInstance);
};

export const getDestinationQuantity = async (widgetInstance) => {
  const swapNowButton = document.getElementById('swap-now-button');

  if (validSourceAndDestinationToken()) {
    const errorMessage = document.getElementById('error-message');
    sourceQuantity = document.getElementById('source-quantity').value;

    if (sourceQuantity != '' && sourceQuantity != 0) {
      if (sourceQuantity > walletBalance) {
        errorMessage.innerHTML = INSUFFICIENT_FUNDS;
        errorMessage.style.display = 'block';
        swapNowButton.disabled = true;
      } else {
        const selectedTokens = getSelectedTokens();
        const swapRates = await getDestinationSwapRates(widgetInstance);

        await getDstQty(
          parseFloat(sourceQuantity),
          selectedTokens.sourceToken.decimals,
          selectedTokens.destinationToken.decimals,
          swapRates.expectedRate
        ).then((res) => {
          destinationQuantity = res;
          document.getElementById(
            'destination-quantity'
          ).value = destinationQuantity;

          if (destinationQuantity > 0) {
            swapNowButton.disabled = false;
            errorMessage.style.display = 'none';
          } else {
            document.getElementById('source-quantity').value = 0;
            tokenPairUnderMaintenance();
          }
        });
      }
    } else {
      swapNowButton.disabled = true;
      document.getElementById('destination-quantity').value = 0;
    }
  } else {
    swapNowButton.disabled = true;
  }
};

export const getSourceQuantity = async (widgetInstance) => {
  const swapNowButton = document.getElementById('swap-now-button');

  if (validSourceAndDestinationToken()) {
    const errorMessage = document.getElementById('error-message');
    destinationQuantity = document.getElementById('destination-quantity').value;

    if (destinationQuantity != '' && destinationQuantity != 0) {
      const selectedTokens = getSelectedTokens();
      const swapRates = await getSourceSwapRates(widgetInstance);

      const srcQuantity = await getDstQty(
        parseFloat(destinationQuantity),
        selectedTokens.destinationToken.decimals,
        selectedTokens.sourceToken.decimals,
        swapRates.expectedRate
      );

      sourceQuantity = srcQuantity;
      document.getElementById('source-quantity').value = sourceQuantity;

      if (isFinite(srcQuantity) && srcQuantity > 0) {
        swapNowButton.disabled = false;
        errorMessage.style.display = 'none';
      } else {
        document.getElementById('destination-quantity').value = 0;
        tokenPairUnderMaintenance();
      }
    } else {
      swapNowButton.disabled = true;
      document.getElementById('source-quantity').value = 0;
    }
  } else {
    swapNowButton.disabled = true;
  }
};

export const updateTokenSwapsValue = (widgetInstance) => {
  const errorMessage = document.getElementById('error-message');
  const selectedTokens = getSelectedTokens();
  sourceQuantity = parseFloat(document.getElementById('source-quantity').value);
  destinationQuantity = parseFloat(
    document.getElementById('destination-quantity').value
  );

  if (sourceQuantity > walletBalance) {
    errorMessage.innerHTML = INSUFFICIENT_FUNDS;
    errorMessage.style.display = 'block';
    return { status: false, message: INSUFFICIENT_FUNDS };
  } else {
    errorMessage.style.display = 'none';
  }

  widgetInstance.swapValues = {
    srcTokenAddress: selectedTokens.sourceToken.address,
    dstTokenAddress: selectedTokens.destinationToken.address,
    srcDecimal: selectedTokens.sourceToken.decimals,
    srcQty: parseFloat(sourceQuantity.toFixed(2)),
    dstQty: parseFloat(destinationQuantity.toFixed(2)), // For success screen properties.
    srcSymbol: selectedTokens.sourceToken.symbol, // For success screen properties.
    dstSymbol: selectedTokens.destinationToken.symbol // For success screen properties.
  };

  return { status: true };
};
