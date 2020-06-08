import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router';
import { Route } from 'antd/es/breadcrumb/Breadcrumb';
import style from './index.module.less';
import { ROUTES_MAP, ROUTES_TITLE } from '../../router';

interface PropsI extends RouteComponentProps {
}

const MPageHeader = (props: PropsI) => {
  const [breadcrumb, setBreadcrumb] = useState<Array<Route>>([]);

  function getPaths(pathname: string) {
    if (pathname === ROUTES_MAP.home) return ['home'];
    const paths = props.location.pathname.split('/');
    paths.shift();
    return paths;
  }

  useEffect(() => {
    const paths = getPaths(props.location.pathname);
    const newBreadcrumb = paths.map((item) => ({ path: item, breadcrumbName: ROUTES_TITLE[item] }));
    setBreadcrumb(newBreadcrumb);
  }, [props.location.pathname]);

  function navigate(path: string) {
    if (path === props.location.pathname.slice(1)) return;
    props.history.push(path);
  }

  return (
    <div className={style.container}>
      <Breadcrumb>
        {
          breadcrumb.map((item) => (
            <Breadcrumb.Item key={item.path}>
              <span role="link" onClick={() => navigate(item.path)} style={{ cursor: 'pointer' }}>{ item.breadcrumbName }</span>
            </Breadcrumb.Item>
          ))
        }
      </Breadcrumb>
    </div>
  );
};


export default withRouter(MPageHeader);
