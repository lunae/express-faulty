const { Fault } = require('./src/fault.model')
const middleware = require('./src/noop.middleware')

module.exports = middleware
module.exports.Fault = Fault
