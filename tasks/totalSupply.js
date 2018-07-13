module.exports = ({
  convertValue
}) => async (contract) => {
  var totalSupply = await contract.methods.totalSupply().call()
  totalSupply = await convertValue(totalSupply, contract)
  console.log('totalSupply', totalSupply)
  return { totalSupply }
}
