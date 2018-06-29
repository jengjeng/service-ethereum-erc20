module.exports = ({
  eventKey: 'approval',
  ethereumName: 'Approval',
  parseEvent: event => ({
    owner: event.returnValues.owner,
    spender: event.returnValues.spender
  })
})
