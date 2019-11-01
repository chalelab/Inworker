import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { withRouter } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
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

function MyAppBar(props) {
  const classes = useStyles();
  function signout(params) {
    props.history.replace('/')
    props.signout()
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" >
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            Inworkers
          </Typography>
          <Button color="inherit" onClick={() => props.history.push('/profile')} >Perfil</Button>
          <Button color="inherit" onClick={() => props.history.push('/users')} >Usuarios</Button>
          <Button color="inherit" onClick={() => props.history.push('/about')} >Acerca de esta pagina</Button>
          <Button color="inherit" onClick={signout} >Cerrar sesion</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default withRouter(MyAppBar)