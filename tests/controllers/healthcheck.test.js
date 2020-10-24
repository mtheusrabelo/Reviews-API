const status = require('http-status');
const healthcheckController = require('../../src/controllers/healthcheck');

const logger = {
    debug: jest.fn()
};

test('should return liveness OK if service is live', async () => {
    const healthcheckService = {
        isLive: jest.fn().mockResolvedValue(true)
    };
    const healthcheck = healthcheckController({ logger, healthcheckService });
    const ctx = {};

    await healthcheck.getLiveness(ctx);

    expect(ctx.status).toBe(status.OK);
});

test('should return readiness OK if service is ready', async () => {
    const healthcheckService = {
        isReady: jest.fn().mockResolvedValue(true)
    };
    const healthcheck = healthcheckController({ logger, healthcheckService });
    const ctx = {};

    await healthcheck.getReadiness(ctx);

    expect(ctx.status).toBe(status.OK);
});

test('should return liveness internal error if service is not live', async () => {
    const healthcheckService = {
        isLive: jest.fn().mockRejectedValue(new Error('Service is not live'))
    };
    const healthcheck = healthcheckController({ logger, healthcheckService });
    const ctx = {};

    await healthcheck.getLiveness(ctx);

    expect(ctx.status).toBe(status.INTERNAL_SERVER_ERROR);
});

test('should return readiness internal error if service is not ready', async () => {
    const healthcheckService = {
        isReady: jest.fn().mockRejectedValue(new Error('Service is not ready'))
    };
    const healthcheck = healthcheckController({ logger, healthcheckService });
    const ctx = {};

    await healthcheck.getReadiness(ctx);

    expect(ctx.status).toBe(status.INTERNAL_SERVER_ERROR);
});
