import React from 'react';
import AceEditor from "react-ace";

/*eslint-disable no-alert, no-console */
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-jsx";

import "ace-builds/webpack-resolver";


const languages = [
  "javascript",
  "java",
  "python",
  "xml",
  "ruby",
  "sass",
  "markdown",
  "mysql",
  "json",
  "html",
  "handlebars",
  "golang",
  "csharp",
  "elixir",
  "typescript",
  "css"
];

const themes = [
  "monokai",
  "github",
  "tomorrow",
  "kuroir",
  "twilight",
  "xcode",
  "textmate",
  "solarized_dark",
  "solarized_light",
  "terminal"
];

languages.forEach(lang => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
  require(`ace-builds/src-noconflict/snippets/${lang}`);
});

themes.forEach(theme => require(`ace-builds/src-noconflict/theme-${theme}`));


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
                mode="javascript"
                theme="github"
                ref={ref}
                value={value.ace}
                onChange={onChange}
                name={props.name}
                editorProps={{ $blockScrolling: true }}
              />
            
  );
})

export default AceEd;
