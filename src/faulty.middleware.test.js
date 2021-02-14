const noopMiddleware = require('./noop.middleware')
const faultyMiddleware = require('./faulty.middleware')

jest.mock('./noop.middleware')

describe('faulty.middleware', () => {
    it('should return no-op middleware if disabled', () => {
        const options = { enabled: false }
        faultyMiddleware(options)
        expect(noopMiddleware).toBeCalled()
    })

    it('should return no-op middleware if enabled', () => {
        const options = { enabled: true }
        faultyMiddleware(options)
        expect(noopMiddleware).toBeCalled()
    })
})