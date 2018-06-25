# Service Ethereum ERC20
MESG Service to interact with an Ethereum ERC20 token using [Infura's](https://infura.io/) websocket.

# Installation

This is a generic service to interact with any ERC20 compliant token using [MESG Core](https://github.com/mesg-foundation/core).

You need to download this repository and update the file `config.json`.

## Download

```
git clone https://github.com/mesg-foundation/service-ethereum-erc20 ./
```

## Update `config.json`
```js
{
  "erc20Address": "0xf230b790e05390fc8295f4d3f60332c93bed42e2", // Replace with the address of the ERC20 contract of you choice
  "erc20Decimal": 6, // Number of decimal of the ERC20
  "infuraEndpoint": "wss://mainnet.infura.io/_ws" // Infura websocket endpoint. If you have any problem, try "wss://mainnet.infura.io/ws"
}
```
By default, `config.json` contains the data of the [TRON ERC20 contract](https://etherscan.io/token/0xf230b790e05390fc8295f4d3f60332c93bed42e2).

## Test it
```
mesg-core service test
```

## Deploy and start the service
```
mesg-core service deploy
mesg-core service start
```

# Definitions

# Events

## Transfer

Event key: `transfer`

The transfer event of the ERC20. This event happens when a transfer occurred.

| key | type | description |
| --- | --- | --- |
| blockNumber | Number | Block number the associated transaction |
| transactionHash | String | Hash of the transaction |
| from | String | Address of the spender |
| to | String | Address of the receiver  |
| value | Number | Value of the transfer |

## Approval

Event key: `approval`

The approval event of the ERC20. This event happens when a approval occurred.

| key | type | description |
| --- | --- | --- |
| blockNumber | Number | Block number the associated transaction |
| transactionHash | String | Hash of the transaction |
| owner | String | Address of the owner |
| spender | String | Address of the spender  |
| value | Number | Value of the approval |


# Tasks

## Total supply

Task key: `totalSupply`

Get the total supply of this ERC20

### No input

### Outputs

#### Success

Output key: `success`

Output when the task executes with success.

| key | type | description |
| --- | --- | --- |
| totalSupply | Number | The total supply of this ERC20 |

#### Error

Output key: `error`

Output when an error occurs.

| key | type | description |
| --- | --- | --- |
| message | String | The error's message |


## Balance Of

Task key: `balanceOf`

Get the balance of a given address.

### inputs

| key | type | description |
| --- | --- | --- |
| address | String | The address to get the balance from |

### outputs

#### Success

Output key: `success`

Output when the task executes with success.

| key | type | description |
| --- | --- | --- |
| balance | Number | The balance of the inputted address |

#### Error

Output key: `error`

Output when an error occurs.

| key | type | description |
| --- | --- | --- |
| message | String | The error's message |


## Allowance

Task key: `allowance`

Get the allowance between an owner and a spender.

### inputs

| key | type | description |
| --- | --- | --- |
| owner | String | The address to get the owner |
| spender | String | The address to get the spender |

### outputs

#### Success

Output key: `success`

Output when the task executes with success.

| key | type | description |
| --- | --- | --- |
| remaining | Number | The remaining balance of the allowance |

#### Error

Output key: `error`

Output when an error occurs.

| key | type | description |
| --- | --- | --- |
| message | String | The error's message |
