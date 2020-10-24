const status = require('http-status');
const reviewsController = require('../../src/controllers/reviews');

const logger = {
    debug: jest.fn()
};

const review = {
    productId: 123,
    rating: 10,
    comment: 'comment'
};

const pagination = {
    page: 2,
    pageSize: 3,
    count: 4,
    totalPages: 5
};

const reviewsService = {
    getAll: jest.fn().mockResolvedValue({ data: [review], pagination }),
    getById: jest.fn().mockResolvedValue(review),
    add: jest.fn().mockResolvedValue(review),
    update: jest.fn().mockResolvedValue(review),
    remove: jest.fn().mockResolvedValue(true),
};

test('should be able to get review by id', async () => {
    const reviews = reviewsController({ logger, reviewsService });
    const ctx = { params: { id: 5 }};

    await reviews.get(ctx);

    expect(ctx.status).toBe(status.OK);
    expect(ctx.body).toStrictEqual({ data: review });
});

test('should be able to add review', async () => {
    const reviews = reviewsController({ logger, reviewsService });
    const ctx = {
        request: {
            body: {
                productId: 2,
                rating: 10,
                comment: 'comment'
            }
        }
    };

    await reviews.post(ctx);

    expect(ctx.status).toBe(status.CREATED);
    expect(ctx.body).toStrictEqual({ data: review });
});

test('should be able to update review', async () => {
    const reviews = reviewsController({ logger, reviewsService });
    const ctx = {
        params: { id: 5 },
        request: {
            body: {
                productId: 2,
                rating: 10,
                comment: 'comment'
            }
        }
    };

    await reviews.put(ctx);

    expect(ctx.status).toBe(status.ACCEPTED);
    expect(ctx.body).toStrictEqual({ data: review });
});

test('should be able to remove review', async () => {
    const reviews = reviewsController({ logger, reviewsService });
    const ctx = { params: { id: 5 } };

    await reviews.remove(ctx);

    expect(ctx.status).toBe(status.ACCEPTED);
});
