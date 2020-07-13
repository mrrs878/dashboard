import React from 'react';

const ARTICLE = React.lazy(() => import('../views/article'));
const ARTICLE_DETAIL = React.lazy(() => import('../views/article/detail'));

const ARTICLE_ROUTES_MAP = {
  article: '/articles',
};

const ARTICLE_ROUTES: Array<RouteConfigI> = [
  {
    path: ARTICLE_ROUTES_MAP.article,
    component: ARTICLE,
  },
  {
    path: `${ARTICLE_ROUTES_MAP.article}/:id`,
    component: ARTICLE_DETAIL,
  },
];

export {
  ARTICLE_ROUTES_MAP,
  ARTICLE_ROUTES,
};
