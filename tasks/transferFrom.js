module.exports = ({
  convertToValue
}) => async (contract, { from, to, value }) => contract.methods.transferFrom(from, to, await convertToValue(value, contract)).encodeABI()
