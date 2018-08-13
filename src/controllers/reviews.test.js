import status from 'http-status';
import * as reviewsHandler from './reviews';

test('should retrieve reviews', async () => {
    const ctx = {
        state: {
            reviewsService: {
                getReviews: jest.fn().mockResolvedValue([
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
                        userId: '1232',
                        productId: '1444',
                        rating: 5,
                        review: 'awesome',
                        __v: 0,
                    },
                ]),
            },
        },
    };
    await reviewsHandler.getReviews(ctx);
    expect(ctx.status).toBe(status.OK);
    expect(ctx.body.length).toBe(2);
});

test('should add review', async () => {
    const ctx = {
        request: {
            body: {
                userId: '1234',
                productId: '900',
                rating: 5,
                review: 'good',
            },
        },
        state: {
            ratingsService: {
                updateRating: jest.fn().mockResolvedValue(),
            },
            reviewsService: {
                postReview: jest.fn().mockResolvedValue({
                    _id: '5b708fe2c1f830022ec61633',
                    userId: '1232',
                    productId: '1444',
                    rating: 5,
                    review: 'awesome',
                    __v: 0,
                }),
            },
        },
        set: jest.fn().mockReturnValue(),
    };
    await reviewsHandler.postReview(ctx);
    expect(ctx.status).toBe(status.CREATED);
    // eslint-disable-next-line
    expect(ctx.body._id).toBe('5b708fe2c1f830022ec61633');
});

test('should get review by id', async () => {
    const ctx = {
        params: {
            id: '5b708fe2c1f830022ec61633',
        },
        state: {
            reviewsService: {
                getReviewById: jest.fn().mockResolvedValue({
                    _id: '5b708fe2c1f830022ec61633',
                    userId: '1232',
                    productId: '1444',
                    rating: 5,
                    review: 'awesome',
                    __v: 0,
                }),
            },
        },
    };
    await reviewsHandler.getReviewById(ctx);
    expect(ctx.status).toBe(status.OK);
    // eslint-disable-next-line
    expect(ctx.body._id).toBe('5b708fe2c1f830022ec61633');
});

test('should delete review by id', async () => {
    const ctx = {
        params: {
            id: '5b708fe2c1f830022ec61633',
        },
        state: {
            ratingsService: {
                deleteRating: jest.fn().mockResolvedValue(),
            },
            reviewsService: {
                deleteReviewById: jest.fn().mockResolvedValue(),
                getReviewById: jest.fn().mockResolvedValue({
                    _id: '5b708fe2c1f830022ec61633',
                    userId: '1232',
                    productId: '1444',
                    rating: 5,
                    review: 'awesome',
                    __v: 0,
                }),
            },
        },
    };
    await reviewsHandler.deleteReviewById(ctx);
    expect(ctx.status).toBe(status.NO_CONTENT);
});

test('should update review by id', async () => {
    const ctx = {
        params: {
            id: '5b708fe2c1f830022ec61633',
        },
        request: {
            body: {
                rating: 4,
                review: 'good',
            },
        },
        state: {
            ratingsService: {
                updateRating: jest.fn().mockResolvedValue(),
            },
            reviewsService: {
                updateReviewById: jest.fn().mockResolvedValue(),
                getReviewById: jest.fn().mockResolvedValue({
                    _id: '5b708fe2c1f830022ec61633',
                    userId: '1232',
                    productId: '1444',
                    rating: 5,
                    review: 'awesome',
                    __v: 0,
                }),
            },
        },
        set: jest.fn().mockReturnValue(),
    };
    await reviewsHandler.updateReviewById(ctx);
    expect(ctx.status).toBe(status.NO_CONTENT);
});
