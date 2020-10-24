const util = require('util');
const status = require('http-status');
const dayjs = require('dayjs');

const getLiveness = ({ logger, healthcheckService }) => async (ctx) => {
    try {
        await healthcheckService.isLive();
        ctx.status = status.OK;
        ctx.body = dayjs().format();
        logger.debug('liveness ok');
        return;
    } catch (err) {
        ctx.status = status.INTERNAL_SERVER_ERROR;
        ctx.body = util.inspect(err);
    }
};

const getReadiness = ({ logger, healthcheckService }) => async (ctx) => {
    try {
        await healthcheckService.isReady();
        ctx.status = status.OK;
        ctx.body = dayjs().format();
        logger.debug('readiness ok');
    } catch (err) {
        ctx.status = status.INTERNAL_SERVER_ERROR;
        ctx.body = util.inspect(err);
    }
};

module.exports = (args) => ({
    getLiveness: getLiveness(args),
    getReadiness: getReadiness(args)
});
