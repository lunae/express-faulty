const sleep = require('./sleep.util')
const degradationMiddleware = require('./degradation.middleware')

jest.mock('./sleep.util')

describe('degradation.middleware', () => {
    describe('afterRequestCount', () => {
        beforeEach(() => {
            jest.resetAllMocks()
        })

        it('should sleep on first call if afterRequestCount = 0', async () => {
            const options = {
                initialLatencyInMs: 0,
                increaseLatencyPerRequestInMs: 100,
                afterRequestCount: 0
            }
            const middleware = degradationMiddleware(options)
            await middleware(jest.fn(), jest.fn(), jest.fn())
            expect(sleep).toHaveBeenCalled()
        })

        it('should not sleep when requestCount < afterRequestCount', async () => {
            const options = {
                initialLatencyInMs: 0,
                increaseLatencyPerRequestInMs: 100,
                afterRequestCount: 3
            }
            const middleware = degradationMiddleware(options)
            await middleware(jest.fn(), jest.fn(), jest.fn())
            expect(sleep).not.toHaveBeenCalled()
        })

        it('should sleep when afterRequestCount < requestCount', async () => {
            const options = {
                initialLatencyInMs: 0,
                increaseLatencyPerRequestInMs: 100,
                afterRequestCount: 3
            }
            const middleware = degradationMiddleware(options)
            const requestCount = 5
            for (let i = 0; i < requestCount; i++) {
                await middleware(jest.fn(), jest.fn(), jest.fn())
            }
            expect(sleep).toHaveBeenCalled()
        })
    })

    describe('increaseLatencyPerRequestInMs', () => {

        beforeEach(() => {
            jest.resetAllMocks()
        })

        it('should sleep initial latency on first call', async () => {
            const options = {
                initialLatencyInMs: 200,
                increaseLatencyPerRequestInMs: 100,
                afterRequestCount: 0
            }
            const middleware = degradationMiddleware(options)
            await middleware(jest.fn(), jest.fn(), jest.fn())
            expect(sleep).toHaveBeenCalledWith(200)
        })

        it('should sleep initial latency plus increase on seconds call', async () => {
            const options = {
                initialLatencyInMs: 200,
                increaseLatencyPerRequestInMs: 100,
                afterRequestCount: 0
            }
            const middleware = degradationMiddleware(options)
            await middleware(jest.fn(), jest.fn(), jest.fn())
            await middleware(jest.fn(), jest.fn(), jest.fn())
            expect(sleep).toHaveBeenCalledWith(300)
        })

        it('should sleep initial latency + (increase * request count)', async () => {
            const options = {
                initialLatencyInMs: 200,
                increaseLatencyPerRequestInMs: 100,
                afterRequestCount: 0
            }
            const middleware = degradationMiddleware(options)
            await middleware(jest.fn(), jest.fn(), jest.fn())
            await middleware(jest.fn(), jest.fn(), jest.fn())
            await middleware(jest.fn(), jest.fn(), jest.fn())
            expect(sleep).toHaveBeenCalledWith(200 + 100 + 100)
        })
    })
})