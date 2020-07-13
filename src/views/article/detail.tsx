import React, { useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { Button, Space, Upload, message } from 'antd';
import { EditOutlined, UploadOutlined, SaveOutlined } from '@ant-design/icons';
import { RcCustomRequestOptions, UploadChangeParam } from 'antd/lib/upload/interface';
import { RouteComponentProps, withRouter } from 'react-router';
import MEditor from '../../components/MEditor/Editor';
import MPreview from '../../components/MEditor/Preview';

const initialSource = `
# Live demo
    
Changes are automatically rendered as you type.

## Table of Contents

* Implements [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual, "native" React DOM elements
* Allows you to escape or skip HTML (try toggling the checkboxes above)
* If you escape or skip the HTML, no \`dangerouslySetInnerHTML\` is used! Yay!

## HTML block below

<blockquote>
  This blockquote will change based on the HTML settings above.
</blockquote>

## How about some code?
\`\`\`js
var React = require('react');
var Markdown = require('react-markdown');

React.render(
  <Markdown source="# Your markdown here" />,
  document.getElementById('content')
);
\`\`\`

Pretty neat, eh?

## Tables?

| Feature   | Support |
| --------- | ------- |
| tables    | ✔ |
| alignment | ✔ |
| wewt      | ✔ |

## More info?

Read usage information and more on [GitHub](//github.com/rexxars/react-markdown)

---------------

A component by [Espen Hovlandsdal](https://espen.codes/)
`;

interface PropsI extends RouteComponentProps<{ id: string }>{
}

const ArticleDetail = (props: PropsI) => {
  const [markdownSrc, setMarkdownSrc] = useState(initialSource);
  const [couldEdit, setCouldEdit] = useState<boolean>(false);
  const [createOrEdit, setCreateOrEdit] = useState<boolean>(false);

  useEffect(() => {
    setCreateOrEdit(props.match.params.id === '-1');
  }, []);

  function onMarkdownChange(instance: CodeMirror.Editor) {
    setMarkdownSrc(instance.getValue());
  }

  function onToggleEditable() {
    setCouldEdit(!couldEdit);
  }

  function onUploadChange(info: UploadChangeParam) {
  }

  function upload(options: RcCustomRequestOptions) {
    const fileReader = new FileReader();
    fileReader.readAsText(options.file);
    fileReader.onload = () => setMarkdownSrc(fileReader.result?.toString() || '');
    fileReader.onerror = () => message.error('上传失败！');
  }

  function onSaveClick() {}

  return (
    <div className="container">
      <Space className="controller">
        <Button icon={<EditOutlined />} onClick={onToggleEditable} type={couldEdit ? 'primary' : 'default'}>编辑</Button>
        <Upload accept=".md" onChange={onUploadChange} customRequest={upload} showUploadList={false}>
          <Button>
            <UploadOutlined />
            上传Markdown文件
          </Button>
        </Upload>
        <Button icon={<SaveOutlined />} onClick={onSaveClick}>{ createOrEdit ? '发表' : '保存更改' }</Button>
      </Space>
      <br />
      <div style={{
        display: couldEdit ? 'flex' : 'unset', justifyContent: 'space-between', flexDirection: 'row', overflow: 'auto',
      }}
      >
        <MPreview value={markdownSrc} fullscreen={!couldEdit} />
        {
          couldEdit
          && (
          <MEditor
            mode="markdown"
            theme="monokai"
            keyMap="sublime"
            value={markdownSrc}
            onChange={onMarkdownChange}
          />
          )
        }
      </div>
    </div>
  );
};

export default withRouter(ArticleDetail);
