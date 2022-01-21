### 1.0.0 (2020-06-29)

##### Features updated

* Fixed Linting issues.
* Fixed transaction hash return method.

### 1.0.1 (2020-07-23)

##### Features updated

* Updated class and method export

### 1.0.2 (2020-07-28)

##### Features updated

* Fixed value of max allowance.

### 1.0.3 (2020-08-05)

##### Features updated

* Implemented a check for insufficient funds in user's wallet

### 1.0.4 (2020-08-05)

##### Features updated

* Added method to get token balance

### 1.0.5 (2020-08-05)

##### Features updated

* Added method to convert eth to wei

### 1.0.6 (2020-08-05)

##### Features updated

* Added method to calcualte slippage percentage

### 1.0.7 (2020-08-05)

##### Features updated

* Added method to get exchange rate

### 1.0.8 (2020-08-05)

##### Features updated

* Updated get wallet balance to return ethereum balance in wei

### 1.0.9 (2020-08-05)

##### Features updated

* Updated method to sign via inblox

### 1.0.10 (2020-08-05)

##### Features updated

* Removed method to get inblox wallet

### 1.0.11 (2020-08-05)

##### Features updated

* Updated method to get wallet using keystore sjson and passphrase

### 1.0.12 (2020-09-09)

##### Features updated

* Token Swap widget added

### 1.0.13, 1.0.14 (2020-09-09)

##### Features updated

* Punctuation updated.


### 1.0.15, 1.0.16 (2020-09-09)

##### Features updated

* Keyless package version updated.


### 1.0.17 (2020-19-09)

##### Features updated

* Token selector dropdown width updated.
* Wallet selection mechanism updated
* Removed setUserToken and getUserToken methods

### 1.0.18 (2020-19-09)

##### Features updated

* getRequest method in helper updated to accept parameters.

### 1.0.19 (2020-19-09)

##### Package updated

* keyless-transactions package updated to version 1.1.8.


### 1.0.20 (2020-19-09)

##### Features updated

* Token selector dropdown design updated

### 1.1.0 (2020-02-12)

##### Features updated

*SDK initialisation will take place from a HTTP provider
*Gas price calculation will be done through web3 method
*Get wallet from private key method updated
*Hardcoded url and error messages removed and set in constants
*Keyless method intialisation updated
*Back button added in Wallet selection modal
*Added images to token selection dropdown
*Bar loader updated to inblox.me logo loader
*Removed redundant event listeners
*Updated content on wallet selection screens
*Updated keyless package version



### 1.1.1 (2020-03-12)

##### Keyless Package Update

*Keyless package update to version 1.3.1


### 1.2.0 (2021-02-09)

##### Features Updated

*Keyless package update to version 1.3.4
*Added separate base URL's for ropsten and mainnet
*Etherscan secret removed from config and set in constructor
*Implemented automated network selection based on rpc url provided by developer



### 1.3.0 (2021-03-17)

##### Rebranding from Inblox to Safle.

*Updated all the instances of Inblox to Safle.
*Updated the widget logo and color schemes as per the new brand guidelines.

### 1.3.1 (2021-03-17)

##### Keyless package version updated.

*Keyless transactions package updated to version 1.3.7.

### 1.0.1 (2021-03-17)

##### Keyless package version updated.

*Keyless transactions package updated to version 1.0.0.

### 1.0.2 (2021-03-17)

##### Features updated

*Keyless transactions package updated to version 1.0.1.
*Footer alignment updated.

### 1.0.3 (2021-03-17)

##### Features updated

*@getsafle/keyless-transactions package initialized inside widget
*Token selector dropdown issue fixed.

### 1.0.4 (2021-03-28)

##### Bugs Fixed

*Fixed bug with gas calculation when source token is eth

### 1.0.5 (2021-03-29)

##### Bugs Fixed

*When source or destination token is changed, reset the quantities to zero.
*Check for gas price when source quantity is changed.
*Separate error messages for insufficient funds when source quantity is higher than wallet balance and when token balance is sufficient but balance for gas is not available.

### 1.0.6 (2021-03-30)

##### Feature added

* Gas fee required for calculation displayed on swap modal

### 1.0.7 (2021-04-15)

##### Documentation Updated

### 1.0.8 (2021-06-30)

##### Feature Added

* Add bundle file for token swaps package

### 2.0.0 

##### Updates

* Added method to get list of supported DEX's
* Added method to change DEX's
* Added method to get list of supported tokens
* Added method to get exchange rates
* Added method to get slippage