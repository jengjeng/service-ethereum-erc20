module.exports = ({
  convertToValue,
  erc20
}) => ({ from, to, value }) => erc20.methods.transferFrom(from, to, convertToValue(value)).encodeABI()
