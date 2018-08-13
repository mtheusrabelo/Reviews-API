import status from 'http-status';
import logger from '../libs/logger';

export default async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = status.INTERNAL_SERVER_ERROR;
        logger.log('Exception Handler', { err: err.message });
    }
};
