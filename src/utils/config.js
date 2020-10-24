const config = {
    port: Number(process.env.PORT) || 80,
    cache: {
        url: process.env.REDIS_URL
    },
    database: {
        connectionString: process.env.DATABASE_CONNECTION_STRING,
        pool: {
            min: Number(process.env.DATABASE_POOL_MIN) || 1,
            max: Number(process.env.DATABASE_POOL_MAX) || 5,
            acquire: Number(process.env.DATABASE_POOL_ACQUIRE_MS) || 30000,
            idle: Number(process.env.DATABASE_POOL_IDLE_MS) || 10000
        }
    }
};

module.exports = () => config;
