
  

# **Inblox Token Swaps - Inbloxme**

This package enables usage of inblox token swap widget.

  

> Disclaimer - This is WIP, and release in beta.

  

## **Token Swaps**

  

How many times it has occurred that you need to make a transaction and you hold a different asset? A lot. We built integrated swaps to enable token swaps directly while making a transaction.

  

When in crypto be like water, we always need high liquidity of multiple assets while using blockchain applications but most of the times all our portfolio is not in the asset which we need. Integrated token swaps allows the user to transact in whatever crypto they want without having immediate liquidity by completely trustless atomic swaps.

  

## **Installation and Usage**

  

  

> Installation

  

  

Install the package by running the command,

  

  

`npm install @inbloxme/inblox-token-swaps`

  

  

Import the package into your project using,

  

  

`const inbloxTokenSwaps = require('@inbloxme/inblox-token-swaps');`

  

## **Token Swaps**

> Initializing

  

Initialise the constructor using your custom RPC URL.

  

`const tokenSwapWidget = new inbloxTokenSwaps.Widget({ rpcURL, env });`

  

Parameters,

  

*  `rpcURL` - Web3 RPC provider URL.

  

*  `env` - API environments (eg. dev, test).

  

--------------------------

  

## Widget Integration

  

> Initializing

  

`const tokenSwapWidget = new inbloxTokenSwaps.Widget({ rpcURL, env });`

  

Parameters,

  

*  `rpcURL` - Web3 RPC provider URL.

  

*  `env` - API environments (eg. dev, test).

  

--------------------------

> Event listeners - Initialization

* Listen for the **successful widget initialization** event using the event listener
`tokenSwapWidget.on(tokenSwapWidget.EVENTS.TOKEN_SWAP_WIDGET_INITIALISED, (data) => {
console.log(data);});`

  

* Listen for the **widget close** event using the event listener
`tokenSwapWidget.on(tokenSwapWidget.EVENTS.TOKEN_SWAP_WIDGET_CLOSED, (data) => {
console.log(data);});`

  

--------------------------

  

> Event listeners - Token swap transactions

  

* Listen for the **transaction success** event using the event listener
`tokenSwapWidget.on(tokenSwapWidget.EVENTS.TOKEN_SWAP_TRANSACTION_SUCCESSFUL, (data) => {
console.log(data);});`

  

* Listen for the **transaction failure** event using the event listener
`tokenSwapWidget.on(tokenSwapWidget.EVENTS.TOKEN_SWAP_TRANSACTION_FAILED, (data) => {
console.log(data);});`

  

--------------------------

  

> Listen for the all the events

`tokenSwapWidget.on(tokenSwapWidget.EVENTS.ALL_EVENTS, (data) => {
console.log(data);});`

  

--------------------------

## **WIP**

Want to contribute, we would ❤️ that!

We are a Global 🌏🌍🌎 team! 💪

Write to [dev@inblox.me](mailto:dev@inblox.me), or follow us on twitter, [https://twitter.com/inblox_me](https://twitter.com/inblox_me)