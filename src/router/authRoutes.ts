import React from 'react';

const LOGIN = React.lazy(() => import('../views/auth/login'));
const REG = React.lazy(() => import('../views/auth/reg'));
const USER = React.lazy(() => import('../views/auth/user'));
const ROLE = React.lazy(() => import('../views/auth/role'));

const AUTH_ROUTES_MAP = {
  auth: '/auth',
  login: '/auth/login',
  reg: '/auth/reg',
  user: '/auth/user',
  role: '/auth/role',
};

const AUTH_ROUTES_TITLE = {
  auth: '权限管理',
  login: '登录',
  reg: '注册',
  user: '人员管理',
  role: '角色管理',
};

const AUTH_ROUTES: Array<RouteConfigI> = [
  {
    path: AUTH_ROUTES_MAP.login,
    component: LOGIN,
    title: AUTH_ROUTES_TITLE.login,
  },
  {
    path: AUTH_ROUTES_MAP.reg,
    component: REG,
    title: AUTH_ROUTES_TITLE.reg,
  },
  {
    path: AUTH_ROUTES_MAP.role,
    component: ROLE,
    title: AUTH_ROUTES_TITLE.role,
  },
  {
    path: AUTH_ROUTES_MAP.user,
    component: USER,
    title: AUTH_ROUTES_TITLE.user,
  },
];

export {
  AUTH_ROUTES_MAP,
  AUTH_ROUTES_TITLE,
  AUTH_ROUTES,
  LOGIN,
};
