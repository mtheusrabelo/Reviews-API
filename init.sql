CREATE TABLE reviews (
    id SERIAL NOT NULL,
    productId INT NOT NULL,
    rating INT NOT NULL,
    comment VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedAt TIMESTAMP,
    deletedAt TIMESTAMP
);
