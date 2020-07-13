import User from '../model/User';

export const DEFAULT_COMMON_STATE: CommonStateI = {
  count: 0,
  user: new User(),
  menu: [],
  menuArray: [],
  menuRoutes: {},
  dicts: [],
  menuTitles: {},
  fullScreen: false,
  articles: [],
};
