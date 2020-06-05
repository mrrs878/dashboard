import React, { useEffect, useState } from 'react';
import { Breadcrumb, PageHeader } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router';
import { Route } from 'antd/es/breadcrumb/Breadcrumb';
import style from './index.module.less';

interface PropsI extends RouteComponentProps {
}

const MPageHeader = (props: PropsI) => {
  const [routes, setRoutes] = useState<Array<Route>>([]);
  useEffect(() => {
    const { pathname } = props.location;
    const paths = pathname.split('/');
    paths.shift();
    const tmp = paths.map((item) => ({
      path: item,
      breadcrumbName: document.title,
    }));
    setRoutes([...routes, ...tmp]);
  }, [props.location]);
  return (
    <div className={style.container}>
      <Breadcrumb>
        {
          routes.map((item) => (
            <Breadcrumb.Item key={item.path}>
              <a href={item.path}>{ item.breadcrumbName }</a>
            </Breadcrumb.Item>
          ))
        }
      </Breadcrumb>
    </div>
  );
};


export default withRouter(MPageHeader);
