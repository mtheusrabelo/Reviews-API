const Router = require('koa-router');
const { container } = require('./injector');
const {
  getReviewsRequest,
  postReviewsRequest,
  getReviewRequest,
  putReviewRequest,
  deleteReviewRequest
} = require('./schemas/reviews');

const router = new Router();

const healthcheckController = container.resolve('healthcheckController');
const reviewsController = container.resolve('reviewsController');
const validator = container.resolve('validatorMiddleware');

// health
router.get('/liveness', healthcheckController.getLiveness);
router.get('/readiness', healthcheckController.getReadiness);

// v1
router.get('/v1/reviews', validator(getReviewsRequest), reviewsController.getAll);
router.post('/v1/reviews', validator(postReviewsRequest), reviewsController.post);
router.get('/v1/reviews/:id', validator(getReviewRequest), reviewsController.get);
router.put('/v1/reviews/:id', validator(putReviewRequest), reviewsController.put);
router.delete('/v1/reviews/:id', validator(deleteReviewRequest), reviewsController.remove);

module.exports = router;
