const MESG = require('mesg-js').service()

const { erc20Address, erc20Decimal, infuraEndpoint } = require('./config.json')
const erc20ABI = require('./erc20-abi.json')

const Web3 = require('web3')
const web3 = new Web3(infuraEndpoint)
const erc20 = new web3.eth.Contract(erc20ABI, erc20Address)

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
