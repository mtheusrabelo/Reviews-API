const dayjs = require('dayjs');
const healthcheckService = require('../../src/services/healthcheck');

const database = {
    query: jest.fn().mockResolvedValue([{ now: dayjs().format() }])
};

const cache = {
    set: jest.fn().mockResolvedValue(true),
    get: jest.fn().mockResolvedValue(dayjs().format())
}

test('should be able to tell if the service is live', async () => {
    const healthcheck = healthcheckService({ database, cache });

    const isLive = await healthcheck.isLive();

    expect(isLive).toBe(true);
});

test('should be able to tell if the service is ready', async () => {
    const healthcheck = healthcheckService({ database, cache });

    const isReady = await healthcheck.isReady();

    expect(isReady).toBe(true);
});
