const MESG = require('mesg-js').service()

const { erc20Address, erc20Decimal, infuraEndpoint } = require('./config.json')
const erc20ABI = require('./erc20-abi.json')

const Web3 = require('web3')
const web3 = new Web3(infuraEndpoint)
const erc20 = new web3.eth.Contract(erc20ABI, erc20Address)

convertValue = value => value / Math.pow(10, erc20Decimal)

reportError = console.error

erc20.events.Transfer({fromBlock: 'latest'})
.on('data', event => {
  return MESG.emitEvent('transfer', {
    blockNumber: event.blockNumber,
    transactionHash: event.transactionHash,
    from: event.returnValues.from,
    to: event.returnValues.to,
    value: convertValue(event.returnValues.value),
  })
})
.on('error', reportError)

erc20.events.Approval({fromBlock: 'latest'})
.on('data', event => {
  return MESG.emitEvent('approval', {
    blockNumber: event.blockNumber,
    transactionHash: event.transactionHash,
    owner: event.returnValues.owner,
    spender: event.returnValues.spender,
    value: convertValue(event.returnValues.value),
  })
})
.on('error', reportError)

const totalSupply = ({}, { success, error }) => {
  return erc20.methods.totalSupply().call()
  .then(totalSupply => {
    totalSupply = convertValue(totalSupply)
    console.log("totalSupply", totalSupply)
    return success({totalSupply})
  })
  .catch(err => {
    reportError(err)
    return error({message: err.toString()})
  })
}

const balanceOf = ({ address }, { success, error }) => {
  return erc20.methods.balanceOf(address).call()
  .then(balance => {
    balance = convertValue(balance)
    console.log("balance of", address, "is", balance)
    return success({balance})
  })
  .catch(err => {
    reportError(err)
    return error({message: err.toString()})
  })
}

const allowance = ({ owner, spender }, { success, error }) => {
  return erc20.methods.allowance(owner, spender).call()
  .then(remaining => {
    remaining = convertValue(remaining)
    console.log("remaining allowance between", owner, "and", spender, "is", remaining)
    return success({remaining})
  })
  .catch(err => {
    reportError(err)
    return error({message: err.toString()})
  })
}

MESG.listenTask({ totalSupply, balanceOf, allowance })
