module.exports = ({
  convertValue,
  erc20
}) => ({ address }, { success, error }) => {
  return erc20.methods.balanceOf(address).call()
    .then(balance => {
      balance = convertValue(balance)
      console.log('balance of', address, 'is', balance)
      return success({balance})
    })
    .catch(err => {
      console.error(err)
      return error({message: err.toString()})
    })
}
