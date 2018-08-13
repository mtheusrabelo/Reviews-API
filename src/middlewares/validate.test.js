import Joi from 'joi';
import status from 'http-status';
import validateMiddleware from './validate';

jest.mock('../libs/logger');

test('should validate request', async () => {
    const ctx = {
        request: {
            query: {
                userId: '129',
            },
        },
    };
    const schema = {
        request: {
            query: {
                productId: Joi.string().required(),
            },
        },
    };
    const next = jest.fn().mockResolvedValue();
    validateMiddleware({ schema })(ctx, next);
    expect(ctx.status).toBe(status.BAD_REQUEST);
});
