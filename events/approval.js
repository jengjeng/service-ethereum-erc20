module.exports = ({
  erc20,
}) => ({
  eventKey: 'approval',
  listener: erc20.events.Approval({fromBlock: 'latest'}),
  parseEvent: event => ({
    owner: event.returnValues.owner,
    spender: event.returnValues.spender,
  }),
})
