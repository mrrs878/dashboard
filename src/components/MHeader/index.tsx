import React from 'react';
import { Col, Row, Badge, Avatar, Menu, Dropdown } from 'antd';
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

const AvatarMenu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        3rd menu item
      </a>
    </Menu.Item>
  </Menu>
);

const MHeader: React.FC<PropsI> = (props: PropsI) => {
  function onUserClick() {
    if (props.location.pathname === PROFILE_ROUTES_MAP.profile) return;
    props.history.push(props.common.user.accessToken ? PROFILE_ROUTES_MAP.profile : ROUTES_MAP.login);
  }

  return props.location.pathname === ROUTES_MAP.login ? <></> : (
    <div className={style.headerContainer}>
      <Row justify="center" align="middle">
        <Col flex={1} />
        <Col span={1} style={{ marginRight: 8 }}>
          <Badge count={11}><EmailIcon type="email" style={{ fontSize: 24 }} /></Badge>
        </Col>
        <Col span={1}>
          <Dropdown overlay={AvatarMenu}>
            <div className="hoverEffect">
              <Avatar size="small" className={style.avatar} src={props.common.user.avatar} alt="avatar" />
              <span>{props.common.user.name}</span>
            </div>
          </Dropdown>
        </Col>
      </Row>
    </div>
  );
};

export default connect(mapState2Props)(withRouter(MHeader));
