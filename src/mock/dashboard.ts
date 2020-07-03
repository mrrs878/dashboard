import { createMockRes } from '../tools';
import DASHBOARD_DATA from './json/dashboard.json';

const BASE_URL = `${process.env.REACT_APP_BASE_URL || ''}/dashboard`;

createMockRes<GetDashboardDataReqI, GetDashboardDataResI>(`${BASE_URL}`, 'get', () => ({
  success: true,
  code: 200,
  msg: '获取成功',
  data: DASHBOARD_DATA,
}));
