import logger from '../libs/logger';
import { getModel } from '../libs/database';
import { mongoSchema } from '../schemas/review';

const Review = getModel({ name: 'Review', schema: mongoSchema });

export const getReviews = async ({ filters }) => {
    try {
        logger.log('get reviews service', filters);
        const limit = parseInt(filters.limit, 10) || 10;
        const page = parseInt(filters.page, 10) || 0;
        filters.page = undefined;
        filters.limit = undefined;
        return await Review.find(filters, null, { skip: page * limit, limit });
    } catch (err) {
        logger.log('error while getting reviews', err);
        throw new Error('get reviews error');
    }
};

export const postReview = async ({ review }) => {
    try {
        logger.log('post review service', review);
        return await Review.create(review);
    } catch (err) {
        logger.log('error while creating review', err);
        throw new Error('create review error');
    }
};

export const getReviewById = async ({ id }) => {
    try {
        logger.log('get review by id service', id);
        return await Review.findById(id);
    } catch (err) {
        logger.log('error while getting review by id', err);
        throw new Error('get review by id error');
    }
};

export const deleteReviewById = async ({ id }) => {
    try {
        logger.log('delete review by id', id);
        return await Review.findByIdAndRemove(id);
    } catch (err) {
        logger.log('error while deleting review by id', err);
        throw new Error('delete review by id error');
    }
};

export const updateReviewById = async ({ id, review }) => {
    try {
        logger.log('update review by id service', id, review);
        return await Review.findByIdAndUpdate(id, review);
    } catch (err) {
        logger.log('error while updating review by id', err);
        throw new Error('update review by id error');
    }
};
