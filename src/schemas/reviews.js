const Joi = require('joi');

const getReviewsRequest = Joi.object({
    params: Joi.object({}),

    query: Joi.object({
        page: Joi.number().integer(),
        pageSize: Joi.number()
            .integer()
            .max(100)
    }),

    body: Joi.object({})
});

const getReviewRequest = Joi.object({
    params: Joi.object({
        id: Joi.number()
            .integer()
            .required()
    }),

    query: Joi.object({}),

    body: Joi.object({})
});

const postReviewsRequest = Joi.object({
    params: Joi.object({}),

    query: Joi.object({}),

    body: Joi.object({
        productId: Joi.number()
            .integer()
            .required(),
        rating: Joi.number()
            .integer()
            .required(),
        comment: Joi.string()
    })
});

const putReviewRequest = Joi.object({
    params: Joi.object({
        id: Joi.number()
            .integer()
            .required()
    }),

    query: Joi.object({}),

    body: Joi.object({
        productId: Joi.number()
            .integer()
            .required(),
        rating: Joi.number()
            .integer()
            .required(),
        comment: Joi.string()
    })
});

const deleteReviewRequest = Joi.object({
    params: Joi.object({
        id: Joi.number()
            .integer()
            .required()
    }),

    query: Joi.object({}),

    body: Joi.object({})
});

module.exports = {
    getReviewsRequest,
    getReviewRequest,
    postReviewsRequest,
    putReviewRequest,
    deleteReviewRequest
};
