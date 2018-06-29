module.exports = ({
  convertValue,
  reportError,
  erc20
}) => (_, { success, error }) => {
  return erc20.methods.totalSupply().call()
    .then(totalSupply => {
      totalSupply = convertValue(totalSupply)
      console.log('totalSupply', totalSupply)
      return success({totalSupply})
    })
    .catch(err => {
      reportError(err)
      return error({message: err.toString()})
    })
}
