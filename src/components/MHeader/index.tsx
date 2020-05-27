import React from 'react';
import { Col, Row, Badge } from 'antd';
import { RouteComponentProps, withRouter } from 'react-router';
import { connect } from 'react-redux';
import HeaderSearch from '../MHeaderSearch';
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
      <Row align="middle">
        <Col flex={1} />
        <Col span={3}>
          <HeaderSearch
            className={`${style.action} ${style.search}`}
            placeholder="站内搜索"
            defaultValue="umi ui"
            options={[
              {
                label: <a href="https://umijs.org/zh/guide/umi-ui.html">umi ui</a>,
                value: 'umi ui',
              },
              {
                label: <a href="next.ant.design">Ant Design</a>,
                value: 'Ant Design',
              },
              {
                label: <a href="https://protable.ant.design/">Pro Table</a>,
                value: 'Pro Table',
              },
              {
                label: <a href="https://prolayout.ant.design/">Pro Layout</a>,
                value: 'Pro Layout',
              },
            ]}
          />
        </Col>
        <Col span={1}>
          <Badge count={3}><EmailIcon type="email" style={{ fontSize: '28px', color: '#fff' }} /></Badge>
        </Col>
        <Col span={1}>
          <Badge count={2}><EmailIcon type="calendar" style={{ fontSize: '28px', color: '#fff' }} /></Badge>
        </Col>
        <Col span={1} className={style.userName}>
          <button className="simpleButton" type="button" onClick={onUserClick}>
            111
          </button>
        </Col>
      </Row>
    </div>
  );
};

export default connect(mapState2Props)(withRouter(MHeader));
