import * as ratingsService from './ratings';
import logger from '../libs/logger';

jest.mock('../libs/logger');
jest.mock('../libs/database', () => {
    const ratings = [
        {
            _id: '5b70946625315ced5b4cea2c',
            productId: '1444',
            __v: 0,
            count: 18,
            rating: 99,
        },
        {
            _id: '5b708fe3c1f830022ec61635',
            productId: '1443',
            __v: 0,
            count: 18,
            rating: 97,
        },
    ];
    return {
        model: jest.fn().mockReturnValue({
            find: jest.fn().mockResolvedValue(ratings[0]),
            findOne: jest.fn().mockResolvedValue(ratings[0]),
            findById: jest.fn().mockResolvedValue(ratings[0]),
            create: jest.fn().mockResolvedValue(ratings[0]),
            findByIdAndUpdate: jest.fn().mockResolvedValue(ratings[1]),
            findOneAndUpdate: jest.fn().mockResolvedValue(ratings[1]),
            findByIdAndRemove: jest.fn().mockResolvedValue(ratings[1]),
        }),
    };
});

test('should retrieve rating', async () => {
    const filters = {
        productId: '1444',
    };
    const ratings = await ratingsService.getRatings({ filters });
    logger.log.mockReturnValue();
    expect(logger.log).toBeCalled();
    expect(ratings.count).toBe(18);
    expect(ratings.rating).toBe(99);
});

test('should update rating', async () => {
    const review = {
        productId: '1444',
        rating: 2,
    };
    const ratings = await ratingsService.updateRating({ review });
    logger.log.mockReturnValue();
    expect(logger.log).toBeCalled();
    expect(ratings.count).toBe(18);
    expect(ratings.rating).toBe(97);
});

test('should delete rating', async () => {
    const review = {
        productId: '1444',
        rating: 2,
    };
    const ratings = await ratingsService.updateRating({ review });
    logger.log.mockReturnValue();
    expect(logger.log).toBeCalled();
    expect(ratings.count).toBe(18);
    expect(ratings.rating).toBe(97);
});
