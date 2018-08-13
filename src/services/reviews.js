import logger from '../libs/logger';
import mongoose from '../libs/database';
import { mongoSchema } from '../schemas/review';

const Review = mongoose.model('Review', mongoSchema);

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

export const postReview = async ({ review, ratingsService }) => {
    try {
        logger.log('post review service', review);
        const session = await mongoose.startSession();
        await session.startTransaction();
        const addedReview = await Review.create([review], { session });
        await ratingsService.updateRating({ review, session });
        await session.commitTransaction();
        await session.endSession();
        return addedReview;
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

export const deleteReviewById = async ({ id, ratingsService }) => {
    try {
        logger.log('delete review by id', id);
        const session = await mongoose.startSession();
        await session.startTransaction();
        const review = await Review.findById(id);
        await Review.findByIdAndRemove(id, { session });
        await ratingsService.deleteRating({ review, session });
        await session.commitTransaction();
        await session.endSession();
        return review;
    } catch (err) {
        logger.log('error while deleting review by id', err);
        throw new Error('delete review by id error');
    }
};

export const updateReviewById = async ({
    id, review, ratingsService, prevReview,
}) => {
    try {
        logger.log('update review by id service', id, review);
        const session = await mongoose.startSession();
        await session.startTransaction();
        const { productId, rating } = prevReview;
        const updatedReview = await Review.findByIdAndUpdate(id, review, { session });
        await ratingsService.updateRating({
            review: {
                productId,
                rating: review.rating - rating,
            },
            count: 0,
        }, { session });
        await session.commitTransaction();
        await session.endSession();
        return updatedReview;
    } catch (err) {
        logger.log('error while updating review by id', err);
        throw new Error('update review by id error');
    }
};
