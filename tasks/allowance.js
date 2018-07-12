module.exports = ({
  convertValue,
  erc20
}) => async ({ owner, spender }) => {
  var remaining = await erc20.methods.allowance(owner, spender).call()
  remaining = convertValue(remaining)
  console.log('remaining allowance between', owner, 'and', spender, 'is', remaining)
  return { remaining }
}
