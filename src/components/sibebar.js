import React from 'react';
//import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeveloperMode from '@material-ui/icons/DeveloperMode';
import EmojiObjects from '@material-ui/icons/EmojiObjects';

import {Examples} from '../examples/examples'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

const examples = new Examples()

export default function SideBar(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  function onClick(name) {
      const example = examples.getExample(name)
      if (example && props.onSelect)
        props.onSelect({...example})
  }

  const list = (anchor) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {examples.getExamplesList().map((name, index) => (
          <ListItem button key={name} onClick={()=>onClick(name)}>
            <ListItemIcon>{index % 2 === 0 ? <DeveloperMode /> : <EmojiObjects />}</ListItemIcon>
            <ListItemText primary={name} />
          </ListItem>
        ))}
      </List>
     
    </div>
  );

  return (
    <div>
      
          <Button onClick={toggleDrawer("left", true)}>{props.caption}</Button>
          <Drawer anchor={"left"} open={state["left"]} onClose={toggleDrawer("left", false)}>
            {list("left")}
          </Drawer>
        
      
    </div>
  );
}
