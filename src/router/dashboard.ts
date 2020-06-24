import React from 'react';

const DASHBOARD = React.lazy(() => import('../views/dashboard'));

const DASHBOARD_ROUTES_MAP = {
  main: '/main',
};

const DASHBOARD_ROUTES: Array<RouteConfigI> = [
  {
    path: DASHBOARD_ROUTES_MAP.main,
    component: DASHBOARD,
  },
];

export {
  DASHBOARD_ROUTES_MAP,
  DASHBOARD_ROUTES,
};
