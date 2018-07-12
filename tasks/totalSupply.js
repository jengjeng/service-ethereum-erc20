module.exports = ({
  convertValue,
  erc20
}) => async () => {
  var totalSupply = await erc20.methods.totalSupply().call()
  totalSupply = convertValue(totalSupply)
  console.log('totalSupply', totalSupply)
  return { totalSupply }
}
