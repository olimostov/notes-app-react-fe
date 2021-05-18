import React from 'react';
import { Link } from 'react-router-dom';
import { useAppState } from '../AppState';


import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { CssBaseline } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));




const Nav = props => {
  const classes = useStyles();
  const { state, dispatch } = useAppState();

  return (
<>
  <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Memo
          </Typography>

          {state.token ? null:(

<>
            <Link to='/auth/signup'><Button color="inherit">Sign Up</Button></Link>
            <Link to='/auth/login'><Button color="inherit">Login</Button></Link>
</>
          )}
          {state.token ? (
              <Button
                color="inherit"
                onClick={()=>{
                  dispatch({ type: 'logout' });
                  props.history.push('/');
                }}>Logout</Button>
            ):null}


        </Toolbar>
      </AppBar>
</>
  );
};
export default Nav;
