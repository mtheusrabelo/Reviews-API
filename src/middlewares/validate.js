import Joi from 'joi';
import status from 'http-status';
import logger from '../libs/logger';

const targetValidate = ({ schema, target }) => {
    const validations = [];
    Object.keys(schema)
        .forEach((field) => {
            const value = schema[field];
            if (field === 'params') target = target.ctx;
            const validation = Joi.validate(target[field], value, { abortEarly: false });
            if (validation && validation.error) {
                const { message } = validation.error;
                validations.push({ field, message });
            }
        });
    return validations;
};

const requestValidate = ({ schema, ctx }) => {
    const validations = targetValidate({ schema: schema.request, target: ctx.request });
    if (validations.length !== 0) {
        ctx.status = status.BAD_REQUEST;
        ctx.body = {
            error: 'Request validation error',
            validations,
        };
        logger.log('Request validation error', { validations });
        return false;
    }
    return true;
};

export default ({ schema }) => async (ctx, next) => {
    const valid = requestValidate({ schema, ctx });
    if (valid) {
        await next();
    }
};
