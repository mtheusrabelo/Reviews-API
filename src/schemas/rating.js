import Joi from 'joi';
import mongoose from 'mongoose';

export const getRatings = {
    request: {
        query: {
            productId: Joi.string().required(),
        },
    },
};

export const mongoSchema = mongoose.Schema({
    productId: String,
    rating: Number,
    count: Number,
});
