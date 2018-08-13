import status from 'http-status';
import * as healthcheckHandler from './healthcheck';

test('should return up', async () => {
    const ctx = {};
    await healthcheckHandler.getHealthcheck(ctx);
    expect(ctx.status).toBe(status.OK);
    expect(ctx.body).toBe('UP');
});
