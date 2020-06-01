import { Context } from 'koa';

const USER_DATA = require('../json/user.json');

exports.getUserInfo = (ctx: Context) => {
  const { authorization } = ctx.req.headers;
  const data = USER_DATA[authorization || ''] || USER_DATA.guest;
  ctx.body = {
    success: true,
    code: 200,
    msg: '获取成功',
    data,
  };
};
