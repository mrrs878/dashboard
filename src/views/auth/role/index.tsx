import React, { useEffect, useState } from 'react';
import { Button, Tree } from 'antd';
// @ts-ignore
import { OnDragEnterData, OnDropData } from 'rc-tree';
import { clone } from 'ramda';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { AppState } from '../../../store';

interface PropsI extends RouteComponentProps {
  state: CommonStateI
}

const mapState2Props = (state: AppState) => ({
  state: state.common,
});

function walkMenu(item: any) {
  if (!item.children) return;
  item.key = item.label;
}

function formatMenu(src: Array<MenuItemI>) {
  const tmp = clone(src);
  tmp.forEach((item) => walkMenu(item));
  return tmp;
}

const Role = (props: PropsI) => {
  const [treeData, setTreeData] = useState<Array<any>>(formatMenu(props.state.menu));
  const [expandedKeys, setExpandedKeys] = useState<Array<string>>(['0-0', '0-0-0', '0-0-0-0']);

  function onDragEnter(info: OnDragEnterData) {
    // setExpandedKeys(info.expandedKeys);
  }

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
  return (
    <div className="container">
      <Tree
        className="draggable-tree"
        defaultExpandedKeys={expandedKeys}
        draggable
        blockNode
        checkable
        onDragEnter={onDragEnter}
        onDrop={onDrop}
        treeData={treeData}
      />
      <br />
      <Button type="primary" style={{ width: 120 }}>分配</Button>
    </div>
  );
};

export default connect(mapState2Props)(Role);
