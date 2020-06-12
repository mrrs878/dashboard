import { createMockRes } from '../tools';
import DICT_DATA from './json/dict.json';

const BASE_URL = `${process.env.REACT_APP_BASE_URL || ''}`;

createMockRes<GetDictsReqT, GetDictsResT>(`${BASE_URL}/dict`, 'get', () => ({
  success: true,
  code: 200,
  msg: '获取成功',
  data: DICT_DATA.dict,
}));

createMockRes<GetDictReqT, GetDictResT>(new RegExp(`${BASE_URL}/dict/\\d+`), 'get', (req) => {
  // @ts-ignore
  const id: number = req.url.match(/(\d+)$/)[0];
  return ({
    success: true,
    code: 200,
    msg: '获取成功',
    data: DICT_DATA.dict[id],
  });
});
