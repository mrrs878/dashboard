import React, { useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Button, Menu, Row, Modal, message, Layout } from 'antd';
import { SettingOutlined, MenuUnfoldOutlined, MenuFoldOutlined,
  HomeOutlined, DashboardOutlined, KeyOutlined, ProfileOutlined } from '@ant-design/icons';
import { ClickParam } from 'antd/es/menu';
import style from './index.module.less';
import authModule from '../../modules/auth';
import { ROUTES_MAP } from '../../router';

const { SubMenu } = Menu;
const { Sider } = Layout;

const MENU_ITEM_PATH: DynamicObjectKey<string> = {
  profile: ROUTES_MAP.profile,
};

interface PropsI extends RouteComponentProps<any, any> {
}

const MMenu: React.FC<PropsI> = (props: PropsI) => {
  const [collapsed, setCollapsed] = useState(false);
  const [logoutModalF, setLogoutModalF] = useState(false);

  function onToggleCollapsedClick() {
    setCollapsed(!collapsed);
  }
  function onMenuClick(param: ClickParam) {
    console.log(param);
    const path = MENU_ITEM_PATH[param.key];
    if (path) props.history.push(path);
  }
  function onHomeClick() {
    props.history.replace(ROUTES_MAP.home);
  }
  function onLogoutClick() {
    setLogoutModalF(true);
  }
  async function onLogoutCfmClick() {
    const res = await authModule.logout();
    setLogoutModalF(false);
    await message.info(res.msg);
    if (res.success) props.history.replace(ROUTES_MAP.login);
  }

  return props.location.pathname === ROUTES_MAP.login ? <></> : (
    <Sider collapsed={collapsed} trigger={null}>
      <div className={style.menuContainer}>
        <div className={style.menuHeader}>
          <Row justify="space-around">
            <Button ghost icon={<HomeOutlined />} onClick={onHomeClick} />
            {
              !collapsed && (
                <Button icon={<MenuFoldOutlined />} ghost onClick={onToggleCollapsedClick} />
              )
            }
          </Row>
          <br />
          <Row justify="center">
            {
              collapsed && (
                <Button icon={<MenuUnfoldOutlined />} ghost onClick={onToggleCollapsedClick} />
              )
            }
          </Row>
        </div>
        <Menu
          onClick={onMenuClick}
          mode="inline"
          theme="dark"
        >
          <SubMenu
            key="sub1"
            title={(
              <span>
                <DashboardOutlined />
                <span>概览</span>
              </span>
            )}
          >
            <Menu.ItemGroup key="g1" title="Item 1">
              <Menu.Item key="1">Option 1</Menu.Item>
              <Menu.Item key="2">Option 2</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup key="g2" title="Item 2">
              <Menu.Item key="3">Option 3</Menu.Item>
              <Menu.Item key="4">Option 4</Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
          <Menu.Item key="profile" icon={<ProfileOutlined />}>个人中心</Menu.Item>
          <SubMenu key="sub3" icon={<KeyOutlined />} title="权限管理">
            <Menu.Item key="5">角色管理</Menu.Item>
            <Menu.Item key="6">人员管理</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub4"
            title={(
              <span>
                <SettingOutlined />
                <span>设置</span>
              </span>
            )}
          >
            <Menu.Item key="9">字典管理</Menu.Item>
            <Menu.Item key="10" onClick={onLogoutClick}>退出登录</Menu.Item>
          </SubMenu>
        </Menu>
        <Modal
          title="提示"
          visible={logoutModalF}
          onOk={onLogoutCfmClick}
          onCancel={() => setLogoutModalF(false)}
        >
          确定要退出登录吗?
        </Modal>
      </div>
    </Sider>
  );
};

export default withRouter(MMenu);
