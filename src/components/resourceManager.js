import React, { useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import AceEd from './aceed'
import ResourceList from './resourceList'
import ReactResizeDetector from 'react-resize-detector';

function ResourceManager(props) {

    const [resourceState, setResourceState] = React.useState({
        "current": Object.keys(props.resources)[0],
        'files': props.resources
    })

    const currentResource = resourceState.files[resourceState.current]

    function onResourceContentChange(newCode) {
        const newState = {
            "current": resourceState.current,
            'files':  {
                ...resourceState.files, [resourceState.current]:
                  { 'url': currentResource.url, 'content': newCode }
            }
        }
        setResourceState(newState)
        if (props.onResourceChange)
            props.onResourceChange(newState.files)
    }

    function onResourceUrlChange(event) {
        const newState = {
            "current": resourceState.current,
            'files': {
                ...resourceState.files, [resourceState.current]:
                    { 'url': event.target.value, 'content': currentResource.content }
            }
        }
        setResourceState(newState)
        if (props.onResourceChange)
            props.onResourceChange(newState.files)
    }

    const aceResourceRef = useRef()

    const resizeAce = (ref) => {
        if (!ref.current) return

        ref.current.editor.resize()
    }

    function onSelectedResource(reason, oldName, newName) {
        const newStateFiles = {...resourceState.files}
        switch (reason) {
            case 'delete':
                delete newStateFiles[oldName]
                break
            case 'update':
                newStateFiles[newName] = newStateFiles[oldName]
                delete newStateFiles[oldName]
                break
            case 'add':
                newStateFiles[newName] =
                    {'url': 'http://my.url.com/content', 'content': '{"new": "some content"}'}
                break;
            default: break 
        }
        resourceState.files = {...newStateFiles}
        resourceState.current= newName

        setResourceState({...resourceState})

        if (reason!=='select' && props.onResourceChange)
            props.onResourceChange(resourceState.files)
    }


    return (

        <div className="resource-Panel-Row tab-Content">
            <div style={{
                width: "240px", borderRightWidth: "1px",
                borderRightColor: 'grey', borderRightStyle: "solid"
            }}>
                <ResourceList list={Object.keys(resourceState.files)} onSelectedResource={onSelectedResource}></ResourceList>
            </div>
            <div className="resource-Panel tab-Content">
                <ReactResizeDetector handleWidth handleHeight onResize={() => { resizeAce(aceResourceRef) }} />
                <TextField className="tab-Fixed-Content" label="Resource Path/Url" onChange={onResourceUrlChange} value={currentResource.url}></TextField>
                <AceEd ref={aceResourceRef} name="resource" onChange={onResourceContentChange} value={currentResource.content} />
            </div>
        </div>

    );
}

export default ResourceManager;
