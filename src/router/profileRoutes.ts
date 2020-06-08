import React from 'react';

const PROFILE = React.lazy(() => import('../views/profile/Profile'));

const PROFILE_ROUTES_MAP = {
  profile: '/profile',
};

const PROFILE_ROUTES_TITLE = {
  profile: '个人中心',
};

const PROFILE_ROUTES: Array<RouteConfigI> = [
  {
    path: PROFILE_ROUTES_MAP.profile,
    component: PROFILE,
    title: PROFILE_ROUTES_TITLE.profile,
  },
];

export {
  PROFILE_ROUTES_MAP,
  PROFILE_ROUTES_TITLE,
  PROFILE_ROUTES,
};
