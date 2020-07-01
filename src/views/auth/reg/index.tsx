import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Form, Input, Button, Space } from 'antd';

import style from './index.module.less';

const layout = {
  labelCol: { span: 7, offset: 3 },
  wrapperCol: { span: 3 },
};
const tailLayout = {
  wrapperCol: { offset: 11, span: 1 },
};

interface PropsI extends RouteComponentProps<any, any> {
}

const Login = () => {
  function onFinish(values: any) {
    console.log('Success:', values.username);
  }

  function onFinishFailed(errorInfo: any) {
    console.log('Failed:', errorInfo);
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
              注册
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default withRouter(Login);
