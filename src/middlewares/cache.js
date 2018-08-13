import logger from '../libs/logger';
import cache from '../libs/cache';

export default async (ctx, next) => {
    const key = `request::${ctx.request.originalUrl}`;
    const cachedItem = await cache.get(key);
    if (cachedItem) {
        logger.log('Returning from cache', key);
        ctx.body = cachedItem.body;
        ctx.status = cachedItem.status;
        return;
    }
    await next();
    const value = { body: ctx.body, status: ctx.status };
    await cache.set(key, value);
    logger.log('Request is now cached', key);
};
