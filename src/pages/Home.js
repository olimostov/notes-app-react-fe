import React from 'react';
import Typography from '@material-ui/core/Typography';
import { CssBaseline } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme)=>({
  root: {
    height: '100vh',
    width: '100vw',
  },
  image: {
    height: '100vh',
    width: '100vw',
    backgroundImage: 'url(https://unsplash.com/photos/82TpEld0_e4)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],


  }
}))

const Home = props => {
  const classes = useStyles();
  return (
    <Grid container component="main" className={classes.root} >
    <CssBaseline />
    <Grid item className={classes.image} />
    {/*  <Typography variant="h2">*/}
    {/*    Welcome to the Memo App*/}
    {/*  </Typography>*/}
    </Grid>
  )
};
export default Home;
