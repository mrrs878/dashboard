import MAIN_CONFIG from '../config';
import store, { actions } from '../store';
import { GET_DICTS } from '../api/setting';

const dictModule = {
  async getDict() {
    try {
      const res = await GET_DICTS();
      if (!res.success) return;
      await store.dispatch({ type: actions.UPDATE_DICTS, data: res.data });
    } catch (e) {
      console.log(e);
    }
  },
};

export default dictModule;
