import apis from '../apis';
import store, { actions } from '../store';

const { GET_INFO_BY_TOKEN, LOGIN } = apis;

export default {
  async getInfoByToken() {
    try {
      const res = await GET_INFO_BY_TOKEN();
      if (!res.success) return;
      store.dispatch({ type: actions.UPDATE_USER, data: res.data });
    } catch (e) {
      console.log(e);
    }
  },
  async login(data: LoginReqI): Promise<ModuleResI> {
    try {
      const res = await LOGIN(data);
      if (!res.success) {
        return {
          success: false,
          msg: res.msg,
        };
      }
      console.log(res);
      store.dispatch({ type: actions.UPDATE_USER, data: res.data });
      return {
        success: true,
        msg: '登陆成功',
      };
    } catch (e) {
      console.log(e);
      return {
        success: false,
        msg: e.message,
      };
    }
  },
};
