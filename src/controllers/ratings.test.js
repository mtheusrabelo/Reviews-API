import status from 'http-status';
import * as ratingsHandler from './ratings';

test('should retrieve rating', async () => {
    const ctx = {
        query: {
            filters: {
                productId: '1234',
            },
        },
        state: {
            ratingsService: {
                getRatings: jest.fn().mockResolvedValue({
                    _id: '5b70946625315ced5b4cea2c',
                    productId: '1234',
                    __v: 0,
                    count: 18,
                    rating: 99,
                }),
            },
        },
    };
    await ratingsHandler.getRatings(ctx);
    expect(ctx.status).toBe(status.OK);
    // eslint-disable-next-line
    expect(ctx.body._id).toBe('5b70946625315ced5b4cea2c');
});
