import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router';
import { Route } from 'antd/es/breadcrumb/Breadcrumb';
import { clone } from 'ramda';
import style from './index.module.less';
import { ROUTES_MAP, ROUTES_TITLE } from '../../router';

interface PropsI extends RouteComponentProps {
}

const MPageHeader = (props: PropsI) => {
  const [breadcrumb, setBreadcrumb] = useState<Array<Route>>([]);
  const [routesMap, setRoutesMap] = useState<DynamicObjectKey<string>>({});

  function getPaths(pathname: string) {
    if (pathname === ROUTES_MAP.home) return ['home'];
    const paths = props.location.pathname.split('/');
    paths.shift();
    if (/\d/.test(paths[paths.length - 1])) paths[paths.length - 1] = `${paths[paths.length - 2]}Detail`;
    return paths;
  }

  useEffect(() => {
    setRoutesMap(clone(ROUTES_MAP));
  }, []);

  useEffect(() => {
    const paths = getPaths(props.location.pathname);
    const newBreadcrumb = paths.map((item) => ({ path: item, breadcrumbName: ROUTES_TITLE[item] }));
    setBreadcrumb(newBreadcrumb);
  }, [props.location.pathname]);

  function navigate(path: string) {
    if (path === props.location.pathname.slice(1)) return;
    props.history.push(routesMap[path]);
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
