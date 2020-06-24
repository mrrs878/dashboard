import apis from '../api';
import store, { actions } from '../store';
import MAIN_CONFIG from '../config';

const { LOGIN, LOGOUT, GET_MENUS } = apis;

const routes: Array<string> = [];
const menuTitles: DynamicObjectKey<string> = {};

function walkMenu(menuItem: MenuItemI) {
  if (menuItem.path) {
    routes.push(menuItem.path);
    menuTitles[menuItem.path] = menuItem.title;
  }
  if (!menuItem.children) return;
  menuItem.children.forEach((item) => walkMenu(item));
}

export default {
  async login(data: LoginReqI) {
    try {
      const res = await LOGIN(data);
      console.log(res);
      if (!res.success) return;
      localStorage.setItem(MAIN_CONFIG.TOKEN_NAME, res.data.accessToken);
      store.dispatch({ type: actions.UPDATE_USER, data: res.data });
    } catch (e) {
      console.log(e);
    }
  },
  async logout(): Promise<ModuleResultI<string>> {
    try {
      const res = await LOGOUT();
      console.log(res);
      if (!res.success) {
        return {
          success: true,
          msg: res.msg,
        };
      }
      localStorage.removeItem(MAIN_CONFIG.TOKEN_NAME);
      store.dispatch({ type: actions.CLEAR_USER, data: '' });
      return {
        success: true,
        msg: '退出登陆成功',
      };
    } catch (e) {
      console.log(e);
      return {
        success: true,
        msg: '出错了',
      };
    }
  },
  async getMenu() {
    try {
      const res = await GET_MENUS();
      if (!res.success) return;
      res.data.forEach((item) => walkMenu(item));
      store.dispatch({ type: actions.UPDATE_MENU, data: res.data });
      store.dispatch({ type: actions.UPDATE_ROUTES, data: routes });
      store.dispatch({ type: actions.UPDATE_MENU_TITLES, data: menuTitles });
    } catch (e) {
      console.log(e);
    }
  },
};
