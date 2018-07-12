module.exports = ({
  convertValue,
  erc20
}) => (_, { success, error }) => {
  return erc20.methods.totalSupply().call()
    .then(totalSupply => {
      totalSupply = convertValue(totalSupply)
      console.log('totalSupply', totalSupply)
      return success({totalSupply})
    })
    .catch(err => {
      console.error(err)
      return error({message: err.toString()})
    })
}
