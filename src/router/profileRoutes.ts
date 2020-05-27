import React from 'react';

const PROFILE = React.lazy(() => import('../views/profile/Profile'));

const PROFILE_ROUTES_MAP = {
  profile: '/profile',
};

const PROFILE_ROUTES: Array<RouteConfigI> = [
  {
    path: PROFILE_ROUTES_MAP.profile,
    component: PROFILE,
  },
];

export {
  PROFILE_ROUTES_MAP,
  PROFILE_ROUTES,
};
