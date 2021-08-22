const awilix = require('awilix');
const { Lifetime } = require('awilix');

// graphQL
const graphQL = require('./graphql');

// controllers
const healthcheckController = require('./controllers/healthcheck');
const reviewsController = require('./controllers/reviews');

// middlewares
const validatorMiddleware = require('./middlewares/validator');

// services
const healthcheckService = require('./services/healthcheck');
const reviewsService = require('./services/reviews');

// utils
const database = require('./utils/database');
const cache = require('./utils/cache');
const logger = require('./utils/logger');
const config = require('./utils/config');

// models
const models = require('./models');

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
});

const setup = () => {
    container.register({
        // graphQL
        graphQL: awilix.asFunction(graphQL, { lifetime: Lifetime.SINGLETON }),

        // controllers
        healthcheckController: awilix.asFunction(healthcheckController, { lifetime: Lifetime.SINGLETON }),
        reviewsController: awilix.asFunction(reviewsController, { lifetime: Lifetime.SINGLETON }),

        // middlewares
        validatorMiddleware: awilix.asFunction(validatorMiddleware, { lifetime: Lifetime.SINGLETON }),

        // services
        healthcheckService: awilix.asFunction(healthcheckService, { lifetime: Lifetime.SINGLETON }),
        reviewsService: awilix.asFunction(reviewsService, { lifetime: Lifetime.SINGLETON }),

        // utils
        cache: awilix.asFunction(cache, { lifetime: Lifetime.SINGLETON }),
        logger: awilix.asFunction(logger, { lifetime: Lifetime.SINGLETON }),
        config: awilix.asFunction(config, { lifetime: Lifetime.SINGLETON }),
        database: awilix.asFunction(database, { lifetime: Lifetime.SINGLETON }),

        // models
        models: awilix.asFunction(models, { lifetime: Lifetime.SINGLETON })
    });
};

module.exports = {
    container,
    setup
};
