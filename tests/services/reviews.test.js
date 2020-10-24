const dayjs = require('dayjs');
const reviewsService = require('../../src/services/reviews');

const createdAt = dayjs().format();
const updatedAt = dayjs().format();
const deletedAt = dayjs().format();

const toReview = {
    productId: 2,
    rating: 5,
    comment: 'comment',
    createdAt,
    updatedAt,
    deletedAt
};

const fromReview = {
    productid: 2,
    rating: 5,
    comment: 'comment',
    createdat: createdAt,
    updatedat: updatedAt,
    deletedat: deletedAt
};

const models = {
    Review: {
        findAndCountAll: jest.fn().mockResolvedValue({ count: 10, rows: [fromReview] }),
        findByPk: jest.fn().mockResolvedValue(fromReview),
        create: jest.fn().mockResolvedValue(fromReview),
        update: jest.fn().mockResolvedValue([null, [fromReview]]),
        destroy: jest.fn().mockResolvedValue([fromReview])
    }
};

test('should be able get reviews with pagination', async () => {
    const reviews = reviewsService({ models });

    const result = await reviews.getAll({ page: 3, pageSize: 4 });

    expect(result).toStrictEqual({ data: [toReview],
        pagination: {
            count: 10,
            page: 3,
            pageSize: 4,
            totalPages: 3,
        }
    });
});

test('should be able get a single review', async () => {
    const reviews = reviewsService({ models });

    const review = await reviews.getById({ id: 3 });

    expect(review).toStrictEqual(toReview);
});

test('should be able add a review', async () => {
    const reviews = reviewsService({ models });

    const review = await reviews.add(toReview);

    expect(review).toStrictEqual(toReview);
});

test('should be able to update a review', async () => {
    const reviews = reviewsService({ models });

    const review = await reviews.update({ id: 3 }, toReview);

    expect(review).toStrictEqual(toReview);
});

test('should be able to remove a review', async () => {
    const reviews = reviewsService({ models });

    const result = await reviews.remove({ id: 3 });

    expect(result).toBe(true);
});
