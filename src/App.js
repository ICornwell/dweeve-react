import React from 'react';
import ResizePanel from "react-resize-panel"


import classNames from 'classnames/bind';
import AceEditor from "react-ace";

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

/*eslint-disable no-alert, no-console */
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";

import "ace-builds/src-noconflict/mode-jsx";

import style from './App.css';
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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div className={"tab-Content"} height="100%"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        children
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  colorPrimary : {
    "backgroundColor": "lightgrey"
  },
}));



let cx = classNames.bind(style);

function onChange(newValue) {
  console.log("change", newValue);
}

function App() {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="App">
      <div className={cx('container')}>

        <div className={cx('header')} height="100px">
          <span>dweeve-react-doofer</span>
        </div>

        <div className={cx('body')}>
          <ResizePanel width="60%" direction="e" style={{ flexGrow: '1' }} >
            <div className={cx('content', 'panel')}>
              <AceEditor height="100%" width="100%"
                mode="javascript"
                theme="github"
                value="dwl code"
                onChange={onChange}
                name="UNIQUE_ID_OF_DIV1"
                editorProps={{ $blockScrolling: true }}
              />
            </div>
          </ResizePanel>
          <div width="400px" className={cx('sidebar', 'panel')}>
            <div className={"resource-Panel"}>
              <Tabs  className={"tabbar"} value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab label="Payload" {...a11yProps(0)} />
                <Tab label="Resource files" {...a11yProps(1)} />
              </Tabs>
            
            <TabPanel value={value} index={0} >
              <AceEditor height="100%" width="100%"
                mode="javascript"
                theme="github"
                onChange={onChange}
                name="UNIQUE_ID_OF_DIV2"
                value="payload"
                editorProps={{ $blockScrolling: true }} />
            </TabPanel>
            <TabPanel value={value} index={1} >
              <div className="resource-Panel tab-Content">
              <TextField className="tab-Fixed-Content" label="Resource Name"></TextField>
              <AceEditor height="100%" width="100%"
                mode="javascript"                theme="github"
                onChange={onChange}
                value="other files"
                name="UNIQUE_ID_OF_DIV3"
                editorProps={{ $blockScrolling: true }}   />
              </div>
            </TabPanel>
            </div>

          </div>

        </div>

        <ResizePanel direction="n" style={{ flexGrow: '1' }}>
          <div className={cx('footer', 'panel')}>
            <div className={cx('footerArea')}>
              <div className={cx('footerAreaContent')}>
                <span>footer area, min height: 100px</span>
              </div>
            </div>
            <div className={cx('footerBottomBar')}>
              bottom bar
            </div>
          </div>
        </ResizePanel>
      </div>
    </div>
  );
}

export default App;
