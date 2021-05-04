import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';
import CodeEditor from './components/code-editor';

const App = () => {
  const ref = useRef<any>();
  const iframe = useRef<any>();
  const [input, setInput] = useState('');


  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
    });
  };
  useEffect(() => {
    startService();
  }, []);

  // const onClick = async (input: string) => {
  const onClick = async () => {
    if (!ref.current) {
      return;
    }

    iframe.current.srcdoc = html;

    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [
        unpkgPathPlugin(),
        fetchPlugin(input)
      ],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
    });
    // console.log(result);

    // setCode(result.outputFiles[0].text);
    // try {
    //   eval(result.outputFiles[0].text);
    // } catch (err) {
    //   console.error(err);
    // }

    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*');
  };

  // console.log(code);

  const html = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch (err) {
              const root = document.querySelector('#root');
              root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
              console.error(err);
            }
          }, false);
        </script>
      </body>
    </html>
  `;


  // `
  //   <script>
  //     ${code}
  //   </script>
  // `

  return (
    <div>
      {/* initial value of editor is passed below */}
      <CodeEditor
        initialValue="const a = 1; console.log(a);"
        onChange={(value) => setInput(value)} />
      <textarea
        value={input}
        onChange={(e) =>
          // onClick(e.target.value);
          setInput(e.target.value)
        }
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      {/* trying to figure out iframe */}
      {/* <iframe sandbox='' srcDoc={html} /> */}
      <iframe title='code-preview' ref={iframe} sandbox='allow-scripts' srcDoc={html} />
    </div>
  );
};
// const testHtml = `
// <h1>Local HTML Test</h1>
// `


ReactDOM.render(<App />, document.querySelector('#root'));
