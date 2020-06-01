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
  },
  {
    path: AUTH_ROUTES_MAP.reg,
    component: REG,
  },
];

export {
  AUTH_ROUTES_MAP,
  AUTH_ROUTES,
  LOGIN,
};
