import ajax from '../tools/ajax';

const BASE_URL = `${process.env.REACT_APP_BASE_URL || ''}`;

export const GET_DICTS = (): Promise<GetDictsResT> => ajax.get(`${BASE_URL}/dict`);
export const GET_DICT = (data: GetDictReqT): Promise<GetDictResT> => ajax.get(`${BASE_URL}/dict/${data.id}`);
export const UPDATE_DICT = (data: UpdateDictReqT): Promise<GetDictResT> => ajax.put(`${BASE_URL}/dict`, data);
export const CREATE_DICT = (data: CreateDictReqT): Promise<GetDictResT> => ajax.post(`${BASE_URL}/dict`, data);
export const DELETE_DICT = (data: DeleteDictReqT): Promise<GetDictResT> => ajax.delete(`${BASE_URL}/dict${data.id}`);
