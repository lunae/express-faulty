const shutdown = require('./shutdown.util')

const downMiddleware = (options) => {
    const {afterRequestCount = 0} = options
    let requestCount = 0
    return async (req, res, next) => {
        if (afterRequestCount <= requestCount) {
            shutdown()
        }
        requestCount += 1
        next()
    }
}

module.exports = downMiddleware