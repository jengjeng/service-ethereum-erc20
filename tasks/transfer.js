module.exports = ({
  convertToValue,
  erc20
}) => ({ to, value }) => erc20.methods.transfer(to, convertToValue(value)).encodeABI()
