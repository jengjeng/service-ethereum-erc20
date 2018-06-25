module.exports = ({
  erc20,
}) => ({
  eventKey: 'transfer',
  listener: erc20.events.Transfer({fromBlock: 'latest'}),
  parseEvent: event => ({
    from: event.returnValues.from,
    to: event.returnValues.to,
  }),
})
