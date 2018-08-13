import status from 'http-status';
import logger from '../libs/logger';

export const getReviews = async (ctx) => {
    try {
        const filters = ctx.query;
        const reviews = await ctx.state.reviewsService.getReviews({ filters });
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
        await ctx.state.ratingsService
            .updateRating({ review: ctx.request.body });
        const review = await ctx.state.reviewsService
            .postReview({ review: ctx.request.body });
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
        const review = await ctx.state.reviewsService.getReviewById({ id });
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
        const review = await ctx.state.reviewsService.getReviewById({ id });
        if (review) {
            await ctx.state.ratingsService.deleteRating({ review });
            await ctx.state.reviewsService.deleteReviewById({ id });
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
        const prevReview = await ctx.state.reviewsService.getReviewById({ id });
        if (!prevReview) {
            ctx.status = status.NOT_FOUND;
            return;
        }
        const { productId, rating } = prevReview;
        await ctx.state.ratingsService.updateRating({
            review: {
                productId,
                rating: review.rating - rating,
            },
            count: 0,
        });
        await ctx.state.reviewsService.updateReviewById({ id, review });
        ctx.status = status.NO_CONTENT;
        ctx.set({ Location: `/reviews/${id}` });
    } catch (err) {
        ctx.status = status.INTERNAL_SERVER_ERROR;
        logger.log('Update review by id error', err);
    }
};
