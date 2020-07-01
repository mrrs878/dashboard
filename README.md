# 后台脚手架

## 集成功能

- [x]菜单编辑
- [x]字典管理
- [x]权限管理

## 技术选型

- [React.js](https://react.docschina.org)
- [redux/react-redux](https://www.redux.org.cn/)
- [react-router](https://react-router.docschina.org/)
- [typescript](https://www.tslang.cn/)
- [antd](https://ant.design/)
- [less](http://lesscss.cn/)
- [mock.js](http://mockjs.com/)
- [dotenv](https://github.com/motdotla/dotenv#readme)

## 主要三方库及版本

- react@16.13.1
- react-router@5.1.2
- redux@4.0.5
- react-redux@7.2.0
- typescript@3.7.2
- css-loader@2.1.1
- less@3.10.3
- less-loader@5.0.0
- antd@4.2.0
- mockjs@1.1.0
- dotenv-cli@3.1.0

## 路由鉴权（`src/router/index.tsx`）

自定义`Route`的`render`函数：添加`beforeEach`函数，根据`localStorage.getItem('access_token'')`和`route.path`判断返回的页面

基于职责链模式(`src/tool/Chain.ts`)做一系列的判断：

1. 若`route.path === '/'`，重定向到`/main`
2. 若`localStorage.getItem('access_token'')`为空并且`route.auth !== false`，重定向到`/auth/login`
3. 返回`route.path`对应的界面

## 一些注意点

- 页面整体布局
    `src/layout/index.tsx`

- 部分页面隐藏`menu`和`header`等公共组件

    在`src/router/index.tsx`中根据`MAIN_CONFIG`中的`FULL_SCREEN_PAGE`判断所显示的界面是否需要显示公共组件，若不需要则将`state.fullScreen`置为`true`
