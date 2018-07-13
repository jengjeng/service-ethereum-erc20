module.exports = ({
  convertToValue
}) => async (contract, { spender, value }) => contract.methods.approve(spender, await convertToValue(value, contract)).encodeABI()
