import React from 'react';
import store from '../store';

const ABOUT = React.lazy(() => import('../views/about'));

const ABOUT_ROUTES_MAP = {
  about: '/about',
};
const ABOUT_ROUTES_TITLE = {
  about: '关于',
};

const ABOUT_ROUTES: Array<RouteConfigI> = [
  {
    path: ABOUT_ROUTES_MAP.about,
    component: ABOUT,
    title: ABOUT_ROUTES_TITLE.about,
  },
];

console.log(store.getState().common);

export {
  ABOUT_ROUTES_TITLE,
  ABOUT_ROUTES_MAP,
  ABOUT_ROUTES,
};
