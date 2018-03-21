import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { withStyles } from 'material-ui/styles';
import red from 'material-ui/colors/red';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';


const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const appbar = red[900]; // #F44336

export default class Header extends React.Component {
  render() {
    return (<div>
      <AppBar position="static" color={appbar}>
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu">
            <MenuIcon/>
          </IconButton>
          <h2>
            ScrollBear
          </h2>
        </Toolbar>
      </AppBar>
    </div>);
  }
}
