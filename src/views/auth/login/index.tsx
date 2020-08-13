import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Form, Input, Button, Space, message } from 'antd';

import style from './index.module.less';
import userModule from '../../../modules/user';
import authModule from '../../../modules/auth';

const layout = {
  labelCol: { span: 7, offset: 3 },
  wrapperCol: { span: 3 },
};
const tailLayout = {
  wrapperCol: { offset: 11, span: 1 },
};

interface PropsI extends RouteComponentProps<any, any> {
}

const Index = (props: PropsI) => {
  async function onFinish(values: any) {
    console.log('Success:', values.username);
    const res = await userModule.login({ name: values.username, password: values.password });
    await message.info(res.msg);
    if (!res.success) return;
    await authModule.getMenu();
    props.history.replace('/');
  }
  function onFinishFailed(errorInfo: any) {
    console.log('Failed:', errorInfo);
  }

  return (
    <div className="container" style={{ justifyContent: 'center', marginTop: 0 }}>
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
            {/* <button type="button" className={`${style.reg} simpleButton`} onClick={onRegClick}>注册</button> */}
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default withRouter(Index);
