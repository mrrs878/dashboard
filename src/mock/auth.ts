import { createMockRes } from '../tools';

const BASE_URL = `${process.env.REACT_APP_BASE_URL || ''}/auth`;

createMockRes<LoginReqI, LoginResI>(`${BASE_URL}/login`, 'post', () => ({
  success: true,
  code: 200,
  msg: '登录成功',
  data: {
    name: 'zhangsan',
    accessToken: 'asdfghkjl',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
}));
createMockRes<any, LogoutResI>(`${BASE_URL}/logout`, 'post', () => ({
  success: true,
  code: 200,
  msg: '退出登录成功',
  data: {},
}));
