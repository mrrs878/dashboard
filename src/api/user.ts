import ajax from '../tools/ajax';

const BASE_URL = `${process.env.REACT_APP_BASE_URL || ''}/user`;

export const GET_INFO_BY_TOKEN = (): Promise<GetInfoByTokenResI> => ajax.get(`${BASE_URL}`);
