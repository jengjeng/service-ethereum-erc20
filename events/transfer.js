module.exports = ({
  eventKey: 'transfer',
  ethereumName: 'Transfer',
  parseEvent: event => ({
    from: event.returnValues.from,
    to: event.returnValues.to
  })
})
