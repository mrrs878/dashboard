import { Context } from "koa";

const USER_DATA = require('../json/user.json')

exports.getUserInfo = async (ctx: Context) => {
    const token = ctx.req.headers.authorization ?? 'guest'
    ctx.body = {
        success: true,
        code: 200,
        msg: '获取成功',
        data: USER_DATA[token],
    }
}