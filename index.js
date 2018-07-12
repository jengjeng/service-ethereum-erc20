const MESG = require('mesg-js').service()
const Web3 = require('web3')
const {
  erc20Address,
  erc20Decimal,
  infuraEndpoint,
  blockConfirmations,
  defaultGasLimit
} = require('./config.json')
const erc20ABI = require('./erc20-abi.json')

const web3 = new Web3(infuraEndpoint)
const erc20 = new web3.eth.Contract(erc20ABI, erc20Address)

const BN = web3.utils.toBN
const decimalBN = BN(10).pow(BN(erc20Decimal))

const convertValue = value => BN(value).div(decimalBN).toString(10)
const convertToValue = value => BN(value).mul(decimalBN)
const dep = { MESG, web3, erc20, convertValue, convertToValue, blockConfirmations, defaultGasLimit }
const tasksHandler = require('./tasks')
const signTxHandler = require('./tasks/signTxHandler')(dep)
const eventsHandler = require('./events')

// Start events listeners
eventsHandler({
  ...dep,
  eventsToHandle: [
    require('./events/transfer'),
    require('./events/approval')
  ]
})

// Listen for tasks
MESG.listenTask({
  totalSupply: tasksHandler(require('./tasks/totalSupply')(dep)),
  balanceOf: tasksHandler(require('./tasks/balanceOf')(dep)),
  allowance: tasksHandler(require('./tasks/allowance')(dep)),
  transfer: tasksHandler(signTxHandler(require('./tasks/transfer')(dep))),
  approve: tasksHandler(signTxHandler(require('./tasks/approve')(dep))),
  transferFrom: tasksHandler(signTxHandler(require('./tasks/transferFrom')(dep)))
})
