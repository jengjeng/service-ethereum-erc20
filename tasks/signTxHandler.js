module.exports = ({
  web3,
  defaultGasLimit
}) => (method) => async (contract, inputs) => {
  return new Promise(async (resolve, reject) => {
    const { privateKey, gasPrice, gasLimit } = inputs
    const account = web3.eth.accounts.privateKeyToAccount(privateKey)
    const signedTransaction = await account.signTransaction({
      // from: account.address,
      to: contract.options.address,
      gas: gasLimit || defaultGasLimit, // optional
      gasPrice: gasPrice, // optional
      value: 0, // force to 0 ETH
      data: await method(contract, inputs)
    })
    web3.eth.sendSignedTransaction(signedTransaction.rawTransaction)
      .on('transactionHash', transactionHash => {
        console.log('transactionHash', transactionHash)
        return resolve({ transactionHash })
      })
      .on('error', reject)
  })
}
