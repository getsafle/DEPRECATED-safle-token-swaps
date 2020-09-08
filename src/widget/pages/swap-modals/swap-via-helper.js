function swapResponseHandler(widgetInstance, response) {
  const errorMessage = document.getElementById('error-message');

  widgetInstance.response = response;
  if (response && response.transactionHash) {
    widgetInstance.transactionHash = response.transactionHash;
  }

  if (response && response.status) {
    errorMessage.style.display = 'none';
    return { status: true, message: 'Swap successful' };
  } else {
    errorMessage.innerHTML = `The transaction has been reverted by EVM. For more info check it out
    <a href="https://ropsten.etherscan.io/tx/${widgetInstance.transactionHash}" target="_blank">here</a>
    `;
    errorMessage.style.display = 'block';
    return {
      status: false,
      message: `The transaction has been reverted by EVM. For more info check it out
      <a href="https://ropsten.etherscan.io/tx/${widgetInstance.transactionHash}" target="_blank">here</a>
      `
    };
  }
}

export const swapTokenUsingInbloxHandleName = async (widgetInstance) => {
  const swapValues = widgetInstance.swapValues;
  const userAddress = widgetInstance.userAddress;
  const handleName = widgetInstance.handleName;
  const swapVia = widgetInstance.swapVia;

  const swapCredentials = {
    srcTokenAddress: swapValues.srcTokenAddress,
    dstTokenAddress: swapValues.dstTokenAddress,
    srcDecimal: swapValues.srcDecimal,
    srcQty: swapValues.srcQty,
    userAddress: userAddress,
    userName: handleName,
    wallet: swapVia
  };

  return await widgetInstance.tokenSwap
    .swapTokens(swapCredentials)
    .then((rawTransaction) => rawTransaction);
};

export const swapTokenUsingPrivateKey = async (widgetInstance) => {
  const swapValues = widgetInstance.swapValues;
  const userAddress = widgetInstance.userAddress;
  const privateKey = widgetInstance.privateKey;
  const swapVia = widgetInstance.swapVia;

  const swapCredentials = {
    srcTokenAddress: swapValues.srcTokenAddress,
    dstTokenAddress: swapValues.dstTokenAddress,
    srcDecimal: swapValues.srcDecimal,
    srcQty: swapValues.srcQty,
    userAddress: userAddress,
    wallet: swapVia,
    privateKey: privateKey
  };

  return await widgetInstance.tokenSwap
    .swapTokens(swapCredentials)
    .then((res) => swapResponseHandler(widgetInstance, res));
};

export const swapTokenUsingMetaMask = async (widgetInstance) => {
  const swapValues = widgetInstance.swapValues;
  const userAddress = widgetInstance.userAddress;
  const swapVia = widgetInstance.swapVia;

  const swapCredentials = {
    srcTokenAddress: swapValues.srcTokenAddress,
    dstTokenAddress: swapValues.dstTokenAddress,
    srcDecimal: swapValues.srcDecimal,
    srcQty: swapValues.srcQty,
    userAddress: userAddress,
    wallet: swapVia
  };

  return await widgetInstance.tokenSwap
    .swapTokens(swapCredentials)
    .then((_) => ({
      status: true,
      message: 'Chheck with MetaMask connected'
    }));
};
