import { createMockRes } from '../tools';
import USER_DATA from './json/user.json';

const BASE_URL = `${process.env.REACT_APP_BASE_URL || ''}/user`;

createMockRes<any, GetInfoByTokenResI>(`${BASE_URL}`, 'get', () => ({
  success: true,
  code: 200,
  msg: '获取成功',
  data: USER_DATA.guest,
}));
