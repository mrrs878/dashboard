import ajax from '../tools/ajax';

const BASE_URL = `${process.env.REACT_APP_BASE_URL || ''}/article`;

export const GET_ARTICLES = (): Promise<GetArticlesResI> => ajax.get(`${BASE_URL}`);
