const dayjs = require('dayjs');
const { toReview, fromReview } = require('../../src/resolvers/model');

const createdAt = dayjs().format();
const updatedAt = dayjs().format();
const deletedAt = dayjs().format();

const to = {
    productId: 2,
    rating: 5,
    comment: 'comment',
    createdAt,
    updatedAt,
    deletedAt
};

const from = {
    productid: 2,
    rating: 5,
    comment: 'comment',
    createdat: createdAt,
    updatedat: updatedAt,
    deletedat: deletedAt
};

test('should be resolve model to review', async () => {
    const review = toReview(from);
    expect(review).toStrictEqual(to);
});

test('should be resolve model from review', async () => {
    const review = fromReview(to);
    expect(review).toStrictEqual(from);
});
