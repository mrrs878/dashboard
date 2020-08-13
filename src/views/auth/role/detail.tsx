import React, { ReactText, useEffect, useState } from 'react';
import { Button, Tree } from 'antd';
// @ts-ignore
import { OnDragEnterData, OnDropData } from 'rc-tree';
import { clone } from 'ramda';
import { RouteComponentProps, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { AppState } from '../../../store';

interface PropsI extends RouteComponentProps<{ id: string }> {
  state: CommonStateI
}

const mapState2Props = (state: AppState) => ({
  state: state.common,
});

function getExpandKeys(src: Array<MenuItemI>, role: number) {
  if (role === -1) return [];
  const tmp = clone(src);
  const keys: Array<string> = [];

  function walkMenu(menuItem: MenuItemI) {
    if (menuItem.role?.includes(role)) keys.push(menuItem.key);
    if (!menuItem.children) return;
    menuItem.children.forEach((item) => walkMenu(item));
  }

  tmp.forEach((item) => walkMenu(item));
  return keys;
}

const RoleDetail = (props: PropsI) => {
  const [treeData, setTreeData] = useState<Array<any>>(props.state.menu);
  const [checkedKeys, setCheckedKeys] = useState<Array<ReactText>>([]);

  useEffect(() => {
    (async () => {
      const id = +props.match.params.id;
      const menu = props.state.dicts.find((item) => item.id === id);
      setCheckedKeys(getExpandKeys(props.state.menu, menu?.value ?? -1));
    })();
  }, [props.match.params.id, props.state.dicts, props.state.menu]);

  function onDrop(info: OnDropData) {
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    const dropPos = info.node.props.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data: Array<any>, key: string, callback: (item: any, index: number, arr: Array<any>) => void) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children, key, callback);
        }
      }
    };
    const data = clone(treeData);

    let dragObj: any;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        item.children.push(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0
      && info.node.props.expanded
      && dropPosition === 1
    ) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        item.children.unshift(dragObj);
      });
    } else {
      let ar: Array<any> = [];
      let i = 0;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }

    setTreeData(data);
  }

  function onDragEnter(info: OnDragEnterData) {
    // setExpandedKeys(info.expandedKeys);
  }

  function onCheck(keys: Array<ReactText> | { checked: ReactText[]; halfChecked: ReactText[]; }) {
    if (!Array.isArray(keys)) return;
    setCheckedKeys(keys);
  }

  return (
    <div className="container">
      <div style={{ paddingLeft: 120, width: 360 }}>
        <Tree
          className="draggable-tree"
          defaultExpandAll
          draggable
          blockNode
          checkable
          onDragEnter={onDragEnter}
          onDrop={onDrop}
          onCheck={onCheck}
          checkedKeys={checkedKeys}
          treeData={treeData}
        />
        <br />
        <Button type="primary" style={{ width: 120 }}>分配</Button>
      </div>
    </div>
  );
};

export default connect(mapState2Props)(withRouter(RoleDetail));
