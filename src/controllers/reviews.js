import status from 'http-status';
import logger from '../libs/logger';

export const getReviews = async (ctx) => {
    try {
        const filters = ctx.query;
        const { reviewsService } = ctx.state;
        const reviews = await reviewsService.getReviews({ filters });
        ctx.body = reviews;
        if (reviews) {
            ctx.status = status.OK;
            return;
        }
        ctx.status = status.NOT_FOUND;
    } catch (err) {
        ctx.status = status.INTERNAL_SERVER_ERROR;
        logger.log('Get reviews handler error', err);
    }
};

export const postReview = async (ctx) => {
    try {
        const { ratingsService, reviewsService } = ctx.state;
        const review = await reviewsService.postReview({
            review: ctx.request.body,
            ratingsService,
        });
        // eslint-disable-next-line
        ctx.set({ Location: `/reviews/${review._id}` });
        ctx.status = status.CREATED;
        ctx.body = review;
    } catch (err) {
        ctx.status = status.INTERNAL_SERVER_ERROR;
        logger.log('Post review handler error', err);
    }
};

export const getReviewById = async (ctx) => {
    try {
        const { id } = ctx.params;
        const { ratingsService, reviewsService } = ctx.state;
        const review = await reviewsService.getReviewById({ id, ratingsService });
        ctx.body = review;
        if (review) {
            ctx.status = status.OK;
            return;
        }
        ctx.status = status.NOT_FOUND;
    } catch (err) {
        ctx.status = status.INTERNAL_SERVER_ERROR;
        logger.log('Get review by id error', err);
    }
};

export const deleteReviewById = async (ctx) => {
    try {
        const { id } = ctx.params;
        const { ratingsService, reviewsService } = ctx.state;
        const review = await reviewsService.getReviewById({ id });
        if (review) {
            await reviewsService.deleteReviewById({ id, ratingsService });
            ctx.status = status.NO_CONTENT;
            return;
        }
        ctx.status = status.NOT_FOUND;
    } catch (err) {
        ctx.status = status.INTERNAL_SERVER_ERROR;
        logger.log('Delete review by id error', err);
    }
};

export const updateReviewById = async (ctx) => {
    try {
        const { id } = ctx.params;
        const review = ctx.request.body;
        const { ratingsService, reviewsService } = ctx.state;
        const prevReview = await reviewsService.getReviewById({ id });
        await ctx.state.reviewsService.updateReviewById({
            id, review, prevReview, ratingsService,
        });
        ctx.status = status.NO_CONTENT;
        ctx.set({ Location: `/reviews/${id}` });
    } catch (err) {
        ctx.status = status.INTERNAL_SERVER_ERROR;
        logger.log('Update review by id error', err);
    }
};
