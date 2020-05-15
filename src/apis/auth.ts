import ajax from '../tools/ajax';

const BASE_URL = `${process.env.REACT_APP_BASE_URL || ''}/auth`;

export const LOGIN = (data: LoginReqI): Promise<LoginResI> => ajax.post(`${BASE_URL}/login`, data);
export const LOGOUT = (): Promise<LoginResI> => ajax.post(`${BASE_URL}/logout`);
