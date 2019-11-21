import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

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
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (route) => () => {
    setAnchorEl(null);
    if (route) props.history.push(route)
  };
  return (
    <div className={classes.root} >
      <AppBar position="fixed" >
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          </IconButton> */}
          <Typography variant="h6" className={classes.title} onClick={()=>props.history.push("/")}>
            Inworkers
          </Typography>
          <Button color="inherit" onClick={() => props.history.push('/my-services')} >Mis servicios</Button>
          <Button color="inherit" onClick={() => props.history.push('/my-offerts')} >Mis ofertas</Button>
          <Button color="inherit" onClick={() => props.history.push('/users')} >Usuarios</Button>
          <Button color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} >Cuenta</Button>
          <Menu
            onBackdropClick={handleClose()}
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted={false}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            
          >
            <MenuItem dense  onClick={handleClose("/profile")}>Perfil</MenuItem>
            <MenuItem dense onClick={handleClose("/about")}>Acerca de esta pagina</MenuItem>
            <MenuItem dense onClick={signout}>Cerrar sesión</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

    </div>
  );
}
export default withRouter(MyAppBar)