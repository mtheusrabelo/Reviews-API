const { Sequelize } = require('sequelize');

const database = ({ config }) => {
    const { connectionString, pool } = config.database;
    return new Sequelize(connectionString, { pool });
};

module.exports = database;
