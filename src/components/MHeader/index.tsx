import React from 'react';
import { Col, Row, Badge, Avatar, Menu, Dropdown } from 'antd';
import { MailOutlined, UserOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { RouteComponentProps, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { PROFILE_ROUTES_MAP } from '../../router/profileRoutes';
import style from './index.module.less';
import { AppState } from '../../store';
import { ROUTES_MAP } from '../../router';
import MHeaderSearch from '../MHeaderSearch';

const mapState2Props = (state: AppState) => ({
  common: state.common,
});

interface PropsI extends RouteComponentProps {
  common: CommonStateI
}

const AvatarMenu = (
  <Menu>
    <Menu.Item icon={<UserOutlined />}>
      <span>个人中心</span>
    </Menu.Item>
    <Menu.Item icon={<SettingOutlined />}>
      <span>个人设置</span>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item icon={<LogoutOutlined />}>
      <span>退出登录</span>
    </Menu.Item>
  </Menu>
);

const MHeader: React.FC<PropsI> = (props: PropsI) => {
  function onUserClick() {
    if (props.location.pathname === PROFILE_ROUTES_MAP.profile) return;
    props.history.push(props.common.user.accessToken ? PROFILE_ROUTES_MAP.profile : ROUTES_MAP.login);
  }

  return props.location.pathname === ROUTES_MAP.login ? <></> : (
    <Row align="middle" className={style.headerContainer}>
      <Col flex={1} />
      <Col>
        <MHeaderSearch
          className={`${style.action} ${style.search}`}
          placeholder="站内搜索"
          defaultValue="umi ui"
          options={[
            { label: <a href="https://umijs.org/zh/guide/umi-ui.html">umi ui</a>, value: 'umi ui' },
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
      <Col span={1} className="hoverEffect">
        <Badge className={style.badge} count={11}>
          <MailOutlined className={style.icon} />
        </Badge>
      </Col>
      <Col span={1} className="hoverEffect">
        <Dropdown overlay={AvatarMenu}>
          <div>
            <Avatar size="small" className={style.avatar} src={props.common.user.avatar} alt="avatar" />
            <span>{props.common.user.name}</span>
          </div>
        </Dropdown>
      </Col>
    </Row>
  );
};

export default connect(mapState2Props)(withRouter(MHeader));
