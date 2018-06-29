const MESG = require('mesg-js').service()

const { erc20Address, erc20Decimal, infuraEndpoint, blockConfirmations } = require('./config.json')
const erc20ABI = require('./erc20-abi.json')

const Web3 = require('web3')
const web3 = new Web3(infuraEndpoint)
const erc20 = new web3.eth.Contract(erc20ABI, erc20Address)

const convertValue = value => value / Math.pow(10, erc20Decimal)
const reportError = console.error
const dep = { MESG, web3, convertValue, reportError, erc20, blockConfirmations }

// Start events listeners
const eventsHandler = require('./events')
eventsHandler({
  ...dep,
  eventsToHandle: [
    require('./events/transfer'),
    require('./events/approval')
  ]
})

// Listen for tasks
MESG.listenTask({
  totalSupply: require('./tasks/totalSupply')(dep),
  balanceOf: require('./tasks/balanceOf')(dep),
  allowance: require('./tasks/allowance')(dep)
})
