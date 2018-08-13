import status from 'http-status';

export const getHealthcheck = async (ctx) => {
    ctx.status = status.OK;
    ctx.body = 'UP';
};
