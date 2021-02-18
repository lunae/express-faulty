const shutdown = require('./shutdown.util')
const downMiddleware = require('./down.middleware')

jest.mock('./shutdown.util')

describe('down.middleware', () => {
    describe('afterRequestCount', () => {
        beforeEach(() => {
            jest.resetAllMocks()
        })

        it('should shutdown after first call if afterRequestCount = 0', async () => {
            const options = {
                afterRequestCount: 0
            }
            const middleware = downMiddleware(options)
            await middleware(jest.fn(), jest.fn(), jest.fn())
            expect(shutdown).toHaveBeenCalled()
        })

        it('should not shutdown when requestCount < afterRequestCount', async () => {
            const options = {
                afterRequestCount: 3
            }
            const middleware = downMiddleware(options)
            await middleware(jest.fn(), jest.fn(), jest.fn())
            expect(shutdown).not.toHaveBeenCalled()
        })

        it('should shutdown when afterRequestCount < requestCount', async () => {
            const options = {
                afterRequestCount: 3
            }
            const middleware = downMiddleware(options)
            const requestCount = 5
            for (let i = 0; i < requestCount; i++) {
                await middleware(jest.fn(), jest.fn(), jest.fn())
            }
            expect(shutdown).toHaveBeenCalled()
        })
    })
})