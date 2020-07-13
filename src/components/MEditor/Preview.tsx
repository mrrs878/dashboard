import React from 'react';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';
import style from './preview.module.less';

interface PropsI {
  value: string;
  fullscreen?: boolean;
}

const Preview = (props: PropsI) => (
  <div className={`container ${props.fullscreen ? style.fullscreen : ''}`} style={{ display: 'block' }}>
    <ReactMarkdown
      source={props.value}
      renderers={{ code: CodeBlock }}
    />
  </div>
);

export default Preview;
