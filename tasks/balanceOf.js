module.exports = ({
  convertValue,
  reportError,
  erc20,
}) => ({ address }, { success, error }) => {
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
