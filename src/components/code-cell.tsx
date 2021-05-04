import { useState } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import bundle from '../bundler';
import Resizable from './resizable';
const CodeCell = () => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');

  const onClick = async () => {
    const output = await bundle(input);
    setCode(output);
  };

  return (
    <Resizable direction='vertical'>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        {/* initial value of editor is passed below */}
        <CodeEditor
          initialValue="const a = 1;
                      console.log(a);"
          onChange={(value) => setInput(value)}
        />
        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;