import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Layout, Menu, message, Modal } from 'antd';
import * as _Icon from '@ant-design/icons';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { ClickParam } from 'antd/es/menu';
import { clone } from 'ramda';
import style from './index.module.less';
import authModule from '../../modules/auth';
import { ROUTES_MAP } from '../../router';
import { AppState } from '../../store';

const { SubMenu } = Menu;
const { Sider } = Layout;
const Icon: DynamicObjectKey<any> = clone(_Icon);

const mapState2Props = (state: AppState) => ({
  menu: state.common.menu,
  menuRoutes: state.common.menuRoutes,
});

// const mapAction2Props = (dispatch: Dispatch<ActionsT>) => ({
//   setMenuTitles(data: Array<string>) {
//     dispatch({ type: actions.UPDATE_MENU_TITLES, data });
//   },
// });

interface PropsI extends RouteComponentProps {
  menu: Array<MenuItemI>;
  menuRoutes: MenuRoutesI;
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
    const path = props.menuRoutes[param.key];
    if (path) MENU_CLICK_HANDLER.navigate(path);
    else MENU_CLICK_HANDLER[param.key]();
  }

  function dynamicIcon(iconType: string | Object | undefined) {
    if (typeof iconType !== 'string') return iconType;
    return iconType ? React.createElement(Icon[iconType]) : '';
  }

  function walkMenu(item: MenuItemI) {
    item.icon = dynamicIcon(item.icon_name);
    if (Reflect.has(item, 'children')) {
      return (
        <SubMenu key={item.key} icon={item.icon} title={item.title}>
          {
            item.children?.map((child) => walkMenu(child))
          }
        </SubMenu>
      );
    }
    return <Menu.Item icon={item.icon} key={item.key}>{ item.title }</Menu.Item>;
  }

  function generateMenu(menuTree: Array<MenuItemI> | undefined) {
    if (!menuTree) return;
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
        <div role="button" className={style.menuHeader} onClick={onToggleCollapsedClick}>
          {collapsed ? <MenuUnfoldOutlined style={{ fontSize: 24 }} /> : <MenuFoldOutlined style={{ fontSize: 24 }} />}
        </div>
        {
          generateMenu(props.menu)
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
