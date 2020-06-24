import React, { ReactText, useEffect, useState } from 'react';
import { Button, Tree, Modal, Input, Form, Divider } from 'antd';
// @ts-ignore
import { SelectData } from 'rc-tree';
import { and, append, clone, compose, curry, ifElse, isEmpty, isNil, last, prop, test, when } from 'ramda';
import { RouteComponentProps, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { PlusCircleOutlined } from '@ant-design/icons';
import { AppState } from '../../../store';

interface PropsI extends RouteComponentProps<{ id: string }> {
  state: CommonStateI
}

const mapState2Props = (state: AppState) => ({
  state: state.common,
});

const formItemLayout = {
  labelCol: {
    xs: { span: 6 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 12 },
    sm: { span: 12 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 6,
      offset: 6,
    },
    sm: {
      span: 8,
      offset: 8,
    },
  },
};

function formatMenu(src: Array<MenuItemI>) {
  const tmp: Array<MenuItemI> = clone(src);
  tmp.push({ icon: <PlusCircleOutlined />, title: '添加', key: 'addMenuItem' });

  function addAddMenu(menuItem: MenuItemI) {
    if (!menuItem.children) return;
    menuItem.children.push({ icon: <PlusCircleOutlined />, title: '添加', key: `addMenuItem${menuItem.key}` });
  }
  tmp.forEach((item) => addAddMenu(item));

  return tmp;
}

function findMenuItemByPos(menuItem: Array<MenuItemI> | undefined, pos: Array<string>): Array<MenuItemI> | undefined {
  if (!menuItem) return [];
  if (pos.length === 0) {
    return menuItem;
  }
  return findMenuItemByPos(menuItem[parseInt(pos[0], 10)].children, pos.slice(1));
}

const MenuSetting = (props: PropsI) => {
  const [treeData, setTreeData] = useState<Array<any>>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [createOrUpdate, setCreateOrUpdate] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<MenuItemI>();
  const [selectedPos, setSelectedPos] = useState<Array<MenuItemI>>([]);
  const [form] = Form.useForm();

  const menuItemClickHandlers = {
    common(_selectMenu: MenuItemI) {
      form.setFieldsValue({ title: _selectMenu.title, path: _selectMenu.path, icon_name: _selectMenu.icon_name });
      setIsEdit(true);
    },
    add(pos: string, info: MenuItemI) {
      setCreateOrUpdate(true);
      form.resetFields();
      setIsEdit(true);
      const childArrayIndex = pos.slice(2, pos.length - 2).split('-');
      if (!childArrayIndex[0]) childArrayIndex.shift();
      const item = findMenuItemByPos(treeData, childArrayIndex);
      if (item) setSelectedPos(item);
    },
  };

  const formFinishHandlers = {
    edit() {},
    add(values: any) {
      const tmp: MenuItemI = values as MenuItemI;
      const _selectedPos = clone<MenuItemI>(selectedPos);
      const addMenu = _selectedPos.pop();
      _selectedPos.push(tmp);
      if (addMenu) _selectedPos.push(addMenu);
      console.log(_selectedPos);
    },
  };

  useEffect(() => {
    setTreeData(formatMenu(props.state.menu));
  }, [props.state.menu]);

  function onFormFinish(values: any) {
    ifElse(and(createOrUpdate), formFinishHandlers.add, formFinishHandlers.edit)(values);
  }

  function onFormReset() {
    form.setFieldsValue({ title: selectedMenu?.title, path: selectedMenu?.path, icon: selectedMenu?.icon });
  }

  function onTreeItemSelect(key: Array<ReactText>, info: SelectData) {
    if (!info.selected) return;
    const _selectMenu: MenuItemI = info.selectedNodes[0];
    const isAddMenuItem = compose(test(/add\w+/g), prop<'key', string>('key'));
    setSelectedMenu(_selectMenu);
    ifElse(isAddMenuItem, curry(menuItemClickHandlers.add)(info.node.pos), menuItemClickHandlers.common)(_selectMenu);
  }

  function onModalCancel() {
    setIsEdit(false);
  }

  return (
    <div className="container" style={{ paddingLeft: 120 }}>
      <Tree
        className="draggable-tree"
        defaultExpandAll
        showIcon
        blockNode
        onSelect={onTreeItemSelect}
        treeData={treeData}
      />
      <Button style={{ width: 240 }} type="primary">保存</Button>
      <Modal visible={isEdit} footer={null} onCancel={onModalCancel}>
        <Form
          form={form}
          labelCol={formItemLayout.labelCol}
          wrapperCol={formItemLayout.wrapperCol}
          onFinish={onFormFinish}
          onReset={onFormReset}
        >
          <Form.Item
            label="名称"
            name="title"
            rules={[{ required: true, message: '请输入名称' }]}
          >
            <Input placeholder="请输入名称" />
          </Form.Item>
          <Form.Item
            label="路由"
            name="path"
            rules={[{ required: true, message: '请输入路由' }]}
          >
            <Input placeholder="请输入路由" />
          </Form.Item>
          <Form.Item
            label="图标"
            name="icon_name"
            rules={[{ required: true, message: '请输入图标' }]}
          >
            <Input
              addonAfter={<a href="https://ant.design/components/icon-cn/" rel="noreferrer" target="_blank">图标参考</a>}
            />
          </Form.Item>
          <Form.Item wrapperCol={tailFormItemLayout.wrapperCol}>
            <Button htmlType="reset">重置</Button>
            <Divider type="vertical" />
            <Button type="primary" htmlType="submit">
              { createOrUpdate ? '添加' : '保存' }
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default connect(mapState2Props)(withRouter(MenuSetting));
