import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';

import MAIN_CONFIG from '../config';
import MLoading from '../components/MLoading';
import { AUTH_ROUTES, AUTH_ROUTES_MAP, LOGIN } from './authRoutes';
import { HOME_ROUTES, HOME_ROUTES_MAP } from './homeRoutes';
import { PROFILE_ROUTES, PROFILE_ROUTES_MAP } from './profileRoutes';
import MMenu from '../components/MMenu';
import MHeader from '../components/MHeader';
import MPageHeader from '../components/MPageHeader/inedx';

const { Content } = Layout;

const ROUTES_MAP = {
  ...AUTH_ROUTES_MAP,
  ...HOME_ROUTES_MAP,
  ...PROFILE_ROUTES_MAP,
};
const ROUTES: Array<RouteConfigI> = [
  ...AUTH_ROUTES,
  ...HOME_ROUTES,
  ...PROFILE_ROUTES,
];

const Router: React.FC = () => {
  function beforeEach(route: RouteConfigI) {
    const Com = route.component;
    document.title = route.title;
    if (localStorage.getItem(MAIN_CONFIG.TOKEN_NAME) || route.auth === false) {
      return <Com />;
    }
    return <LOGIN />;
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<MLoading />}>
        <Layout>
          <MMenu />
          <Content>
            <div className="content">
              <MHeader />
              <MPageHeader />
              <Switch>
                {
                  ROUTES.map((route) => (
                    <Route
                      key={route.path}
                      path={route.path}
                      exact={route.exact || true}
                      render={(): React.ReactNode => beforeEach(route)}
                    />
                  ))
                }
              </Switch>
            </div>
          </Content>
        </Layout>
      </Suspense>
    </BrowserRouter>
  );
};

export {
  ROUTES_MAP,
};
export default Router;
