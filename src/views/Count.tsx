import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { CommonStateI } from '../store/state';
import store, { AppState } from '../store';
import * as actions from '../store/actions';
import { AUTH_ROUTES_MAP } from '../router/authRoutes';

const mapState2Props = (state: AppState) => ({
  common: state.common,
});

interface PropsI extends RouteComponentProps{
  common: CommonStateI
}

const Counter: React.FC<PropsI> = (props: PropsI) => {
  function onBtnClick() {
    store.dispatch({ type: actions.ADD_COUNT, data: 2 });
    props.history.push(AUTH_ROUTES_MAP.login);
  }

  return (
    <div>
      <div>{ props.common.count }</div>
      <Button onClick={onBtnClick}>111</Button>
    </div>
  );
};

export default connect(mapState2Props)(withRouter(Counter));
