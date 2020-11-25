module.exports = {
  kyberProxyContractAddress: '0x818e6fecd516ecc3849daf6845e3ec868087b755',
  KYBER_CURRENCY_URL: process.env.KYBER_CURRENCY_URL || 'https://ropsten-api.kyber.network/currencies',
  KYBER_GET_GAS_LIMIT_URL: process.env.KYBER_GET_GAS_LIMIT_URL || 'https://ropsten-api.kyber.network/gas_limit',
  REF_ADDRESS: process.env.REF_ADDRESS || '0x0000000000000000000000000000000000000000',
  ETH_TOKEN_ADDRESS: process.env.ETH_TOKEN_ADDRESS || '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  MAX_ALLOWANCE: process.env.MAX_ALLOWANCE || '115792089237316195423570985008687907853269984665640564039457584007913129639935',
  ETHERSCAN_ROPSTEN_SERVICE_URL: process.env.ETHERSCAN_ROPSTEN_SERVICE_URL || 'https://api-ropsten.etherscan.io/api',
  ETHERSCAN_SERVICE_URL: process.env.ETHERSCAN_SERVICE_URL || 'https://api.etherscan.io/api',
  KYBER_SWAP_TOKEN_IMAGE_BASE_URL: 'https://files.kyberswap.com/DesignAssets/tokens/',
  ETHERSCAN_SECRET: process.env.ETHERSCAN_SECRET || 'C2VBJIH1PWRNFDA2ZT1P3W26NGESGCBUAN',
};
