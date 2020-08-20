import React from 'react';
import AceEditor from "react-ace";

/*eslint-disable no-alert, no-console */
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";
//import "dwlAceMode/mode-dwl";
//import "dwlAceMode/theme-dweeve";
import "ace-builds/src-noconflict/mode-json5";
import "ace-builds/src-noconflict/theme-github";

import "ace-builds/webpack-resolver";
import "dwlAceMode/webpack-resolver";


const AceEd = React.forwardRef((props, ref) => {

  const [value, setValue] = React.useState({"props": props.value, "ace": props.value});

  const onChange = (newValue) => {
    setValue({...value, "ace": newValue});
    if (props.onChange)
        props.onChange(newValue)
  };

  if (props.value !== value.props)
    setValue({"props": props.value, "ace": props.value})

  return (
              <AceEditor height="100%" width="100%"
                mode="dwl"
                theme="dweeve"
                ref={ref}
                value={value.ace}
                onChange={onChange}
                name={props.name}
                editorProps={{ $blockScrolling: true }}
              />
            
  );
})

export default AceEd;
