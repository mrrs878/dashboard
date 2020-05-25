import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Button, Layout, Menu, message, Modal, Row } from 'antd';
import { connect } from 'react-redux';
import * as Icon from '@ant-design/icons';
import { ClickParam } from 'antd/es/menu';
import style from './index.module.less';
import authModule from '../../modules/auth';
import { ROUTES_MAP } from '../../router';
import { AppState } from '../../store';

const { SubMenu } = Menu;
const { Sider } = Layout;

const MENU_ITEM_PATH: DynamicObjectKey<string> = {
  profile: ROUTES_MAP.profile,
  login: ROUTES_MAP.login,
  about: ROUTES_MAP.login,
};

const mapState2Props = (state: AppState) => ({
  state: state.common,
});

interface PropsI extends RouteComponentProps<any, any> {
  state: CommonStateI;
}

const MMenu: React.FC<PropsI> = (props: PropsI) => {
  const [collapsed, setCollapsed] = useState(false);
  const [logoutModalF, setLogoutModalF] = useState(false);

  const MENU_CLICK_HANDLER: DynamicObjectKey<Function> = {
    async logout() {
      setLogoutModalF(true);
    },
    navigate(path: string) {
      props.history.push(path);
    },
  };

  async function onLogoutCfmClick() {
    const res = await authModule.logout();
    setLogoutModalF(false);
    await message.info(res.msg);
    if (res.success) props.history.replace(ROUTES_MAP.login);
  }

  function onToggleCollapsedClick() {
    setCollapsed(!collapsed);
  }
  function onMenuClick(param: ClickParam) {
    console.log(param);
    const path = MENU_ITEM_PATH[param.key];
    if (path) MENU_CLICK_HANDLER.navigate(path);
    else MENU_CLICK_HANDLER[param.key]();
  }
  function onHomeClick() {
    props.history.replace(ROUTES_MAP.home);
  }

  function dynamicIcon(iconType: string) {
    // @ts-ignore
    return iconType ? React.createElement(Icon[iconType]) : '';
  }

  function walkMenu(item: MenuItemI) {
    if (Reflect.has(item, 'items')) {
      return (
        <SubMenu key={item.label} icon={dynamicIcon(item.icon)} title={item.title}>
          {
          item.items?.map((child) => walkMenu(child))
        }
        </SubMenu>
      );
    }
    return <Menu.Item icon={dynamicIcon(item.icon)} key={item.label}>{ item.title }</Menu.Item>;
  }
  function generateMenu(menuTree: Array<MenuItemI>) {
    return (
      <Menu onClick={onMenuClick} mode="inline" theme="dark">
        {
          menuTree.map((item) => walkMenu(item))
        }
      </Menu>
    );
  }

  return props.location.pathname === ROUTES_MAP.login ? <></> : (
    <Sider collapsed={collapsed} trigger={null}>
      <div className={style.menuContainer}>
        <div className={style.menuHeader}>
          <Row justify="space-around">
            <Button ghost icon={dynamicIcon('HomeOutlined')} onClick={onHomeClick} />
            {
              !collapsed && (
                <Button icon={dynamicIcon('MenuFoldOutlined')} ghost onClick={onToggleCollapsedClick} />
              )
            }
          </Row>
          <br />
          <Row justify="center">
            {
              collapsed && (
                <Button icon={dynamicIcon('MenuUnfoldOutlined')} ghost onClick={onToggleCollapsedClick} />
              )
            }
          </Row>
        </div>
        {
          generateMenu(props.state.menu)
        }
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

export default connect(mapState2Props)(withRouter(MMenu));
