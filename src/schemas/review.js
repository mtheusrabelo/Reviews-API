import Joi from 'joi';
import mongoose from 'mongoose';

export const getReviews = {
    request: {
        query: {
            userId: Joi.string(),
            productId: Joi.string(),
            rating: Joi.number(),
            page: Joi.number().greater(-1),
            limit: Joi.number().greater(0).less(101),
        },
    },
};

export const postReview = {
    request: {
        body: {
            userId: Joi.string().required(),
            productId: Joi.string().required(),
            rating: Joi.number().required(),
            review: Joi.string().required(),
        },
    },
};

export const getReviewById = {
    request: {
        params: {
            id: Joi.string().length(24).required(),
        },
    },
};

export const deleteReviewById = {
    request: {
        params: {
            id: Joi.string().length(24).required(),
        },
    },
};

export const updateReviewById = {
    request: {
        params: {
            id: Joi.string().length(24).required(),
        },
        body: {
            userId: Joi.string(),
            rating: Joi.number(),
            review: Joi.string(),
        },
    },
};

export const mongoSchema = mongoose.Schema({
    userId: String,
    productId: String,
    rating: Number,
    review: String,
});
