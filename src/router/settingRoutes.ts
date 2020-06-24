import React from 'react';

const DICT = React.lazy(() => import('../views/setting/dict'));
const DICT_DETAIL = React.lazy(() => import('../views/setting/dict/detail'));
const MENU_SETTING = React.lazy(() => import('../views/setting/menu'));

const SETTING_ROUTES_MAP = {
  setting: '/setting',
  dict: '/setting/dict',
  menuSetting: '/setting/menu',
};

const SETTING_ROUTES: Array<RouteConfigI> = [
  {
    path: SETTING_ROUTES_MAP.dict,
    component: DICT,
  },
  {
    path: `${SETTING_ROUTES_MAP.dict}/:id`,
    component: DICT_DETAIL,
  },
  {
    path: SETTING_ROUTES_MAP.menuSetting,
    component: MENU_SETTING,
  },
];

export {
  SETTING_ROUTES,
  SETTING_ROUTES_MAP,
};
