import React, { useCallback, useEffect, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Button, Divider, Form, Input, Radio, Cascader } from 'antd';
import { connect } from 'react-redux';
import { uniq } from 'ramda';
import { Store } from 'antd/lib/form/interface';
import { RuleObject, StoreValue } from 'rc-field-form/lib/interface';

import { CascaderOptionType } from 'antd/es/cascader';
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
      span: 6,
      offset: 6,
    },
    sm: {
      span: 10,
      offset: 10,
    },
  },
};

const DictDetail = (props: PropsI) => {
  const [dataDict, setDataDict] = useState<DictI>(new Dict());
  const [createOrUpdate, setCreateOrUpdate] = useState(false);
  const [dictStatus, setDictStatus] = useState<Array<{ value: number; title: string }>>([]);
  const [dictValues, setDictValues] = useState<Array<number>>([]);
  const [dictNames, setDictNames] = useState<Array<string>>([]);
  const [typeAndLabels, setTypeAndLabels] = useState<Array<CascaderOptionType>>([]);
  const [form] = Form.useForm();

  const updateDictNamesAndValues = useCallback(() => {
    if (!form.getFieldValue('typeAndLabel')) return;
    const [type, label] = form.getFieldValue('typeAndLabel');
    const _dictValues = props.state?.dicts
      ?.filter((item) => item.type === type && item.label === label && (createOrUpdate ? true : item.value !== dataDict.value))
      ?.map((item) => item.value);
    const _dictNames = props.state?.dicts
      ?.filter((item) => item.type === type && item.label === label && (createOrUpdate ? true : item.name !== dataDict.name))
      ?.map((item) => item.name);
    setDictNames(_dictNames);
    setDictValues(_dictValues);
  }, [createOrUpdate, dataDict, form, props.state]);

  useEffect(() => {
    const _dictTypes = uniq(props.state.dicts.map((item) => ({ value: item.type, label: item.type_view })));
    const _dictLabels = uniq(props.state.dicts.map((item) => ({ value: item.label, label: item.label_view, type: item.type })));
    const _dictStatus = props.state.dicts.filter((item) => item.label === 'status').map((item) => ({ value: item.value, title: item.name }));
    const _typeAndLabels = _dictTypes.map((item) => ({
      value: item.value,
      label: item.label,
      children: _dictLabels.filter((_item) => _item.type === item.value),
    }));
    setTypeAndLabels(_typeAndLabels);
    setDictStatus(_dictStatus);
  }, [props.state.dicts]);

  useEffect(() => {
    form.setFieldsValue({
      type_view: dataDict.type_view,
      label_view: dataDict.label_view,
      typeAndLabel: [dataDict.type, dataDict.label],
      name: dataDict.name,
      status: dataDict.status,
      value: dataDict.value,
    });
    updateDictNamesAndValues();
  }, [dataDict, form, props.state.dicts, updateDictNamesAndValues]);

  useEffect(() => {
    if (props.match.params.id === String(-1)) {
      setCreateOrUpdate(true);
      setTimeout(form.resetFields);
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
  }, [form, props.match.params.id]);

  async function onFinish(values: Store) {
    const data = Object.assign(dataDict, values);
    if (createOrUpdate) await CREATE_DICT(data);
    else await UPDATE_DICT(data);
  }

  function onReset() {
    if (createOrUpdate) form.resetFields();
    else {
      form.setFieldsValue({
        type_view: dataDict.type_view,
        label_view: dataDict.label_view,
        typeAndLabel: [],
        name: dataDict.name,
        status: dataDict.status,
        value: dataDict.value,
      });
    }
  }

  function onCascaderChange() {
    updateDictNamesAndValues();
  }

  function validateDictValue(rule: RuleObject, value: StoreValue) {
    if (value === '') return Promise.resolve();
    const _value = value >> 0;
    return dictValues.includes(_value) ? Promise.reject(new Error('该值已被占用，请输入其他值')) : Promise.resolve();
  }

  function validateDictName(rule: RuleObject, value: StoreValue) {
    console.log(dictNames);
    if (value === '') return Promise.resolve();
    return dictNames.includes(value) ? Promise.reject(new Error('该名称已被占用，请输入其他值')) : Promise.resolve();
  }

  return (
    <div className="container">
      <Form
        form={form}
        labelCol={formItemLayout.labelCol}
        wrapperCol={formItemLayout.wrapperCol}
        onFinish={onFinish}
        onReset={onReset}
      >
        <Form.Item
          label="字段类/组"
          name="typeAndLabel"
          rules={[{ required: true, message: '请选择字段类/组!' }]}
        >
          <Cascader
            onChange={onCascaderChange}
            options={typeAndLabels}
            placeholder="请选择字段类/组"
          />
        </Form.Item>
        <Form.Item
          name="name"
          label="字段名"
          rules={[{ required: true, message: '请输入字段名!' }, { validator: validateDictName }]}
        >
          <Input placeholder="请输入字段名" />
        </Form.Item>
        <Form.Item
          name="value"
          label="字段值"
          rules={[{ required: true, message: '请输入字段值!' }, { validator: validateDictValue }]}
        >
          <Input placeholder="请输入字段值" value={dataDict.value} />
        </Form.Item>
        <Form.Item
          name="status"
          label="状态"
          rules={[{ required: true, message: '请选择字段状态!' }]}
        >
          <Radio.Group value={dataDict.status}>
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
          <Button type="primary" htmlType="submit">
            { createOrUpdate ? '确定' : '添加' }
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default connect(mapState2Props)(withRouter(DictDetail));
