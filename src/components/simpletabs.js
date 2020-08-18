import React from 'react';

import PropTypes from 'prop-types';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


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

function SimpleTabs(props) {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={"resource-Panel"}>
        <Tabs  className={"tabbar"} value={value} onChange={handleChange} aria-label="simple tabs example">
        {props.captions.map( (caption, idx) =>  
            <Tab key={'tab'+idx} label={caption} {...a11yProps(idx)} />
        )}
        </Tabs>
        {props.children.map( (child, idx) => 
            <TabPanel key={'tabpanel'+idx} value={value} index={idx} >
            {child}
            </TabPanel>
        )}
    </div>
  );
}

export default SimpleTabs;
