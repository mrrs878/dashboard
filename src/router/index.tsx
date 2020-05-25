import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';

import MAIN_CONFIG from '../config';
import Login from '../views/auth/login';
import MLoading from '../components/MLoading';
import { AUTH_ROUTES, AUTH_ROUTES_MAP } from './authRoutes';
import { HOME_ROUTES, HOME_ROUTES_MAP } from './homeRoutes';
import { PROFILE_ROUTES, PROFILE_ROUTES_MAP } from './profileRoutes';

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

interface PropsI {
  children?: any;
}

const Router: React.FC<PropsI> = (props: PropsI) => {
  function beforeEach(route: RouteConfigI): React.ReactNode {
    const Com = React.lazy(route.component);
    if (localStorage.getItem(MAIN_CONFIG.TOKEN_NAME) || route.auth === false) {
      return <Com />;
    }
    return <Login />;
  }

  const { children } = props;

  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Layout>
          { children[0] }
          <Content>
            <div className="content">
              { children[1] }
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
