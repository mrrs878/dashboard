import ajax from '../tools/ajax';

const BASE_URL = `${process.env.REACT_APP_BASE_URL || ''}/dashboard`;

export const GET_DASHBOARD_DATA = (): Promise<GetDashboardDataResI> => ajax.get(`${BASE_URL}`);
