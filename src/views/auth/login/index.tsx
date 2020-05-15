import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Form, Input, Button, Space } from 'antd';

import style from './index.module.less';
import { ROUTES_MAP } from '../../../router';

const layout = {
  labelCol: { span: 6, offset: 3 },
  wrapperCol: { span: 6 },
};
const tailLayout = {
  wrapperCol: { offset: 11, span: 2 },
};

interface PropsI extends RouteComponentProps<any, any> {
}

const Index = (props: PropsI) => {
  function onFinish(values: any) {
    console.log('Success:', values.username);
  }
  function onFinishFailed(errorInfo: any) {
    console.log('Failed:', errorInfo);
  }
  function onRegClick() {
    props.history.push(ROUTES_MAP.reg);
  }

  return (
    <div className="container" style={{ justifyContent: 'center' }}>
      <Form
        labelCol={layout.labelCol}
        wrapperCol={layout.wrapperCol}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={tailLayout.wrapperCol}>
          <Space direction="vertical">
            <Button type="primary" htmlType="submit" className={style.login}>
              登录
            </Button>
            <button type="button" className={`${style.reg} simpleButton`} onClick={onRegClick}>注册</button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default withRouter(Index);
