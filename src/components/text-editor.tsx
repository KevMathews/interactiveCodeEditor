import { useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';

const TextEditor: React.FC = () => {
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (ref.current && event.target && ref.current.contains(event.target as Node)) {
        console.log('this click is inside editor');
        return;
      }
      console.log('this click is not inside editor')
      setEditing(false);
      // console.log(event.target)
    };
    //  console.log(listener)
    document.addEventListener('click', listener, { capture: true });

    return () => {
      document.removeEventListener('click', listener, { capture: true })
    };

  }, [])

  if (editing) {
    return (
      <div ref={ref}>
        <MDEditor />
      </div>
    )
  }
  return (
    <div onClick={() => {
      setEditing(true);
    }}>
      {/* <MDEditor /> */}
      <MDEditor.Markdown source={'# Header'} />
    </div>

  )
};
export default TextEditor;