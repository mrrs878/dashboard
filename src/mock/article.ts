import { createMockRes } from '../tools';
import ARTICLE_DATA from './json/article.json';

const BASE_URL = `${process.env.REACT_APP_BASE_URL || ''}/article`;

createMockRes<GetDictsReqT, GetDictsResT>(`${BASE_URL}`, 'get', () => ({
  success: true,
  code: 200,
  msg: '获取成功',
  data: ARTICLE_DATA.article,
}));
