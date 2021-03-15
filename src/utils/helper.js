const axios = require('axios');
const { INVALID_ENV } = require('../constants/responses');

const {
  KYBER_CURRENCY_URL_MAINNET,
  KYBER_CURRENCY_URL_ROPSTEN,
  KYBER_GAS_LIMIT_URL_MAINNET,
  KYBER_GAS_LIMIT_URL_ROPSTEN,
  ETHERSCAN_TRANSACTION_URL_MAINNET,
  ETHERSCAN_TRANSACTION_URL_ROPSTEN,
  ETHERSCAN_SERVICE_URL_MAINNET,
  ETHERSCAN_SERVICE_URL_ROPSTEN,
} = require('../config');

async function getRequest({ url, params }) {
  try {
    const response = await axios({
      url,
      params,
      method: 'GET',
    });

    return response;
  } catch (error) {
    return { error };
  }
}

async function getBaseURL(network) {
  if (network === 'main') {
    return {
      KYBER_CURRENCY_URL: KYBER_CURRENCY_URL_MAINNET,
      KYBER_GAS_LIMIT_URL: KYBER_GAS_LIMIT_URL_MAINNET,
      ETHERSCAN_TRANSACTION_URL: ETHERSCAN_TRANSACTION_URL_MAINNET,
      ETHERSCAN_SERVICE_URL: ETHERSCAN_SERVICE_URL_MAINNET,
    };
  } if (network === 'ropsten') {
    return {
      KYBER_CURRENCY_URL: KYBER_CURRENCY_URL_ROPSTEN,
      KYBER_GAS_LIMIT_URL: KYBER_GAS_LIMIT_URL_ROPSTEN,
      ETHERSCAN_TRANSACTION_URL: ETHERSCAN_TRANSACTION_URL_ROPSTEN,
      ETHERSCAN_SERVICE_URL: ETHERSCAN_SERVICE_URL_ROPSTEN,
    };
  }

  return { error: INVALID_ENV };
}

module.exports = {
  getRequest, getBaseURL,
};
