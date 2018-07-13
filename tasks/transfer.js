module.exports = ({
  convertToValue
}) => async (contract, { to, value }) => contract.methods.transfer(to, await convertToValue(value, contract)).encodeABI()
