const FaultType = require('./fault.model')
const noOperationMiddleware = require('./noop.middleware')

const faultyMiddleware = (options) => {
    const {enabled = true, faultType = FaultType.NO_OP} = options
    if (!enabled) {
        return noOperationMiddleware()
    } else {
        return noOperationMiddleware()
    }
}

module.exports = faultyMiddleware