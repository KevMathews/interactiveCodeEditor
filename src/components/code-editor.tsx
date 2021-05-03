import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}
const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {

    monacoEditor.onDidChangeModelContent(() => {
      // console.log(getValue());
      onChange(getValue());
    })
    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });
  };

  const onFormatClick = () => {
    // I need to get current val from editor
    // then i need to format that value
    //  finally i need to figure out how to set the
    //  formatted value back in the editor 
    //  ***  I need to figure this out next  **

  };

  return (
    <div>
      <button onClick={onFormatClick}>Format</button>
      <MonacoEditor
        editorDidMount={onEditorDidMount}
        // value is used to set initial editor text/values
        value={initialValue}
        theme="dark"
        language="javascript"
        height="500px"
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 18,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />);
    </div>
};

export default CodeEditor;