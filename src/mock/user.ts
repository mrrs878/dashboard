import { createMockRes } from '../tools';

const BASE_URL = `${process.env.REACT_APP_BASE_URL || ''}/user`;

createMockRes<any, GetInfoByTokenResI>(`${BASE_URL}`, 'get', () => ({
  success: true,
  code: 200,
  msg: '获取成功',
  data: {
    name: 'zhangsan',
    accessToken: 'asdfghkjl',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
}));
