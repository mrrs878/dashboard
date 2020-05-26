import { Context } from "koa";
const AUTH_DATA = require("../json/auth.json");
const USER_DATA = require("../json/user.json");

exports.login = async (ctx: Context) => {
    const { body } = ctx
    let data = null
    switch (body.name) {
        case 'admin':
            data = body.password === 'admin888' ? USER_DATA.admin : USER_DATA.guest;
            break;
        case 'people':
            data = body.password === 'people' ? USER_DATA.admin : USER_DATA.guest;
            break;
        default:
            data = USER_DATA.guest;
    }
    ctx.body = {
        success: true,
        code: 200,
        msg: '登录成功',
        data,
    };
}
exports.getMenu = async (ctx: Context) => {
    const token = ctx.req.headers.authorization ?? 'guest'
    ctx.body = {
        success: true,
        code: 200,
        msg: '获取成功',
        data: AUTH_DATA[token],
    }
}
