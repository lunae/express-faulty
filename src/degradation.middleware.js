const sleep = require('./sleep.util')

const degradationMiddleware = (options) => {
    const {initialLatencyInMs = 0, increaseLatencyPerRequestInMs = 0, afterRequestCount = 0} = options
    let latency = initialLatencyInMs
    let latencyIncrease = increaseLatencyPerRequestInMs
    let requestCount = 0
    return async (req, res, next) => {
        if (afterRequestCount <= requestCount) {
            await sleep(latency)
            latency += latencyIncrease
        }
        requestCount += 1
        next()
    }
}

module.exports = degradationMiddleware