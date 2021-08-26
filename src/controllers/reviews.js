const status = require('http-status');

const getAll = ({ reviewsService }) => async (ctx) => {
    const { page, pageSize } = ctx.request.query;
    const { data, pagination } = await reviewsService
        .getAll({ page, pageSize, showPagination: true });

    ctx.status = status.OK;
    ctx.body = {
        data,
        pagination
    };
};

const get = ({ reviewsService }) => async (ctx) => {
    const { id } = ctx.params;
    const review = await reviewsService.getById({ id });

    if (!review) {
        ctx.status = status.NOT_FOUND;
        return;
    }

    ctx.status = status.OK;
    ctx.body = {
        data: review
    };
};

const post = ({ reviewsService }) => async (ctx) => {
    const { productId, rating, comment } = ctx.request.body;
    const addedReview = await reviewsService.add({ productId, rating, comment });

    ctx.status = status.CREATED;
    ctx.body = {
        data: addedReview
    };
};

const put = ({ reviewsService }) => async (ctx) => {
    const { id } = ctx.params;
    const { productId, rating, comment } = ctx.request.body;
    const updatedReview = await reviewsService.update(
        { id },
        { productId, rating, comment }
    );

    ctx.status = status.ACCEPTED;
    ctx.body = {
        data: updatedReview
    };
};

const remove = ({ reviewsService }) => async (ctx) => {
    const { id } = ctx.params;
    const removedReview = await reviewsService.remove({ id });

    if (!removedReview) {
        ctx.status = status.NOT_FOUND;
        return;
    }

    ctx.status = status.ACCEPTED;
};

module.exports = (args) => ({
    getAll: getAll(args),
    get: get(args),
    post: post(args),
    put: put(args),
    remove: remove(args)
});
