import React from 'react';
import { Col, Input, Row, Badge, Space, Avatar } from 'antd';
import { RouteComponentProps, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { PROFILE_ROUTES_MAP } from '../../router/profileRoutes';
import style from './index.module.less';
import { createIconFromIconfont } from '../../tools';
import { AppState } from '../../store';
import { ROUTES_MAP } from '../../router';

const { Search } = Input;
const EmailIcon = createIconFromIconfont();

const mapState2Props = (state: AppState) => ({
  common: state.common,
});

interface PropsI extends RouteComponentProps {
  common: CommonStateI
}

const MHeader: React.FC<PropsI> = (props: PropsI) => {
  function onSearchClick() {}
  function onUserClick() {
    if (props.location.pathname === PROFILE_ROUTES_MAP.profile) return;
    props.history.push(props.common.user.accessToken ? PROFILE_ROUTES_MAP.profile : ROUTES_MAP.login);
  }

  return props.location.pathname === ROUTES_MAP.login ? <></> : (
    <div className={style.headerContainer}>
      <Row justify="end">
        <Col flex={1} />
        <Col span={2} className={style.date}>{ new Date().toLocaleDateString() }</Col>
        <Col span={2}>
          <Space style={{ width: '90%', justifyContent: 'flex-end' }}>
            <Badge count={3}><EmailIcon type="email" style={{ fontSize: '28px', color: '#fff' }} /></Badge>
            <Badge count={2}><EmailIcon type="calendar" style={{ fontSize: '28px', color: '#fff' }} /></Badge>
          </Space>
        </Col>
      </Row>
      <Row>
        <Col className={style.searchInput} span={8}>
          <Search placeholder="input search text" size="large" onSearch={onSearchClick} enterButton />
        </Col>
        <Col flex={1} />
        <Col span={3} className={style.userName}>
          <button className="simpleButton" type="button" onClick={onUserClick}>
            <Avatar src={props.common.user.avatar} alt="M" />
          </button>
        </Col>
      </Row>
    </div>
  );
};

export default connect(mapState2Props)(withRouter(MHeader));
