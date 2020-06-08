import React from 'react';

const HOME = React.lazy(() => import('../views/home/Home'));

const HOME_ROUTES_MAP = {
  home: '/',
};

const HOME_ROUTES_TITLE = {
  home: '主页',
};

const HOME_ROUTES: Array<RouteConfigI> = [
  {
    path: HOME_ROUTES_MAP.home,
    component: HOME,
    title: HOME_ROUTES_TITLE.home,
  },
];

export {
  HOME_ROUTES_MAP,
  HOME_ROUTES_TITLE,
  HOME_ROUTES,
};
