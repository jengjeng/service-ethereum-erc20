module.exports = ({
  erc20,
  web3,
  defaultGasLimit
}) => (method) => async (inputs, { success, error }) => {
  try {
    const { privateKey, gasPrice, gasLimit } = inputs
    const account = web3.eth.accounts.privateKeyToAccount(privateKey)
    const signedTransaction = await account.signTransaction({
      // from: account.address,
      to: erc20.options.address,
      gas: gasLimit || defaultGasLimit, // optional
      gasPrice: gasPrice, // optional
      value: 0, // force to 0 ETH
      data: method(inputs)
    })
    await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction)
      .on('transactionHash', transactionHash => {
        console.log('transactionHash', transactionHash)
        return success({ transactionHash })
      })
      .on('error', err => {
        console.error('err2', err)
        return error({ message: err.toString() })
      })
  } catch (err) {
    console.error('err1', err)
    return error({ message: err.toString() })
  }
}
