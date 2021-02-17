const sleep = require('./sleep.util')

describe('sleep.util', () => {
    it('should call setTimeout with millis', async () => {
        expect.assertions(1)
        jest.useFakeTimers()

        const millis = 1000
        sleep(millis)

        expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), millis)
    })

    it('should call callback after N millis', async () => {
        expect.assertions(1)
        jest.useFakeTimers()

        const millis = 1000
        const callback = jest.fn()
        sleep(millis, callback)

        jest.advanceTimersByTime(millis)
        expect(callback).toHaveBeenCalled()
    })

    it('should not be called before N millis', async () => {
        expect.assertions(1)
        jest.useFakeTimers()

        const millis = 1000
        const callback = jest.fn()

        expect(callback).not.toHaveBeenCalled()
    })
})