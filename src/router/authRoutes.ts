import React from 'react';

const LOGIN = React.lazy(() => import('../views/auth/login'));
const REG = React.lazy(() => import('../views/auth/reg'));

const AUTH_ROUTES_MAP = {
  login: '/auth/login',
  reg: '/auth/reg',
};

const AUTH_ROUTES: Array<RouteConfigI> = [
  {
    path: AUTH_ROUTES_MAP.login,
    component: LOGIN,
    title: '登录',
  },
  {
    path: AUTH_ROUTES_MAP.reg,
    component: REG,
    title: '注册',
  },
];

export {
  AUTH_ROUTES_MAP,
  AUTH_ROUTES,
  LOGIN,
};
