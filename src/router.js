const Router = require('koa-router');
const graphqlHTTP = require('koa-graphql');
const { container } = require('./injector');
const {
  getReviewsRequest,
  postReviewsRequest,
  getReviewRequest,
  putReviewRequest,
  deleteReviewRequest
} = require('./schemas/reviews');

const router = new Router();

const graphQL = container.resolve('graphQL');
const healthcheckController = container.resolve('healthcheckController');
const reviewsController = container.resolve('reviewsController');
const validator = container.resolve('validatorMiddleware');

// health
router.get('/liveness', healthcheckController.getLiveness);
router.get('/readiness', healthcheckController.getReadiness);

// graphql
router.all('/graphql', graphqlHTTP({
    schema: graphQL.schema,
    rootValue: graphQL.rootResolver,
    graphiql: false
}));

router.all('/graphiql', graphqlHTTP({
    schema: graphQL.schema,
    rootValue: graphQL.rootResolver,
    pretty: true,
    graphiql: true
}));

// v1
router.get('/v1/reviews', validator(getReviewsRequest), reviewsController.getAll);
router.post('/v1/reviews', validator(postReviewsRequest), reviewsController.post);
router.get('/v1/reviews/:id', validator(getReviewRequest), reviewsController.get);
router.put('/v1/reviews/:id', validator(putReviewRequest), reviewsController.put);
router.delete('/v1/reviews/:id', validator(deleteReviewRequest), reviewsController.remove);

module.exports = router;
