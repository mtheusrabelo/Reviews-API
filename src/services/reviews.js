const { fromReview, toReview } = require('../resolvers/model');
const { getLimitAndOffset, mountPagination } = require('../utils/pagination');

const getAll = ({ models }) => async ({ page, pageSize, showPagination }) => {
    const { Review } = models;
    const { limit, offset } = getLimitAndOffset({ page, pageSize });
    const { count, rows } = await Review.findAndCountAll({ limit, offset });

    const data = rows.map(toReview);
    if (showPagination) {
        const pagination = mountPagination({ page, pageSize, count });
        return { data, pagination };
    }

    return data;
};

const getById = ({ models }) => async ({ id }) => {
    const { Review } = models;

    const review = await Review.findByPk(id);

    if (review) {
        return toReview(review);
    }

    return undefined;
};

const add = ({ models }) => async ({ productId, rating, comment }) => {
    const { Review } = models;

    const review = await Review.create(
        fromReview({ productId, rating, comment })
    );

    return toReview(review);
};

const update = ({ models }) => async (
    { id },
    { productId, rating, comment }
) => {
    const { Review } = models;

    const updates = await Review.update(
        { productId, rating, comment },
        { returning: true, where: { id } }
    );

    const [review] = updates[1];

    return toReview({ id, ...review });
};

const remove = ({ models }) => async ({ id }) => {
    const { Review } = models;

    await Review.destroy({ returning: true, where: { id } });

    return undefined;
};

module.exports = (args) => ({
    getAll: getAll(args),
    getById: getById(args),
    add: add(args),
    update: update(args),
    remove: remove(args)
});
