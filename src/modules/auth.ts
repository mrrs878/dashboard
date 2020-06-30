import { clone } from 'ramda';
import apis from '../api';
import store, { actions } from '../store';
import MAIN_CONFIG from '../config';

const { LOGIN, LOGOUT, GET_MENUS } = apis;

function menuArray2Tree(src: Array<MenuItemI>) {
  const res: Array<MenuItemI> = [];
  clone<Array<MenuItemI>>(src).forEach((item) => {
    const parent = res.find((_item) => _item.key === item.parent);
    if (parent) {
      parent.children = parent.children || [];
      parent.children?.push(item);
    } else res.push(item);
  });
  return res;
}

function getMenuTitles(src: Array<MenuItemI>) {
  const menuTitles: DynamicObjectKey<string> = {};
  src.forEach((item) => {
    menuTitles[item.path] = item.title;
  });
  return menuTitles;
}

function getMenuRoutes(src: Array<MenuItemI>) {
  const menuRoutes: DynamicObjectKey<string> = {};
  src.forEach((item) => {
    menuRoutes[item.key] = item.path;
  });
  return menuRoutes;
}

const AUTH_MODULE = {
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
  generateMenuTree(src: Array<MenuItemI>) {
    store.dispatch({ type: actions.UPDATE_MENU, data: menuArray2Tree(src) });
  },
  async getMenu() {
    try {
      const res = await GET_MENUS();
      if (!res.success) return;
      store.dispatch({ type: actions.UPDATE_MENU_TITLES, data: getMenuTitles(res.data) });
      store.dispatch({ type: actions.UPDATE_MENU_ROUTES, data: getMenuRoutes(res.data) });
      this.generateMenuTree(res.data);
    } catch (e) {
      console.log(e);
    }
  },
};

export default AUTH_MODULE;
