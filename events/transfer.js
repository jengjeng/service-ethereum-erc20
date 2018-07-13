module.exports = ({
  eventKey: 'transfer',
  ethereumName: 'Transfer',
  parseEvent: event => ({
    from: event.from,
    to: event.to
  })
})
