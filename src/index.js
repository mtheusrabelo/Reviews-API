import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

import router from './router';
import logger from './libs/logger';
import setState from './utils/setState';
import exceptionHandler from './utils/exceptionHandler';
import bodyParserConfig from './utils/bodyParserConfig';

const app = new Koa();
const port = process.env.API_PORT;

app.use(exceptionHandler);
app.use(setState);
app.use(bodyParser(bodyParserConfig));
app.use(router.routes());

app.listen(port);
logger.log('app listening', { port });
