import React from 'react';
import { Col, Row, Badge, Avatar } from 'antd';
import { RouteComponentProps, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { PROFILE_ROUTES_MAP } from '../../router/profileRoutes';
import style from './index.module.less';
import { createIconFromIconfont } from '../../tools';
import { AppState } from '../../store';
import { ROUTES_MAP } from '../../router';

const EmailIcon = createIconFromIconfont();

const mapState2Props = (state: AppState) => ({
  common: state.common,
});

interface PropsI extends RouteComponentProps {
  common: CommonStateI
}

const MHeader: React.FC<PropsI> = (props: PropsI) => {
  function onUserClick() {
    if (props.location.pathname === PROFILE_ROUTES_MAP.profile) return;
    props.history.push(props.common.user.accessToken ? PROFILE_ROUTES_MAP.profile : ROUTES_MAP.login);
  }

  return props.location.pathname === ROUTES_MAP.login ? <></> : (
    <div className={style.headerContainer}>
      <Row justify="center" align="middle">
        <Col flex={1} />
        <Col span={1}>
          <EmailIcon type="email" style={{ fontSize: '28px', color: '#fff' }} />
        </Col>
        <Col span={1}>
          <button className="simpleButton" type="button" onClick={onUserClick}>
            <Avatar src={props.common.user.avatar} alt="M" />
          </button>
        </Col>
      </Row>
    </div>
  );
};

export default connect(mapState2Props)(withRouter(MHeader));
