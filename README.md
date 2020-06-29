
# Inbloxme Token Swaps

Token Swaps SDK 

##  Get User Wallet

> Get wallet from Inblox Handlename

This method is used to get the user's wallet from Inblox handlename.

```const wallet = await getWallet({wallet,infuraKey, userHandlename});```

`wallet` - Wallet type (handlename)
`infuraKey` - Infura API key to initialize web3.
`userHandlename` - User's Inblox handlename.

> Get wallet from Private Key

This method is used to get the user's wallet from private key.

```const wallet = await getWallet({wallet,infuraKey, privateKey});```

`wallet` - Wallet type (privateKey)
`infuraKey` - Infura API key to initialize web3.
`privateKey` - User's  private key.

> Get wallet from Keystore file

This method is used to get the user's wallet from Keystore file.

```const wallet = await getWallet({wallet, keystoreJson, passphrase});```

`wallet` - Wallet type (keyStore)
`keystoreJson` - User's keystore json.
`passphrase` - Passphrase to unlock keystore file.

> Get wallet from Metamask

This method is used to get the user's wallet from Metamask.

```const wallet = await getWallet({wallet});```

`wallet` - Wallet type (metamask)



> Get wallet from Inblox Handlename

This method is used to get the user's wallet from Inblox handlename.

```const wallet = await getWallet({wallet,infuraKey, userHandlename});```

`wallet` - Wallet type (handlename)
`infuraKey` - Infura API key to initialize web3.
`userHandlename` - User's Inblox handlename.

> Get wallet from Private Key

This method is used to get the user's wallet from private key.

```const wallet = await getWallet({wallet,infuraKey, privateKey});```

`wallet` - Wallet type (privateKey)
`infuraKey` - Infura API key to initialize web3.
`privateKey` - User's  private key.

> Get wallet from Keystore file

This method is used to get the user's wallet from Keystore file.

```const wallet = await getWallet({wallet, keystoreJson, passphrase});```

`wallet` - Wallet type (keyStore)
`keystoreJson` - User's keystore json.
`passphrase` - Passphrase to unlock keystore file.

> Get wallet from Metamask

This method is used to get the user's wallet from Metamask.

```const wallet = await getWallet({wallet});```

`wallet` - Wallet type (metamask)


## Swap Tokens

This method is used to Swap tokens.

> Initialize constructor

const swap = new TokenSwap('WsProviderUrl');
 
> Swap Tokens

 await swap.swapTokens({ dstTokenAddress, srcTokenAddress, srcDecimal,
    maxAllowance, srcQty, userAddress, privateKey, wallet,
    authenticationToken,inbloxPassword});

`srcTokenAddress: ` Source token address
`dstTokenAddress: ` Destination token address
`srcDecimal`: Source token decimals
`maxAllowance`: Kyber maximum swap allowance
`srcQty:` Source token quantity
`userAddress:` Public address of user
`wallet:` Selected wallet type(metamask, handlename,keyStore, privateKey)
`privateKey:` User Private key(only required if wallet type is private key or keystore json)
`authenticationToken:` User bearer token(only required if wallet type is handlename)
`inbloxPassword:` User Inblox password(only required if wallet type is handlename)

# Get token list
This method is used to fetch details of all tokens supported by kyber.
 > getTokensList()

# Get token details
This method is used to fetch details of particular token.
 > getTokenDetails(tokenSymbol)
 
  `tokenSymbol:`Symbol of token whose details are needed
 
# Get source token Quantity 
This method is used to fetch quantity of source tokens.
 > getSrcQty(dstQty, srcDecimals, dstDecimals, rate)
 
 `dstQty:` Quantity of destination tokens
 `srcDecimals:` Source token decimals
 `dstDecimals:` Destination token decimals
 `rate:` slippage rate
 
 # Get destination token Quantity 
This method is used to fetch quantity of source tokens.
 > getDstQty(srcQty, srcDecimals, dstDecimals, rate)
 
 `srcQty:` Quantity of source tokens
 `srcDecimals:` Source token decimals
 `dstDecimals:` Destination token decimals
 `rate:` slippage rate
 
 # Get gas limit 
 This method is used to get gas limit from Kyber contract
>getGasLimit(srcTokenAddress, dstTokenAddress, amount)

`srcTokenAddress: ` Source token address
`dstTokenAddress: ` Destination token address
`amount`: Source token amount

 
 
