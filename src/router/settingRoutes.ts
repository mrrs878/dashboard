import React from 'react';

const DICT = React.lazy(() => import('../views/setting/dict'));
const DICT_DETAIL = React.lazy(() => import('../views/setting/dict/detail'));

const SETTING_ROUTES_MAP = {
  setting: '/setting',
  dict: '/setting/dict',
};

const SETTING_ROUTES_TITLE = {
  setting: '设置',
  dict: '字典管理',
  dictDetail: '字段详情',
};

const SETTING_ROUTES: Array<RouteConfigI> = [
  {
    path: SETTING_ROUTES_MAP.dict,
    component: DICT,
    title: SETTING_ROUTES_TITLE.dict,
  },
  {
    path: `${SETTING_ROUTES_MAP.dict}/:id`,
    component: DICT_DETAIL,
    title: SETTING_ROUTES_TITLE.dictDetail,
  },
];

export {
  SETTING_ROUTES,
  SETTING_ROUTES_TITLE,
  SETTING_ROUTES_MAP,
};
