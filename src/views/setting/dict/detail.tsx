import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { AutoComplete, Button, Form, Input, message, Radio, Checkbox, Select } from 'antd';

import { connect } from 'react-redux';
import { uniq } from 'ramda';
import { CREATE_DICT, GET_DICT, UPDATE_DICT } from '../../../api/setting';
import Dict from '../../../model/Dict';
import { AppState } from '../../../store';


interface PropsI extends RouteComponentProps<{ id: string }> {
  state: CommonStateI;
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
      span: 16,
      offset: 0,
    },
    sm: {
      span: 10,
      offset: 10,
    },
  },
};

const UserDetail = (props: PropsI) => {
  const [dataDict, setDataDict] = useState<DictI>(new Dict());
  const [createOrAdd, setCreateOrAdd] = useState(true);
  const [dictTypes, setDictTypes] = useState<Array<{ value: string; title: string }>>([]);
  const [dictLabels, setDictLabels] = useState<Array<{ value: string; title: string }>>([]);

  useEffect(() => {
    const dictType = uniq(props.state.dicts.map((item) => ({ value: item.type, title: item.type_view })));
    const dictLabel = uniq(props.state.dicts.map((item) => ({ value: item.label, title: item.label_view })));
    setDictTypes(dictType);
    setDictLabels(dictLabel);
  }, [props.state.dicts]);

  useEffect(() => {
    if (props.match.params.id === String(-1)) {
      setCreateOrAdd(false);
      return;
    }
    (async () => {
      try {
        const res = await GET_DICT({ id: props.match.params.id });
        if (!res.success) return;
        setDataDict(res.data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [props.match.params.id]);

  async function onFormSubmit(e: FormEvent) {
    e.preventDefault();
    try {
    } catch (error) {
      console.log(error);
    }
  }

  function onFinish() {}

  return (
    <Form
      labelCol={formItemLayout.labelCol}
      wrapperCol={formItemLayout.wrapperCol}
      className="login-form"
      initialValues={{
        type_view: dataDict.type_view,
        label_view: dataDict.label_view,
        name: dataDict.name,
        value: dataDict.value,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        label="字段类"
        rules={[{ required: true, message: '请选择字段类!' }]}
      >
        <Select defaultValue={dataDict.type}>
          {
            dictTypes.map((item) => (
              <Select.Option value={item.value} key={item.title}>{ item.title }</Select.Option>
            ))
          }
        </Select>
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item
        label="字段组"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Select defaultValue={dataDict.label}>
          {
            dictLabels.map((item) => (
              <Select.Option value={item.value} key={item.title}>{ item.title }</Select.Option>
            ))
          }
        </Select>
      </Form.Item>
      <Form.Item
        name="name"
        label="字段名"
        rules={[{ required: true, message: '请输入字段名!' }]}
      >
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="value"
        label="字段值"
        rules={[{ required: true, message: '请输入字段值!' }]}
      >
        <Input placeholder="Username" />
      </Form.Item>

      <Form.Item wrapperCol={tailFormItemLayout.wrapperCol}>
        <Button type="primary" htmlType="submit" className="login-form-button">
          确定
        </Button>
      </Form.Item>
    </Form>
  );
};

export default connect(mapState2Props)(withRouter(UserDetail));
