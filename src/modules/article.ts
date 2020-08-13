import apis from '../api';
import store, { actions } from '../store';

const { GET_ARTICLES } = apis;

const ARTICLE_MODULE = {
  async getArticle() {
    try {
      const res = await GET_ARTICLES();
      console.log(res);
      if (!res.success) return;
      store.dispatch({ type: actions.UPDATE_ARTICLES, data: res.data });
    } catch (e) {
      console.log(e);
    }
  },
};

export default ARTICLE_MODULE;
