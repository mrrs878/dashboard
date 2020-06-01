import { Context, Next } from 'koa';

const Koa = require('koa');
const body = require('koa-body');
const bodyParser = require('koa-bodyparser');
const router = require('./router');

const app = new Koa();

app.use(body());
app.use(bodyParser());
app.use(async (ctx: Context, next: Next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200;
  } else {
    await next();
  }
});
app.use(router.routes());

app.listen(process.env.REACT_APP_SERVER_PORT, () => {
  console.log(`server is running on ${process.env.REACT_APP_SERVER_PORT}`);
});

export {};
