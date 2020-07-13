import React, { useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/github.css';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('js', javascript);

interface PropsI {
  value: string;
  language: string
}

const CodeBlock = (props: PropsI) => {
  const codeEl = useRef<HTMLElement>(null);

  function highlightCode() {
    if (codeEl.current) hljs.highlightBlock(codeEl.current);
  }

  useEffect(() => {
    highlightCode();
  });

  return (
    <pre>
      <code ref={codeEl} className={`language-${props.language}`}>
        {props.value}
      </code>
    </pre>
  );
};

export default CodeBlock;
