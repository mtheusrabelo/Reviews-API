const { buildSchema } = require('graphql');

const schema = buildSchema(`
   type Query {
    review(id: Int!): Review 
  }

  type Review {
    id: Int!,
    rating: Int!,
    comment: String!
  }
`);

const rootResolver = ({ reviewsService }) => ({
    review: ({ id }) => reviewsService.getById({ id }),
});

module.exports = (args) => ({
    schema,
    rootResolver: rootResolver(args)
});
