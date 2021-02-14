const noOperationMiddleware = () => {
    return async (req, res, next) => {
        next()
    }
}

module.exports = noOperationMiddleware