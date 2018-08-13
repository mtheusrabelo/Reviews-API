import * as reviewsService from './reviews';
import logger from '../libs/logger';

jest.mock('../libs/logger');
jest.mock('../libs/database', () => {
    const reviews = [
        {
            _id: '5b708be8bb44d7003cc2a3f5',
            userId: '1232',
            productId: '1444',
            rating: 5,
            review: 'awesome',
            __v: 0,
        },
        {
            _id: '5b708fe2c1f830022ec61633',
            userId: '1233',
            productId: '1444',
            rating: 5,
            review: 'great',
            __v: 0,
        },
        {
            _id: '5b708fe3c1f830022ec61635',
            userId: '990',
            productId: '1444',
            rating: 4,
            review: 'good',
            __v: 0,
        },
    ];
    return {
        startSession: jest.fn().mockResolvedValue({
            startTransaction: jest.fn().mockResolvedValue(),
            commitTransaction: jest.fn().mockResolvedValue(),
            endSession: jest.fn().mockResolvedValue(),
        }),
        model: jest.fn().mockReturnValue({
            find: jest.fn().mockResolvedValue(reviews),
            findOne: jest.fn().mockResolvedValue(reviews[0]),
            findById: jest.fn().mockResolvedValue(reviews[0]),
            create: jest.fn().mockResolvedValue(reviews[0]),
            findByIdAndUpdate: jest.fn().mockResolvedValue(reviews[1]),
            findOneAndUpdate: jest.fn().mockResolvedValue(reviews[1]),
            findByIdAndRemove: jest.fn().mockResolvedValue(reviews[1]),
        }),
    };
});

const ratings = [
    {
        _id: '5b7123a6a290d06adb8f9cb5',
        productId: '1003',
        __v: 0,
        count: 5,
        rating: 20,
    },
    {
        _id: '5b7123a6a290d06adb8f9cb5',
        productId: '1010',
        __v: 0,
        count: 6,
        rating: 25,
    },
];

const ratingsServiceMock = {
    getRatings: jest.fn().mockResolvedValue(ratings[0]),
    updateRating: jest.fn().mockResolvedValue(ratings[1]),
    deleteRating: jest.fn().mockResolvedValue(ratings[1]),
};

test('should retrieve reviews', async () => {
    const filters = {
        productId: '1444',
    };
    const reviews = await reviewsService.getReviews({ filters });
    logger.log.mockReturnValue();
    expect(logger.log).toBeCalled();
    expect(reviews.length).toBe(3);
});

test('should add review', async () => {
    const reviewToAdd = {
        userId: '1232',
        productId: '1444',
        rating: 5,
        review: 'awesome',
    };
    logger.log.mockReturnValue();
    const review = await reviewsService.postReview({
        review: reviewToAdd, ratingsService: ratingsServiceMock,
    });
    expect(logger.log).toBeCalled();
    expect(review.rating).toBe(5);
});

test('should get review by id', async () => {
    const id = '5b708fe2c1f830022ec61633';
    const review = await reviewsService.getReviewById({ id });
    logger.log.mockReturnValue();
    expect(logger.log).toBeCalled();
    expect(review.review).toBe('awesome');
});

test('should delete review by id', async () => {
    const id = '5b708fe2c1f830022ec61633';
    const review = await reviewsService.deleteReviewById({
        id, ratingsService: ratingsServiceMock,
    });
    logger.log.mockReturnValue();
    expect(logger.log).toBeCalled();
    expect(review.review).toBe('awesome');
});

test('should update review by id', async () => {
    const id = '5b708fe2c1f830022ec61633';
    const prevReview = {
        rating: 4,
        review: 'good',
    };
    const update = {
        rating: 5,
        review: 'great',
    };
    const review = await reviewsService.updateReviewById({
        id, review: update, prevReview, ratingsService: ratingsServiceMock,
    });
    logger.log.mockReturnValue();
    expect(logger.log).toBeCalled();
    expect(review.review).toBe('great');
});
