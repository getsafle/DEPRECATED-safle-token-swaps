module.exports = {
  kyberProxyContractAddress: '0x818e6fecd516ecc3849daf6845e3ec868087b755',
  KYBER_CURRENCY_URL: process.env.KYBER_CURRENCY_URL || 'https://ropsten-api.kyber.network/currencies',
  KYBER_GET_GAS_LIMIT_URL: process.env.KYBER_GET_GAS_LIMIT_URL || 'https://ropsten-api.kyber.network/gas_limit',
  REF_ADDRESS: process.env.REF_ADDRESS || '0x0000000000000000000000000000000000000000',
  ETH_TOKEN_ADDRESS: process.env.ETH_TOKEN_ADDRESS || '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  INFURA_KEY: process.env.INFURA_KEY || '5771ac7556054b998e809aeadb16a31c',
  ENV: process.env.ENV || 'dev',
};
