import * as ratingsService from '../services/ratings';
import * as reviewsService from '../services/reviews';

export default async (ctx, next) => {
    ctx.state = {
        ratingsService,
        reviewsService,
    };
    await next();
};
