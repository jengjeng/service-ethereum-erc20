# service-ethereum-erc20
MESG Service for Ethereum ERC20

# Tuto

npm init && npm install --save mesg-js

Create index.js

npm install web3@0.20.6 //compatiblity with infura polling

### test infura connection

```js
const Web3 = require('web3')
var web3 = new Web3('https://mainnet.infura.io')

web3.eth.getBlockNumber()
.then(console.log)
.catch(console.error)
```

should return a block number