module.exports = ({
  MESG,
  web3,
  convertValue,
  blockConfirmations,
  erc20ABI
}) => eventsToHandle => {
  const eventConfigs = eventsToHandle
    .map(eventToHandle => {
      const abi = erc20ABI.filter(abi => abi.type === 'event' && abi.name === eventToHandle.ethereumName)[0]
      const topic = web3.eth.abi.encodeEventSignature(abi)
      return {
        ...eventToHandle,
        abi,
        topic
      }
    })
    .reduce((eventConfigs, eventToHandle) => ({
      ...eventConfigs,
      [eventToHandle.topic]: eventToHandle
    }), {})

  const defaultPayload = async (log, event, data) => ({
    blockNumber: log.blockNumber,
    transactionHash: log.transactionHash,
    contractAddress: log.address,
    value: await convertValue(event.value, new web3.eth.Contract(erc20ABI, log.address)),
    ...data
  })

  const fetchEvents = async (previousBN, lastBN) => {
    const logs = await web3.eth.getPastLogs({
      fromBlock: web3.utils.toHex(previousBN + 1),
      toBlock: web3.utils.toHex(lastBN),
      topics: [Object.keys(eventConfigs)]
    })
    for (const log of logs) {
      const { topics, data, transactionHash } = log
      try {
        const topic = topics[0]
        const { abi, parseEvent, eventKey } = eventConfigs[topic]
        if (abi.anonymous === false) {
          // Remove first element because event is non-anonymous
          // https://web3js.readthedocs.io/en/1.0/web3-eth-abi.html#decodelog
          topics.splice(0, 1)
        }
        const event = web3.eth.abi.decodeLog(abi.inputs, data, topics)
        await MESG.emitEvent(eventKey, await defaultPayload(log, event, parseEvent(event)))
      } catch (err) {
        console.error('error with transaction', transactionHash, err.toString())
      }
    }
  }

  var previousBN
  const pollingBlockNumber = async () => {
    const lastBN = await web3.eth.getBlockNumber()
    const shiftedBN = lastBN - blockConfirmations
    if (previousBN === undefined) {
      previousBN = shiftedBN - 1
    }
    if (shiftedBN > previousBN) {
      console.log('new block', shiftedBN)
      await fetchEvents(previousBN, shiftedBN)
      previousBN = shiftedBN
    }
    return setTimeout(pollingBlockNumber, 1000)
  }
  return pollingBlockNumber()
}
