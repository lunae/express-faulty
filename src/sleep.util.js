const sleep = (millis, callback = () => {}) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            callback()
            resolve()
        }, millis)
    })
}

module.exports = sleep