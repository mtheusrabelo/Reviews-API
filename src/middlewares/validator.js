const status = require('http-status');

const validate = () => (schema) => async (ctx, next) => {
    const actual = {
        query: ctx.request.query,
        body: ctx.request.body,
        params: ctx.params
    };

    const validation = schema.validate(actual);
    if (validation.error) {
        const [detail] = validation.error.details;
        ctx.throw(status.BAD_REQUEST, detail.message);
        return;
    }

    await next();
};

module.exports = validate;
