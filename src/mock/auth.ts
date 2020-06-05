import { createMockRes } from '../tools';
import AUTH_DATA from './json/auth.json';
import USER_DATA from './json/user.json';

const BASE_URL = `${process.env.REACT_APP_BASE_URL || ''}/auth`;

createMockRes<LoginReqI, LoginResI>(`${BASE_URL}/login`, 'post', (req) => {
  let data = null;
  switch (req?.body.name) {
    case 'admin':
      data = req?.body.password === 'admin888' ? USER_DATA.admin : USER_DATA.guest;
      break;
    case 'people':
      data = req?.body.password === 'people' ? USER_DATA.admin : USER_DATA.guest;
      break;
    default:
      data = USER_DATA.guest;
  }
  return {
    success: true,
    code: 200,
    msg: '登录成功',
    data,
  };
});
createMockRes<GetMenuReqI, GetMenuResI>(`${BASE_URL}/menu`, 'get', () => ({
  success: true,
  code: 200,
  msg: '获取成功',
  data: AUTH_DATA.admin,
}));
createMockRes<any, LogoutResI>(`${BASE_URL}/logout`, 'post', () => ({
  success: true,
  code: 200,
  msg: '退出登录成功',
  data: {},
}));
