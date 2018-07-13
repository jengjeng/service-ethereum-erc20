module.exports = ({
  web3,
  erc20ABI
}) => (method) => async (inputs, { success, error }) => {
  try {
    const contract = new web3.eth.Contract(erc20ABI, inputs.contractAddress)
    const data = await method(contract, inputs)
    return success(data)
  } catch (err) {
    console.error(err)
    return error({message: err.toString()})
  }
}
