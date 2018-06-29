module.exports = ({
  MESG,
  web3,
  convertValue,
  erc20,
  blockConfirmations,
  eventsToHandle
}) => {
  const defaultPayload = (event, data) => ({
    blockNumber: event.blockNumber,
    transactionHash: event.transactionHash,
    value: convertValue(event.returnValues.value),
    ...data
  })

  const handleEvent = ({eventKey, ethereumName, parseEvent}) => async filter => {
    const events = await erc20.getPastEvents(ethereumName, filter)
    for (const event of events) {
      await MESG.emitEvent(eventKey, defaultPayload(event, parseEvent(event)))
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
      console.log('new block', shiftedBN, 'previous', previousBN)
      await fetchEvent(previousBN, shiftedBN)
      previousBN = shiftedBN
    }
    return setTimeout(pollingBlockNumber, 1000)
  }

  const fetchEvent = async (previousBN, lastBN) => {
    const filter = {
      fromBlock: previousBN + 1,
      toBlock: lastBN
    }
    for (const eventToHandle of eventsToHandle) {
      await handleEvent(eventToHandle)(filter)
    }
  }

  return pollingBlockNumber()
}
