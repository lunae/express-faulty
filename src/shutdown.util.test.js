const shutdown = require('./shutdown.util')

describe('shutdown.util', () => {
    it('should call process.exit', function () {
        process.exit = jest.fn()
        shutdown()
        expect(process.exit).toHaveBeenCalled()
    });
});