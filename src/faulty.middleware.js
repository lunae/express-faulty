const FaultType = require('./fault.model')
const noOperationMiddleware = require('./noop.middleware')
const degradationMiddleware = require('./degradation.middleware')

const faultyMiddleware = (options) => {
    const {enabled = true, faultType = FaultType.NO_OP} = options
    if (!enabled) {
        return noOperationMiddleware()
    } else if (FaultType.DEGRADATION === faultType) {
        return degradationMiddleware(options)
    } else {
        return noOperationMiddleware()
    }
}

module.exports = faultyMiddleware