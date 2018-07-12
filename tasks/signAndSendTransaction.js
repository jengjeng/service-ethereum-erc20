
module.exports = ({
  erc20,
  web3,
  defaultGasLimit
}) => ({ fromPrivateKey, transactionData, gasPrice, gasLimit }) => {
  return new Promise(async (resolve, reject) => {
    const account = web3.eth.accounts.privateKeyToAccount(fromPrivateKey)
    const signedTransaction = await account.signTransaction({
      // from: account.address,
      to: erc20.options.address,
      gas: gasLimit || defaultGasLimit, // optional
      gasPrice: gasPrice, // optional
      value: 0, // force to 0 ETH
      data: transactionData
    })
    return web3.eth.sendSignedTransaction(signedTransaction.rawTransaction)
      .on('transactionHash', resolve)
      .on('error', reject)
  })
}
