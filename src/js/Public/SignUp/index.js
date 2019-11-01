import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import { SnackbarContentWrapper } from '../../utils/SnackbarContentWrapper';
import firestore from "./../../services/firestore";
import Logo from './../../utils/Logo';
import Loading from './../../utils/Loading';
import { signup, updateUser } from './../../services/firebase';
import { saveToken, saveUserid } from '../../services/storage';

function submitt(){
  this.handleSubmit();
  this.agregarusuario();
}
const agregarusuario = e => {
  e.preventDefault();
  const db = firestore.firestore();
  db.settings({
    timestampsInSnapshots: true
  });
  const userRef = db.collection("usuarios").add({
    fullname: this.state.fullname,
    email: this.state.email
  });  
  this.setState({
    email: "",
    password: "",
  });
};
function SignUp(props) {
  const [variant, setVariant] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [loading] = React.useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (evt) => {

    evt.preventDefault();
    if (email && password) {
      if (password === confirmPassword) {
        // setLoading(true);
        const { res, success } = await signup(email, password)

        if (success) {
          saveToken(res.idToken)
          saveUserid(res.localId)
          await updateUser({email,avatar:"https://spng.pngfly.com/20190328/he/kisspng-black-white-m-chandigarh-product-design-font-c-user-svg-png-icon-free-download-177426-online-5c9d947d94b306.0045060215538310376091.jpg"})
          setVariant('success');
          setMessage('Cuenta creada exitosamente');
          setTimeout(() => {
            props.history.replace('/')
            props.setAuthentication(true)
          }, 2000)
        } else {
          setOpenSnackbar(true);
          setVariant('error');
          setMessage(res);
        }

      } else {
        setVariant('error');
        setMessage('Las contraseñas no coinciden');
        setOpenSnackbar(true);
        setPassword('');
        setConfirmPassword('');
      }
    } else {
      setVariant('error');
      setMessage('Digite todos los campos');
      setOpenSnackbar(true);
      setPassword('');
      setConfirmPassword('');
    }
  };

  const handleClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container component="main" maxWidth="xs" className="signup">
      {loading &&
        <Loading />
      }

      <form onSubmit={submitt}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <Logo />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography component="h1" variant="h5" align='center'>
              Crea tu cuenta
              </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Correo"
              name="email"
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}

            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}

            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="passwordConfirm"
              label="Confirmar contraseña"
              type="password"
              id="passwordConfirm"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}

            />
          </Grid>

          {/* <Grid item xs={12}>
            <Button
              startIcon=''
              variant="contained"
              color="primary"
              className="button"
            >
              Cargar foto
          </Button>
          </Grid> */}
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="button"
            >
              Sign Up
          </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography component="p">¿Ya tienes cuenta? <Link to="/login">¿Inicia sesión?</Link></Typography>
          </Grid>
        </Grid>
      </form>


      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <SnackbarContentWrapper
          onClose={handleClose}
          variant={variant}
          message={message}
        />
      </Snackbar>
    </Container>
  );
}

export default SignUp;
