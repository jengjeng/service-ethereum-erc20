const MESG = require('mesg-js').service()

const { erc20Address, erc20Decimal, infuraEndpoint } = require('./config.json')
const erc20ABI = require('./erc20-abi.json')

const Web3 = require('web3')
const web3 = new Web3(infuraEndpoint)
const erc20 = new web3.eth.Contract(erc20ABI, erc20Address)

convertValue = value => value / Math.pow(10, erc20Decimal)
defaultPayload = (event, data) => ({
  blockNumber: event.blockNumber,
  transactionHash: event.transactionHash,
  value: convertValue(event.returnValues.value),
  ...data
})
reportError = console.error
const dep = { convertValue, reportError, erc20 }

const handleEvent = ({eventKey, listener, parseEvent}) => listener
.on('data', event => MESG.emitEvent(eventKey, defaultPayload(event, parseEvent(event))))
.on('error', reportError)
handleEvent(require('./events/transfer')(dep))
handleEvent(require('./events/approval')(dep))

MESG.listenTask({
  totalSupply: require('./tasks/totalSupply')(dep),
  balanceOf: require('./tasks/balanceOf')(dep),
  allowance: require('./tasks/allowance')(dep)
})
