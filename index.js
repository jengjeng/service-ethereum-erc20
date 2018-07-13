const MESG = require('mesg-js').service()
const Web3 = require('web3')
const {
  infuraEndpoint,
  blockConfirmations,
  defaultGasLimit,
  defaultDecimals
} = require('./config.json')
const erc20ABI = require('./erc20-abi.json')

const web3 = new Web3(infuraEndpoint)

const BN = web3.utils.toBN
const decimals = async (contract) => {
  try {
    return BN(10).pow(BN(await contract.methods.decimals().call()))
  } catch (err) {
    return BN(defaultDecimals)
  }
}

const convertValue = async (value, contract) => value / await decimals(contract)
const convertToValue = async (value, contract) => BN(value).mul(await decimals(contract))
const dep = { MESG, web3, convertValue, convertToValue, blockConfirmations, defaultGasLimit, erc20ABI }
const tasksHandler = require('./tasks')(dep)
const signTxHandler = require('./tasks/signTxHandler')(dep)
const eventsHandler = require('./events')(dep)

// Start events listeners
eventsHandler([
  require('./events/transfer'),
  require('./events/approval')
])

// Listen for tasks
MESG.listenTask({
  totalSupply: tasksHandler(require('./tasks/totalSupply')(dep)),
  balanceOf: tasksHandler(require('./tasks/balanceOf')(dep)),
  allowance: tasksHandler(require('./tasks/allowance')(dep)),
  transfer: tasksHandler(signTxHandler(require('./tasks/transfer')(dep))),
  approve: tasksHandler(signTxHandler(require('./tasks/approve')(dep))),
  transferFrom: tasksHandler(signTxHandler(require('./tasks/transferFrom')(dep)))
})
