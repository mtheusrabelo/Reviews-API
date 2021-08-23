const fromReview = ({
    productId,
    createdAt,
    updatedAt,
    deletedAt,
    rating,
    comment
}) => ({
    productid: productId,
    createdat: createdAt,
    updatedat: updatedAt,
    deletedat: deletedAt,
    comment,
    rating
});

const toReview = ({
    productid,
    createdat,
    updatedat,
    deletedat,
    rating,
    comment,
    id
}) => ({
    productId: productid,
    createdAt: createdat,
    updatedAt: updatedat,
    deletedAt: deletedat,
    comment,
    rating,
    id
});

module.exports = {
    fromReview,
    toReview
};
