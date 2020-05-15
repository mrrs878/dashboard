import apis from '../apis';
import store, { actions } from '../store';

const { GET_INFO_BY_TOKEN } = apis;

export default {
  async getInfoByToken() {
    try {
      const res = await GET_INFO_BY_TOKEN();
      console.log(res);
      if (!res.success) return;
      store.dispatch({ type: actions.UPDATE_USER, data: res.data });
    } catch (e) {
      console.log(e);
    }
  },
};
