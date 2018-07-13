module.exports = ({
  convertValue
}) => async (contract, { address }) => {
  var balance = await contract.methods.balanceOf(address).call()
  balance = await convertValue(balance, contract)
  console.log('balance of', address, 'is', balance)
  return { balance }
}
