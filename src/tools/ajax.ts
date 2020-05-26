import axios from 'axios';
import { clone } from 'ramda';
import MAIN_CONFIG from '../config';

const instance = axios.create({
  timeout: 12000,
});

instance.interceptors.request.use((config) => {
  const tmp = clone(config);
  tmp.headers.Authorization = `${localStorage.getItem(MAIN_CONFIG.TOKEN_NAME)}`;
  return tmp;
});
instance.interceptors.response.use((response) => {
  if (response.status !== 200) return Promise.resolve(response.status);
  if (response.data.msg === 'token已过期') {
    localStorage.removeItem(MAIN_CONFIG.TOKEN_NAME);
  }
  return Promise.resolve(response.data);
}, (error: Error) => {
  console.log(error);
  return Promise.resolve(error);
});

export default instance;
