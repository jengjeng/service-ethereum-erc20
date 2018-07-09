<p align="center">
  <img src="https://cdn.rawgit.com/mesg-foundation/service-ethereum-erc20/484d040a/logo.svg" alt="MESG Service Ethereum ERC20" height="120">
  <br/><br/>
</p>

[Website](https://mesg.com/) - [Docs](https://docs.mesg.com/) - [Chat](https://discordapp.com/invite/SaZ5HcE) - [Blog](https://medium.com/mesg)

MESG Service to interact with an Ethereum ERC20 token using [Infura's](https://infura.io/) websocket.

This is a generic service to interact with any ERC20 compliant token using [MESG Core](https://github.com/mesg-foundation/core).

# Installation

## Default installation

This service is configurated by default for [TRON ERC20 tokens](https://etherscan.io/token/0xf230b790e05390fc8295f4d3f60332c93bed42e2). To use another token, please follow the [custom installation guide](#custom-install).

```
mesg-core service deploy https://github.com/mesg-foundation/service-ethereum-erc20
```

## Custom install

You need to download this repository and update the file `config.json` to set the ERC20 config you need.

### Download

```
git clone https://github.com/mesg-foundation/service-ethereum-erc20 ./
```

### Update `config.json`

```js
{
  "erc20Address": "0xf230b790e05390fc8295f4d3f60332c93bed42e2", // Replace with the address of the ERC20 contract of your choice
  "erc20Decimal": 6, // Number of decimal of the ERC20
  "blockConfirmations": 4, // Number of block confirmation
  "infuraEndpoint": "https://mainnet.infura.io/",
}
```

### Test it

```
mesg-core service test
```

### Deploy the service

```
mesg-core service deploy
```

# Definitions

# Events

## Transfer

Event key: `transfer`

The transfer event of the ERC20. This event happens when a transfer occurs.

| Name | Key | Type | Description |
| --- | --- | --- | --- |
| **Block number** | `blockNumber` | `Number` | Block number the associated transaction |
| **Transaction hash** | `transactionHash` | `String` | Hash of the transaction |
| **From** | `from` | `String` | Address of the spender |
| **To** | `to` | `String` | Address of the receiver  |
| **Value** | `value` | `Number` | Value of the transfer |

## Approval

Event key: `approval`

The approval event of the ERC20. This event happens when an approval occurs.

| Name | Key | Type | Description |
| --- | --- | --- | --- |
| **Block number** | `blockNumber` | `Number` | Block number the associated transaction |
| **Transaction hash** | `transactionHash` | `String` | Hash of the transaction |
| **Owner** | `owner` | `String` | Address of the owner |
| **Spender** | `spender` | `String` | Address of the spender  |
| **Value** | `value` | `Number` | Value of the approval |


# Tasks

## Total supply

Task key: `totalSupply`

Get the total supply of this ERC20

### No input

### Outputs

#### Success

Output key: `success`

Output when the task executes successfully.

| Name | Key | Type | Description |
| --- | --- | --- | --- |
| **Total supply** | `totalSupply` | `Number` | The total supply of this ERC20 |

#### Error

Output key: `error`

Output when an error occurs.

| Name | Key | Type | Description |
| --- | --- | --- | --- |
| **Message** | `message` | `String` | The error's message |


## Balance Of

Task key: `balanceOf`

Get the balance of a given address.

### Inputs

| Name | Key | Type | Description |
| --- | --- | --- | --- |
| **Address** | `address` | `String` | The address to get the balance from |

### Outputs

#### Success

Output key: `success`

Output when the task executes successfully.

| Name | Key | Type | Description |
| --- | --- | --- | --- |
| **Balance** | `balance` | `Number` | The balance of the inputted address |

#### Error

Output key: `error`

Output when an error occurs.

| Name | Key | Type | Description |
| --- | --- | --- | --- |
| **Message** | `message` | `String` | The error's message |


## Allowance

Task key: `allowance`

Get the allowance between an owner and a spender.

### Inputs

| Name | Key | Type | Description |
| --- | --- | --- | --- |
| **Owner** | `owner` | `String` | The address to get the owner |
| **Spender** | `spender` | `String` | The address to get the spender |

### Outputs

#### Success

Output key: `success`

Output when the task executes successfully.

| Name | Key | Type | Description |
| --- | --- | --- | --- |
| **Remaining** | `remaining` | `Number` | The remaining balance of the allowance |

#### Error

Output key: `error`

Output when an error occurs.

| Name | Key | Type | Description |
| --- | --- | --- | --- |
| **Message** | `message` | `String` | The error message |
