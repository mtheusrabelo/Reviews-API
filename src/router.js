import koaRouter from 'koa-router';

import validate from './middlewares/validate';
import cache from './middlewares/cache';
import * as ratingsSchema from './schemas/rating';
import * as reviewsSchema from './schemas/review';
import * as healthcheckHandler from './controllers/healthcheck';
import * as reviewsHandler from './controllers/reviews';
import * as ratingsHandler from './controllers/ratings';

const router = koaRouter();

router.get(
    '/healthcheck',
    healthcheckHandler.getHealthcheck,
);

router.get(
    '/ratings',
    cache,
    validate({ schema: ratingsSchema.getRatings }),
    ratingsHandler.getRatings,
);

router.get(
    '/reviews',
    cache,
    validate({ schema: reviewsSchema.getReviews }),
    reviewsHandler.getReviews,
);

router.post(
    '/reviews',
    validate({ schema: reviewsSchema.postReview }),
    reviewsHandler.postReview,
);

router.get(
    '/reviews/:id',
    cache,
    validate({ schema: reviewsSchema.getReviewById }),
    reviewsHandler.getReviewById,
);

router.patch(
    '/reviews/:id',
    validate({ schema: reviewsSchema.updateReviewById }),
    reviewsHandler.updateReviewById,
);

router.delete(
    '/reviews/:id',
    validate({ schema: reviewsSchema.deleteReviewById }),
    reviewsHandler.deleteReviewById,
);

export default router;
