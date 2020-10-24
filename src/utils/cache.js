const util = require('util');
const Redis = require('ioredis');

const cache = ({ config }) => {
    const client = new Redis(config.cache.url);

    const getAsync = util.promisify(client.get).bind(client);
    const setAsync = util.promisify(client.set).bind(client);
    const publishAsync = util.promisify(client.publish).bind(client);
    const subscribeAsync = util.promisify(client.subscribe).bind(client);

    client.on('error', (error) => {
        throw error;
    });

    return {
        get: async (...args) => {
            const result = await getAsync(...args);
            return JSON.parse(result);
        },
        set: async (key, value, ...args) => {
            const strValue = JSON.stringify(value);
            return setAsync(key, strValue, ...args);
        },
        publishAsync,
        subscribeAsync
    };
};

module.exports = cache;
