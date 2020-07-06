import React, { ReactText, useEffect, useState } from 'react';
import { Button, Tree, Modal, Input, Form, Divider, Radio } from 'antd';
import * as _Icons from '@ant-design/icons';
// @ts-ignore
import { SelectData } from 'rc-tree';
import { and, clone, compose, curry, equals, find, ifElse, isNil, last, prop, test } from 'ramda';
import { RouteComponentProps, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { PlusCircleOutlined } from '@ant-design/icons';
import { RuleObject, StoreValue } from 'rc-field-form/lib/interface';

import { AppState } from '../../../store';
import AUTH_MODULE from '../../../modules/auth';
import MAIN_CONFIG from '../../../config';

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
  tmp.push({ icon: <PlusCircleOutlined />, title: '添加', key: 'addMenuItem', sub_menu: [], parent: 'root', path: '/', status: 1 });
  return tmp;
}

function findMenuItemParent(menuItem: MenuItemI) {
  return (src: Array<MenuItemI>) => find<MenuItemI>((item) => item.key === menuItem.parent, src);
}

function addToPosition(src: Array<MenuItemI>, values: any, target: MenuItemI | undefined) {
  if (!target) return [];
  const newMenuItem = clone<MenuItemI>(values);
  const newMenuArray = clone<Array<MenuItemI>>(src);
  newMenuItem.key = `${target.key}${newMenuItem.path}`;
  newMenuItem.path = `${target.path ?? ''}/${newMenuItem.path}`;
  newMenuItem.parent = target.key ?? '';
  newMenuArray.push(newMenuItem);
  AUTH_MODULE.generateMenuTree(newMenuArray);
  return newMenuArray;
}

const MenuSetting = (props: PropsI) => {
  const [menuItemArray, setMenuItemArray] = useState<Array<MenuItemI>>([]);
  const [treeData, setTreeData] = useState<Array<MenuItemI>>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [createOrUpdate, setCreateOrUpdate] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<MenuItemI>();
  const [selectedMenuParent, setSelectedMenuParent] = useState<MenuItemI>();
  const [dictStatus, setDictStatus] = useState<Array<{ value: number; title: string }>>([]);
  const [isIcon, setIsIcon] = useState<boolean>(false);
  const [isMenuAdding, setIsMenuAdding] = useState<boolean>(false);
  const [form] = Form.useForm();

  useEffect(() => {
    setTreeData(formatMenu(props.state.menu));
  }, [props.state.menu]);
  useEffect(() => {
    setMenuItemArray(props.state.menuArray);
  }, [props.state.menuArray]);
  useEffect(() => {
    const _dictStatus = props.state.dicts.filter((item) => item.label === 'status')
      .map((item) => ({ value: item.value, title: item.name }));
    setDictStatus(_dictStatus);
  }, [props.state.dicts]);

  const menuItemClickHandlers = {
    common(_selectMenu: MenuItemI) {
      const { title, path, icon_name, status } = _selectMenu;
      form.setFieldsValue({ title, path: last(path?.split('/') || []), icon_name, status });
      setIsEdit(true);
    },
    add() {
      form.resetFields();
      setIsIcon(selectedMenu?.parent === 'root');
      setIsEdit(true);
      setCreateOrUpdate(true);
      setSelectedMenuParent(selectedMenu);
    },
  };

  const formFinishHandlers = {
    edit() {},
    add(values: any) {
      const newMenuItemArray = addToPosition(menuItemArray, values, selectedMenu);
      setMenuItemArray(newMenuItemArray);
      setIsEdit(false);
    },
  };
  const formResetHandlers = {
    common() {
      const { title, path, icon_name, status } = selectedMenu ?? {};
      form.setFieldsValue({ title, path: last(path?.split('/') || []), icon_name, status });
    },
    add() {
      form.resetFields();
    },
  };

  function onFormFinish(values: any) {
    setIsMenuAdding(true);
    ifElse(and(isEdit), formFinishHandlers.add, formFinishHandlers.edit)(values);
    setIsMenuAdding(false);
  }

  function onFormReset() {
    ifElse(equals(selectedMenu), formResetHandlers.add, formResetHandlers.common)(selectedMenuParent);
  }

  function onTreeItemSelect(key: Array<ReactText>, info: SelectData) {
    if (!info.selected) return;
    const _selectMenu: MenuItemI = info.selectedNodes[0];
    const isAddMenuItem = compose(test(/add\w+/g), prop<'key', string>('key'));
    setSelectedMenu(_selectMenu);
    compose(setSelectedMenuParent, findMenuItemParent(_selectMenu))(menuItemArray);
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
        <Modal visible={isEdit} footer={null} getContainer={false} onCancel={onModalCancel}>
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
              <Input
                addonBefore={<span>{ `${selectedMenuParent?.path || ''}/` }</span>}
                placeholder="请输入路由"
              />
            </Form.Item>
            <Form.Item
              label="图标"
              name="icon_name"
              rules={[{ validator: validateIcon }]}
            >
              <Input
                disabled={!isIcon}
                addonAfter={<a href={MAIN_CONFIG.ICON_PREVIEW_URL} rel="noreferrer" target="_blank">图标参考</a>}
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
              <Button onClick={menuItemClickHandlers.add}>添加下一级</Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default connect(mapState2Props)(withRouter(MenuSetting));
