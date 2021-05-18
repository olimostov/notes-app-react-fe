import React, { useEffect, useState } from 'react';
import { useAppState } from '../AppState';
import { Link } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const Auth = props => {
  const type = props.match.params.form;
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: ''
  });
  const [userData, setUserData] = useState(null);
  const { state, dispatch } = useAppState();
  console.log('state :>> ', state);

  useEffect(() => {
    if (userData) {
      console.log('userData :>> ', userData);
      const { token, user } = userData;
      dispatch({ type: 'auth', payload: { token, username: user.username } });
      window.localStorage.setItem(
        'auth',
        JSON.stringify({ token, username: user.username })
      );
      props.history.push('/dashboard');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  const actions = {
    signup: () => {
      return fetch(`${state.url}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }).then(res => res.json());
    },
    login: () => {
      return fetch(`${state.url}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }).then(res => res.json());
    }
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log('formData :>> ', JSON.stringify(formData));
  };

  const handleSubmit = e => {
    e.preventDefault();

    actions[type]().then(data => {
      setUserData(data);
    });
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          { props.location.pathname === '/auth/login'? 'Log In':'Sign Up'}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}

            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"

            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
            {props.location.pathname==='/auth/login'?
          <>
              <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log In
          </Button>
          <Grid container>

            <Grid item>

                <Link to='/auth/signup' variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
            </Grid>
          </Grid>
          </>:
              <>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container>

                <Grid item>
                <Link to='/auth/login' variant="body2">
                  {"Already registered? Log In"}
                </Link>
              </Grid>
              </Grid>
              </>
              }


        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
};
export default Auth;
