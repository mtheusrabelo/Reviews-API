import logger from '../libs/logger';
import { getModel } from '../libs/database';
import { mongoSchema } from '../schemas/rating';

const Rating = getModel({ name: 'Rating', schema: mongoSchema });

export const getRatings = async ({ filters }) => {
    try {
        logger.log('get ratings service', filters);
        const { productId } = filters;
        return await Rating.findOne({ productId });
    } catch (err) {
        logger.log('error while updating rating', err);
        throw new Error('get ratings error');
    }
};

export const updateRating = async ({ review, count = 1 }) => {
    try {
        logger.log('update rating service', review);
        const { productId, rating } = review;
        return await Rating.findOneAndUpdate({ productId }, {
            $inc: {
                rating,
                count,
            },
        }, { upsert: true });
    } catch (err) {
        logger.log('error while updating rating', err);
        throw new Error('update rating error');
    }
};

export const deleteRating = async ({ review }) => {
    try {
        logger.log('delete rating service', review);
        const { productId, rating } = review;
        return await Rating.findOneAndUpdate({ productId }, {
            $inc: {
                rating: -rating,
                count: -1,
            },
        });
    } catch (err) {
        logger.log('error while deleting rating', err);
        throw new Error('delete rating error');
    }
};
