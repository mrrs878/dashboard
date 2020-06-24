import React from 'react';
import store from '../store';

const ABOUT = React.lazy(() => import('../views/about'));

const ABOUT_ROUTES_MAP = {
  about: '/about',
};

const ABOUT_ROUTES: Array<RouteConfigI> = [
  {
    path: ABOUT_ROUTES_MAP.about,
    component: ABOUT,
  },
];

console.log(store.getState().common);

export {
  ABOUT_ROUTES_MAP,
  ABOUT_ROUTES,
};
