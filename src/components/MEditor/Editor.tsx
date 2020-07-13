import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/addon/display/autorefresh';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';

const IS_MOBILE = typeof navigator === 'undefined' || (
  navigator.userAgent.match(/Android/i)
  || navigator.userAgent.match(/webOS/i)
  || navigator.userAgent.match(/iPhone/i)
  || navigator.userAgent.match(/iPad/i)
  || navigator.userAgent.match(/iPod/i)
  || navigator.userAgent.match(/BlackBerry/i)
  || navigator.userAgent.match(/Windows Phone/i)
);

interface PropsI {
  value: string;
  mode: string;
  theme: string;
  keyMap: string;
  onChange: (instance: CodeMirror.Editor, change: CodeMirror.EditorChangeLinkedList[]) => void;
}

const Editor = (props: PropsI) => (
  <CodeMirror
    width="50%"
    value={props.value}
    onChange={props.onChange}
    options={{
      keyMap: props.keyMap,
      mode: props.mode,
      theme: props.theme,
    }}
  />
);

export default Editor;
