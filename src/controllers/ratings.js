import status from 'http-status';
import logger from '../libs/logger';

export const getRatings = async (ctx) => {
    try {
        const filters = ctx.query;
        const ratings = await ctx.state.ratingsService.getRatings({ filters });
        ctx.body = ratings;
        if (ratings) {
            ctx.status = status.OK;
            return;
        }
        ctx.status = status.NOT_FOUND;
    } catch (err) {
        ctx.status = status.INTERNAL_SERVER_ERROR;
        logger.log('Get ratings handler error', err);
    }
};
