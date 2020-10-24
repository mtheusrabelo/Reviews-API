const Joi = require('joi');
const validator = require('../../src/middlewares/validator');

const schema = Joi.object({
    params: Joi.object({
        id: Joi.number()
            .integer()
            .required()
    }),

    query: Joi.object({}),

    body: Joi.object({})
});

test('should be call next middleware', async () => {
    const validate = validator()(schema);
    const ctx = {
        params: { id: 5 },
        request: {
            query: {},
            body: {}
        },
        throw: jest.fn()
    };
    const next = jest.fn();

    await validate(ctx, next);

    expect(next).toHaveBeenCalled();
    expect(ctx.throw).not.toHaveBeenCalled();
});

test('should be throw error', async () => {
    const validate = validator()(schema);
    const ctx = {
        params: {},
        request: {
            query: { field: 1 },
            body: {}
        },
        throw: jest.fn()
    };
    const next = jest.fn();

    await validate(ctx, next);

    expect(next).not.toHaveBeenCalled();
    expect(ctx.throw).toHaveBeenCalled();
});
