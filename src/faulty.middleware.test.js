const noopMiddleware = require('./noop.middleware')
const degradationMiddleware = require('./degradation.middleware')
const faultyMiddleware = require('./faulty.middleware')

jest.mock('./noop.middleware')
jest.mock('./degradation.middleware')

describe('faulty.middleware', () => {

    beforeEach(() => {
       jest.resetAllMocks()
    })

    it('should return no-op middleware if disabled', () => {
        const options = { enabled: false }
        faultyMiddleware(options)
        expect(noopMiddleware).toBeCalled()
    })

    it('should return degradation middleware if enabled and type = DEGRADATION', () => {
        const options = { enabled: true, faultType: 'DEGRADATION' }
        faultyMiddleware(options)
        expect(degradationMiddleware).toBeCalled()
    })

    it('should return no-op middleware if no matching type', () => {
        const options = { enabled: true }
        faultyMiddleware(options)
        expect(noopMiddleware).toBeCalled()
    })
})