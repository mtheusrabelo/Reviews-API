const { buildSchema } = require('graphql');

const schema = buildSchema(`
   type Query {
    review(id: Int!): Review 
    reviews(page: Int!, pageSize: Int!): Reviews
  }

  type Mutation {
    createReview(productId: Int!, rating: Int!, comment: String!): Review,
    updateReview(id: Int!, productId: Int!, rating: Int!, comment: String!): Review
    deleteReview(id: Int!): Review
  }

  type Reviews {
    data: [Review]
    pagination: Pagination!
  }

  type Pagination {
    page: Int!,
    pageSize: Int!,
    count: Int!,
    totalPages: Int!
  }

  type Review {
    id: Int!,
    productId: Int!,
    rating: Int!,
    comment: String!
  }
`);

const errorHandler = ({ logger }) => (err) => {
    logger.error(err);
};

const rootResolver = ({ reviewsService, logger }) => ({
    review: ({ id }) => reviewsService
        .getById({ id }).catch(errorHandler({ logger })),
    reviews: ({ page, pageSize }) => reviewsService
        .getAll({ page, pageSize }).catch(errorHandler({ logger })),
    createReview: ({ productId, rating, comment }) => reviewsService
        .add({ productId, rating, comment }).catch(errorHandler({ logger })),
    deleteReview: ({ id }) => reviewsService
        .remove({ id }).catch(errorHandler({ logger })),
    updateReview: ({
        id, productId, rating, comment
    }) => reviewsService
        .update({ id }, { productId, rating, comment }).catch(errorHandler({ logger })),
});

module.exports = (args) => ({
    schema,
    rootResolver: rootResolver(args)
});
