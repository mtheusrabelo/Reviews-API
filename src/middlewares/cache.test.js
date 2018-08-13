import cacheMiddleware from './cache';
import logger from '../libs/logger';
import cache from '../libs/cache';

jest.mock('../libs/logger');
jest.mock('../libs/cache');

test('should cache route', async () => {
    const ctx = {
        request: {
            originalUrl: {
                userId: '/reviews?page=0&limit=100&userId=1232',
            },
        },
    };
    const next = jest.fn().mockResolvedValue();
    logger.log.mockReturnValue();
    cache.set.mockResolvedValue();
    cache.get.mockResolvedValue();
    await cacheMiddleware(ctx, next);
    expect(next).toBeCalled();
    expect(logger.log).toBeCalled();
    expect(cache.set).toBeCalled();
    expect(cache.get).toBeCalled();
});
