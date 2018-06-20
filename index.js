const ERC20_ADDRESS = "0xf230b790e05390fc8295f4d3f60332c93bed42e2" //TRON
const ERC20_DECIMAL = 6
const ERC20_ABI = require('./erc20-abi.json')

const Web3 = require('web3')
const web3 = new Web3('wss://mainnet.infura.io/_ws')
const erc20 = new web3.eth.Contract(ERC20_ABI, ERC20_ADDRESS)

erc20.events.Transfer({fromBlock: 'latest'})
.on('data', event => {
  console.log('Transfer', {
    blockNumber: event.blockNumber,
    transactionHash: event.transactionHash,
    from: event.returnValues.from,
    to: event.returnValues.to,
    value: event.returnValues.value / Math.pow(10, ERC20_DECIMAL),
  })
})
