module.exports = ({
  convertValue
}) => async (contract, { owner, spender }) => {
  var remaining = await contract.methods.allowance(owner, spender).call()
  remaining = await convertValue(remaining, contract)
  console.log('remaining allowance between', owner, 'and', spender, 'is', remaining)
  return { remaining }
}
