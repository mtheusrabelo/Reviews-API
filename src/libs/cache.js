import redis from 'redis';
import { promisify } from 'util';
import logger from './logger';

const url = process.env.REDIS_URL || 'redis://redis:6379';
const client = redis.createClient({ url });
logger.log('Connecting with Redis', url);

const cacheTTL = process.env.CACHE_TTL || 180;
client.on('error', err => logger.log('Redis error', err));

export default {
    get: async (key) => {
        const asyncGet = promisify(client.get).bind(client);
        try {
            const value = await asyncGet(key);
            if (value) {
                return JSON.parse(value);
            }
        } catch (err) {
            logger.log('Error while trying to get cache item');
        }
    },
    set: async (key, value) => {
        const asyncSet = promisify(client.set).bind(client);
        try {
            const strValue = JSON.stringify(value);
            return await asyncSet(key, strValue, 'EX', cacheTTL);
        } catch (err) {
            logger.log('Error while trying to set cache item', key, value, err);
        }
    },
    del: promisify(client.del).bind(client),
};
