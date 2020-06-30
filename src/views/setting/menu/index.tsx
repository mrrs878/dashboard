import React, { ReactText, useEffect, useState } from 'react';
import { Button, Tree, Modal, Input, Form, Divider, Radio } from 'antd';
import * as _Icons from '@ant-design/icons';
// @ts-ignore
import { SelectData } from 'rc-tree';
import {and, clone, compose, equals, ifElse, isEmpty, isNil, or, prop, test} from 'ramda';
import { RouteComponentProps, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { PlusCircleOutlined } from '@ant-design/icons';
import { RuleObject, StoreValue } from 'rc-field-form/lib/interface';

import { AppState } from '../../../store';
import AUTH_MODULE from '../../../modules/auth';

interface PropsI extends RouteComponentProps<{ id: string }> {
  state: CommonStateI
}

const Icons = clone<DynamicObjectKey<any>>(_Icons);

const mapState2Props = (state: AppState) => ({
  state: state.common,
});

const formItemLayout = {
  labelCol: {
    xs: { span: 7 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 12 },
    sm: { span: 12 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 16,
      offset: 6,
    },
    sm: {
      span: 16,
      offset: 6,
    },
  },
};

function formatMenu(src: Array<MenuItemI>) {
  const tmp: Array<MenuItemI> = clone(src);
  tmp.push({ icon: <PlusCircleOutlined />, title: '添加', key: 'addMenuItem', sub_menu: [], parent: 'root', path: '', status: 1 });

  function addAddMenu(menuItem: MenuItemI) {
    if (!menuItem.children) return;
    menuItem.children?.push(
      { icon: <PlusCircleOutlined />, title: '添加', key: `addMenuItem${menuItem.key}`, sub_menu: [], parent: menuItem.key, path: '', status: 1 }
      );
  }
  tmp.forEach((item) => addAddMenu(item));

  return tmp;
}

const MenuSetting = (props: PropsI) => {
  const [treeData, setTreeData] = useState<Array<MenuItemI>>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [createOrUpdate, setCreateOrUpdate] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<MenuItemI>();
  const [dictStatus, setDictStatus] = useState<Array<{ value: number; title: string }>>([]);
  const [isIcon, setIsIcon] = useState<boolean>(false);
  const [isAddChildren, setIsAddChildren] = useState<boolean>(false);
  const [isMenuAdding, setIsMenuAdding] = useState<boolean>(false);
  const [form] = Form.useForm();

  useEffect(() => {
    setTreeData(formatMenu(props.state.menu));
  }, [props.state.menu]);
  useEffect(() => {
    const _dictStatus = props.state.dicts.filter((item) => item.label === 'status')
      .map((item) => ({ value: item.value, title: item.name }));
    setDictStatus(_dictStatus);
  }, [props.state.dicts]);

  const menuItemClickHandlers = {
    common(_selectMenu: MenuItemI) {
      const { title, path, icon_name, status } = _selectMenu;
      form.setFieldsValue({ title, path, icon_name, status });
      setIsEdit(true);
    },
    add() {
      form.resetFields();
      setIsEdit(true);
      setCreateOrUpdate(true);
    },
    addSecond() {
      form.resetFields();
      setIsAddChildren(false);
    },
  };

  const formFinishHandlers = {
    edit() {},
    add(values: any) {
      const addInnerOrRoot = () => {
        const newMenuItem: MenuItemI = values as MenuItemI;
        const newMenuArray = clone<Array<MenuItemI>>(props.state.menu);
        const parentMenu = newMenuArray.find((item) => item.key === selectedMenu?.parent);
        newMenuItem.key = `${selectedMenu?.parent}${newMenuItem.path}`;
        newMenuItem.path = `${parentMenu?.path ?? ''}/${newMenuItem.path}`;
        newMenuItem.parent = selectedMenu?.parent ?? '';
        const addMenuItem2Root = () => newMenuArray.push(newMenuItem);
        const addMenuItem2Inner = () => parentMenu?.children?.push(newMenuItem);
        ifElse(equals('root'), addMenuItem2Root, addMenuItem2Inner)(newMenuItem.parent);
        AUTH_MODULE.generateMenuTree(newMenuArray);
        setIsEdit(false);
      };
      const addChildren = () => {
        const newMenuItem: MenuItemI = values as MenuItemI;
        const newMenuArray = clone<Array<MenuItemI>>(props.state.menu);
        const parentMenu = newMenuArray.find((item) => item.key === selectedMenu?.key);
        if (!parentMenu) return;
        newMenuItem.key = `${selectedMenu?.key}${newMenuItem.path}`;
        newMenuItem.path = `${selectedMenu?.path}/${newMenuItem.path}`;
        newMenuItem.parent = selectedMenu?.key ?? '';
        parentMenu.children = parentMenu?.children ?? [];
        parentMenu.children?.push(newMenuItem);
        AUTH_MODULE.generateMenuTree(newMenuArray);
        setIsEdit(false);
      };

      ifElse(equals('添加'), addInnerOrRoot, addChildren)(selectedMenu?.title);
    },
  };

  function onFormFinish(values: any) {
    setIsMenuAdding(true);
    ifElse(and(isEdit), formFinishHandlers.add, formFinishHandlers.edit)(values);
    setIsMenuAdding(false);
  }

  function onFormReset() {
    const { title, path, icon_name, status } = selectedMenu ?? {};
    form.setFieldsValue({ title, path, icon_name, status });
  }

  function onTreeItemSelect(key: Array<ReactText>, info: SelectData) {
    if (!info.selected) return;
    const _selectMenu: MenuItemI = info.selectedNodes[0];
    const isAddMenuItem = compose(test(/add\w+/g), prop<'key', string>('key'));
    setSelectedMenu(_selectMenu);
    setIsIcon(_selectMenu.parent === 'root');
    setIsAddChildren(isNil(_selectMenu.children));
    ifElse(isAddMenuItem, menuItemClickHandlers.add, menuItemClickHandlers.common)(_selectMenu);
  }

  function onModalCancel() {
    setIsEdit(false);
  }

  function validateIcon(rule: RuleObject, value: StoreValue) {
    if (!value) return Promise.resolve();
    const Icon = Icons[value];
    return isNil(Icon) ? Promise.reject(new Error('该图标不存在，请输入其他值')) : Promise.resolve();
  }

  return (
    <div className="container">
      <div style={{ paddingLeft: 120, width: 360 }}>
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
            {
              createOrUpdate ? (
                <Form.Item
                  label="key"
                  name="path"
                  rules={[{ required: true, message: '请输入key' }]}
                >
                  <Input placeholder="请输入key" />
                </Form.Item>
              ) : (
                <Form.Item
                  label="路由"
                  name="path"
                  rules={[{ required: true, message: '请输入路由' }]}
                >
                  <Input placeholder="请输入路由" />
                </Form.Item>
              )
            }
            <Form.Item
              label="图标"
              name="icon_name"
              rules={[{ validator: validateIcon }]}
            >
              <Input
                disabled={!isIcon}
                addonAfter={<a href="https://ant.design/components/icon-cn/" rel="noreferrer" target="_blank">图标参考</a>}
              />
            </Form.Item>
            <Form.Item
              name="status"
              label="状态"
              rules={[{ required: true, message: '请选择字段状态!' }]}
            >
              <Radio.Group>
                {
                  dictStatus.map((item) => (
                    <Radio key={item.title} value={item.value}>{ item.title }</Radio>
                  ))
                }
              </Radio.Group>
            </Form.Item>
            <Form.Item wrapperCol={tailFormItemLayout.wrapperCol}>
              <Button htmlType="reset">重置</Button>
              <Divider type="vertical" />
              <Button type="primary" htmlType="submit" loading={isMenuAdding}>
                { createOrUpdate ? '添加' : '保存' }
              </Button>
              <Divider type="vertical" />
              <Button disabled={!isAddChildren} onClick={menuItemClickHandlers.addSecond}>添加下一级</Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default connect(mapState2Props)(withRouter(MenuSetting));
