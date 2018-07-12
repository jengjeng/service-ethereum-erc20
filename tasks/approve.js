module.exports = ({
  convertToValue,
  erc20
}) => ({ spender, value }) => erc20.methods.approve(spender, convertToValue(value)).encodeABI()
