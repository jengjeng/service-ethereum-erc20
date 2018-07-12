module.exports = ({
  convertValue,
  erc20
}) => ({ owner, spender }, { success, error }) => {
  return erc20.methods.allowance(owner, spender).call()
    .then(remaining => {
      remaining = convertValue(remaining)
      console.log('remaining allowance between', owner, 'and', spender, 'is', remaining)
      return success({remaining})
    })
    .catch(err => {
      console.error(err)
      return error({message: err.toString()})
    })
}
