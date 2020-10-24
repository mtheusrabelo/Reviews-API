const { Model, DataTypes } = require('sequelize');

class Review extends Model {}

const review = ({ database }) => {
    const modelName = 'reviews';

    Review.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            productid: DataTypes.INTEGER,
            rating: DataTypes.INTEGER,
            comment: DataTypes.STRING,
            createdat: DataTypes.DATE,
            updatedat: DataTypes.DATE,
            deletedat: DataTypes.DATE
        },
        {
            sequelize: database,
            freezeTableName: true,
            paranoid: true,
            createdAt: 'createdat',
            updatedAt: 'updatedat',
            deletedAt: 'deletedat',
            modelName
        }
    );

    return Review;
};

module.exports = review;
