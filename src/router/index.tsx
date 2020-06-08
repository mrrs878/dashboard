import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';

import MAIN_CONFIG from '../config';
import MLoading from '../components/MLoading';
import { AUTH_ROUTES, AUTH_ROUTES_MAP, AUTH_ROUTES_TITLE, LOGIN } from './authRoutes';
import { HOME_ROUTES, HOME_ROUTES_TITLE, HOME_ROUTES_MAP } from './homeRoutes';
import { PROFILE_ROUTES, PROFILE_ROUTES_TITLE, PROFILE_ROUTES_MAP } from './profileRoutes';
import { SETTING_ROUTES, SETTING_ROUTES_TITLE, SETTING_ROUTES_MAP } from './settingRoutes';
import { ABOUT_ROUTES, ABOUT_ROUTES_TITLE, ABOUT_ROUTES_MAP } from './aboutRoutes';
import MMenu from '../components/MMenu';
import MHeader from '../components/MHeader';
import MPageHeader from '../components/MPageHeader/inedx';

const { Content } = Layout;

const ROUTES_MAP = {
  ...AUTH_ROUTES_MAP,
  ...HOME_ROUTES_MAP,
  ...PROFILE_ROUTES_MAP,
  ...SETTING_ROUTES_MAP,
  ...ABOUT_ROUTES_MAP,
};

const ROUTES_TITLE: DynamicObjectKey<string> = {
  ...AUTH_ROUTES_TITLE,
  ...HOME_ROUTES_TITLE,
  ...PROFILE_ROUTES_TITLE,
  ...SETTING_ROUTES_TITLE,
  ...ABOUT_ROUTES_TITLE,
};

const ROUTES: Array<RouteConfigI> = [
  ...AUTH_ROUTES,
  ...HOME_ROUTES,
  ...PROFILE_ROUTES,
  ...SETTING_ROUTES,
  ...ABOUT_ROUTES,
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
      <Layout>
        <MMenu />
        <Content>
          <div className="content">
            <MHeader />
            <MPageHeader />
            <Suspense fallback={<MLoading />}>
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
            </Suspense>
          </div>
        </Content>
      </Layout>
    </BrowserRouter>
  );
};

export {
  ROUTES_MAP,
  ROUTES_TITLE,
};
export default Router;
