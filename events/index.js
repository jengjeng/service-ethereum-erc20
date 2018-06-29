module.exports = ({
  MESG,
  web3,
  convertValue,
  erc20,
  blockConfirmations
}, eventsToHandle) => {
  const defaultPayload = (event, data) => ({
    blockNumber: event.blockNumber,
    transactionHash: event.transactionHash,
    value: convertValue(event.returnValues.value),
    ...data
  })

  const handleEvent = ({eventKey, ethereumName, parseEvent}) => async filter => {
    const events = await erc20.getPastEvents(ethereumName, filter)
    var i = 0
    for (i = 0; i < events.length; i++) {
      const event = events[i]
      console.log('eventKey', event.transactionHash)
      await MESG.emitEvent(eventKey, defaultPayload(event, parseEvent(event)))
    }
  }

  var previousBN = 5873289
  const pollingBlockNumber = async () => {
    const lastBN = await web3.eth.getBlockNumber()
    const shiftedBN = lastBN - blockConfirmations
    if (previousBN === undefined) {
      previousBN = shiftedBN - 1
    }
    if (shiftedBN > previousBN) {
      console.log('new block - previous', previousBN, 'last', lastBN, 'shifted', shiftedBN)
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
    console.log('will fetch events with filter', filter)
    var i = 0
    for (i = 0; i < eventsToHandle.length; i++) {
      const eventToHandle = eventsToHandle[i]
      await handleEvent(eventToHandle)(filter)
    }
  }

  return pollingBlockNumber()
}
