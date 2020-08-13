import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router';
import { Route } from 'antd/es/breadcrumb/Breadcrumb';
import { clone } from 'ramda';
import { connect } from 'react-redux';
import style from './index.module.less';
import { ROUTES_MAP } from '../../router';
import { AppState } from '../../store';
import { getLastItem } from '../../tools';

interface PropsI extends RouteComponentProps {
  menuTitles: MenuTitlesI
}

const mapState2Props = (state: AppState) => ({
  menuTitles: state.common.menuTitles,
});

const MPageHeader = (props: PropsI) => {
  const [breadcrumb, setBreadcrumb] = useState<Array<Route>>([]);
  const [routesMap, setRoutesMap] = useState<DynamicObjectKey<string>>({});

  useEffect(() => {
    setRoutesMap(clone(ROUTES_MAP));
  }, []);

  useEffect(() => {
    function getPaths(pathname: string) {
      if (pathname === ROUTES_MAP.home) return ['home'];
      const paths = props.location.pathname.match(/\/\w+/gi);
      if (!paths) return [];
      if (/\d/g.test(getLastItem(paths))) paths.pop();
      const fullPath = paths.join('');
      paths.pop();
      paths.push(fullPath);
      return paths;
    }
    const paths = getPaths(props.location.pathname);
    const newBreadcrumb = paths.map((item) => ({ path: item, breadcrumbName: props.menuTitles[item] }));
    setBreadcrumb(newBreadcrumb);
  }, [props.location.pathname, props.menuTitles]);

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


export default connect(mapState2Props)(withRouter(MPageHeader));
