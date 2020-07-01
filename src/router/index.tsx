/**
 * @overview: 主路由配置文件
 * @description: 整合所有子路由配置、鉴权、导出路由配置表
 * @author: Mr.RS<mrrs878@foxmail.com>
 * @date 2020/7/1/0001
*/

import React, { Dispatch, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import MAIN_CONFIG from '../config';
import MLoading from '../components/MLoading';
import { AUTH_ROUTES, AUTH_ROUTES_MAP } from './authRoutes';
import { HOME_ROUTES, HOME_ROUTES_MAP } from './homeRoutes';
import { PROFILE_ROUTES, PROFILE_ROUTES_MAP } from './profileRoutes';
import { SETTING_ROUTES, SETTING_ROUTES_MAP } from './settingRoutes';
import { ABOUT_ROUTES, ABOUT_ROUTES_MAP } from './aboutRoutes';
import { DASHBOARD_ROUTES, DASHBOARD_ROUTES_MAP } from './dashboard';
import { actions, AppState } from '../store';
import ActionsT from '../store/types';
import Chain, { NEXT_SUCCESSOR } from '../tools/Chain';

interface PropsI {
  menuTitles: MenuTitlesI,
  setFullScreen: (data: boolean) => void,
}

const mapState2Props = (state: AppState) => ({
  menuTitles: state.common.menuTitles,
});

const mapAction2Props = (dispatch: Dispatch<ActionsT>) => ({
  setFullScreen(data: boolean) {
    dispatch({ type: actions.UPDATE_FULL_SCREEN, data });
  },
});

const ROUTES_MAP = {
  ...AUTH_ROUTES_MAP,
  ...HOME_ROUTES_MAP,
  ...PROFILE_ROUTES_MAP,
  ...SETTING_ROUTES_MAP,
  ...ABOUT_ROUTES_MAP,
  ...DASHBOARD_ROUTES_MAP,
};

const ROUTES: Array<RouteConfigI> = [
  ...AUTH_ROUTES,
  ...HOME_ROUTES,
  ...PROFILE_ROUTES,
  ...SETTING_ROUTES,
  ...ABOUT_ROUTES,
  ...DASHBOARD_ROUTES,
];


const redirectMain = new Chain((route: RouteConfigI) => {
  if (route.path === '/') {
    window.location.href = '/main';
  }
  return NEXT_SUCCESSOR;
});
const redirectLogin = new Chain((route: RouteConfigI) => {
  if (localStorage.getItem(MAIN_CONFIG.TOKEN_NAME) || route.auth === false) {
    return NEXT_SUCCESSOR;
  }
  window.location.href = ROUTES_MAP.login;
});
const returnComponent = new Chain((route: RouteConfigI) => {
  const Com = route.component;
  return <Com />;
});
redirectMain.setNextSuccessor(redirectLogin);
redirectLogin.setNextSuccessor(returnComponent);

const Router = (props: PropsI) => {
  function beforeEach(route: RouteConfigI) {
    props.setFullScreen(MAIN_CONFIG.FULL_SCREEN_PAGE.includes(route.path));
    document.title = props.menuTitles[route.path] || MAIN_CONFIG.APP_NAME;
    return redirectMain.passRequest(route);
  }

  return (
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
  );
};

export {
  ROUTES_MAP,
};
export default connect(mapState2Props, mapAction2Props)(Router);
