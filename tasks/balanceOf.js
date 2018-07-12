module.exports = ({
  convertValue,
  erc20
}) => async ({ address }) => {
  var balance = await erc20.methods.balanceOf(address).call()
  balance = convertValue(balance)
  console.log('balance of', address, 'is', balance)
  return { balance }
}
