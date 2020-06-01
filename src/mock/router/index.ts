const Router = require('koa-router');
const authHandlers = require('../controller/auth');
const userHandlers = require('../controller/user');

const router = new Router();
router.prefix('/api');

router.post('/auth/login', authHandlers.login);
router.get('/auth/menu', authHandlers.getMenu);
router.get('/user', userHandlers.getUserInfo);

module.exports = router;

export {};
