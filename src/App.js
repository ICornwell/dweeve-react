import React, { useRef } from 'react';
import ResizePanel from "react-resize-panel"
import classNames from 'classnames/bind';
import SimpleTabs from './components/simpletabs';

import AceEd from './components/aceed'
import SideBar from './components/sibebar'
import ResourceManager from './components/resourceManager'
import dweeve from 'dweeve'
import dweevefns from 'dweeve/lib/functions/core'

import { ReactTerminal } from "react-terminal"
import { TerminalContextProvider } from "react-terminal"

import ReactResizeDetector from 'react-resize-detector';

import style from './App.css';

let cx = classNames.bind(style);

function App() {
  var timingInfo = 'No time recorded'

  const [dweeveEnv, setDweeveEnv] = React.useState(
    {
      "code": '',
      "payload": '',
      "results": '?',
      "time": timingInfo,
      "resources": {
            'Resource file 1':
                { 'url': 'http://resources.com/file1', 'content': '{"sample": "text" }' }
        }
    })

  function onCodeChange(newCode) {
    const newEnv = { ...dweeveEnv, "code": newCode }
    execute(newEnv)
  }

  function onPayloadChange(newPayload) {
    const newEnv = { ...dweeveEnv, "payload": newPayload }
    execute(newEnv)
  }

  function onSelectExample(example) {
    const newEnv = { ...dweeveEnv, "code": example.dwl, "payload": example.payload,
      "resources" : { 'example resource' : { 'url': example.resourceName, 'content': example.resourceText}} }
    execute(newEnv)
  }

  function findResource(env, path) {
    const resourceFiles = Object.values(env.resources)
    const resource = resourceFiles.find(r => r.url && r.url === path)

    return (resource && resource.content) ? resource.content : "resource not found: "+ path
  }

  function execute(env) {

    dweevefns.setResourceLoader((path, type) => findResource(env, path))

    const response = dweeve.runWithTimes(env.code, env.payload, {}, {})
    const times = response.times
    const result = response.result

    timingInfo = `Dweeve parsed in: ${times.parser}ms, transpiled in ${times.transpiler}ms and executed in: ${times.execution}ms`
    if (dweeveEnv.results !== result)
      setDweeveEnv({ ...env, "results": result, "time": timingInfo })
  }

  function replExecute(expr) {

    dweevefns.setResourceLoader((path, type) => findResource(dweeveEnv, path))

    let dwScript = expr
    const dwSplit = dweeveEnv.code.split('\n---');
    if (dwSplit.length === 2) {
      dwScript = dwSplit[0] + '\n---' + dwScript;
    }
    const response = dweeve.runWithTimes(dwScript, dweeveEnv.payload, {}, {})
    const times = response.times
    const result = response.result
    timingInfo = `Dweeve parsed in: ${times.parser}ms, transpiled in ${times.transpiler}ms and executed in: ${times.execution}ms`
    return timingInfo + '\n' + result;

  }

  const aceCodeRef = useRef()
  const acePayloadRef = useRef()
  const aceResultRef = useRef()

  const resizeAce = (ref) => {
    if (!ref.current) return

    ref.current.editor.resize()
  }
  
  function onResourceChange(files) {
    const newEnv = { ...dweeveEnv, resources: files }
    execute(newEnv)
  }

  return (
    <TerminalContextProvider>
      <div className="App">
        <div className={cx('container')}>

          <div className={cx('header')} height="100px" style={{ display: "flex", textAlign: "center" }}>
            <SideBar caption={"Examples <--"} onSelect={onSelectExample} ></SideBar>
            <h3 style={{ flex: "auto" }} >dweeve-react-doofer</h3>
          </div>

          <div className={cx('body')}>
            <ResizePanel width="60%" direction="e" style={{ flexGrow: '1' }} >
              <div className={cx('content', 'panel')}>
                <ReactResizeDetector handleWidth handleHeight onResize={() => resizeAce(aceCodeRef)} />
                <AceEd ref={aceCodeRef} name="code" value={dweeveEnv.code} onChange={onCodeChange} />
              </div>
            </ResizePanel>
            <div width="400px" className={cx('sidebar', 'panel')}>
              <ReactResizeDetector handleWidth handleHeight onResize={() => { resizeAce(acePayloadRef) }} />
              <SimpleTabs captions={["Payload", "Resource Files"]}>
                <AceEd ref={acePayloadRef} name="payload" value={dweeveEnv.payload} onChange={onPayloadChange} />
                <ResourceManager resources={dweeveEnv.resources} onResourceChange={onResourceChange}></ResourceManager>
              </SimpleTabs>
            </div>

          </div>

          <ResizePanel direction="n" style={{ flexGrow: '1', flex: 'auto' }}>
            <div className={cx('footer', 'panel')}>
              <div className={cx('footerArea')}>
                <div className={cx('footerAreaContent')}>
                  <SimpleTabs captions={["Results", "REPL"]} style={{ height: "100%" }}>
                    <div className="resource-Panel tab-Content">
                      <span>{dweeveEnv.time}</span>
                      <ReactResizeDetector handleWidth handleHeight onResize={() => resizeAce(aceResultRef)} />
                      <AceEd ref={aceResultRef} name="results" value={dweeveEnv.results} />
                    </div>
                    <div className="resource-Panel tab-Content">
                      <ReactTerminal className="tab-Content"
                        theme='dark'
                        showControlButtons='False'
                        prompt='->'
                        welcomeMessage="d-weeve REPL tool"
                        errorMessage="Unknown command, use '?' to evaluate expressions."
                        commands={{ '__eval':  (expr) => replExecute(expr) }}
                      />
                    </div>
                  </SimpleTabs>
                </div>
              </div>
              <div className={cx('footerBottomBar')}>
                check out <a href="https://github.com/ICornwell/dweeve">https://github.com/ICornwell/dweeve</a> for more info.
            </div>
            </div>
          </ResizePanel>
        </div>
      </div>
    </TerminalContextProvider>
  );
}

export default App;
