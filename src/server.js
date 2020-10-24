require('dotenv').config();
require('./injector').setup();

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const helmet = require('koa-helmet');
const router = require('./router');
const { container } = require('./injector');

const config = container.resolve('config');
const app = new Koa();

app
  .use(helmet())
  .use(bodyParser({ enableTypes: ['json'] }))
  .use(router.routes());

app.listen(config.port, () => console.log(`Listening on ${config.port}`));
