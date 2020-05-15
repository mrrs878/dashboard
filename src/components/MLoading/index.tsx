import React from 'react';

import { Spin } from 'antd';

import loadingStyle from './index.module.css';

const Loading: React.FC = () => <Spin className={loadingStyle.loading} spinning tip="加载页面中..." />;

export default Loading;
