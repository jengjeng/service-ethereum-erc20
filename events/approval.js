module.exports = ({
  eventKey: 'approval',
  ethereumName: 'Approval',
  parseEvent: event => ({
    owner: event.owner,
    spender: event.spender
  })
})
