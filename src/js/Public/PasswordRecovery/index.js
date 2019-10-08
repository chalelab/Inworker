import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import { SnackbarContentWrapper } from '../../utils/SnackbarContentWrapper';

import Logo from './../../utils/Logo';
import { passwordRecovery } from './../../services/firebase';

function PasswordRecovery() {
  const [variant, setVariant] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [email, setEmail] = useState('');


  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    if (email) {
      passwordRecovery(email)
        .then(response => {
          if (response.success) {
            setVariant('success');
            setMessage('Se ha enviado un correo para restablecer su clave');
            setOpen(true);
            setTimeout(() => {
              setEmail('');
              setLoading(false);
            }, 2000);

          } else {
            setTimeout(() => {
              setVariant('error');
              setMessage(response.res);
              setOpen(true);
              setLoading(false);
            }, 2000);
          }
        })

    } else {
      setVariant('error');
      setMessage('Digite un correo');
      setOpen(true);
      setEmail('');
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (

    <Container component="main" maxWidth="xs" className="passwordRecovery">
      {loading &&
        <div >Cargando</div>
      }
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <Logo />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography component="h1" variant="h5">
              Recupera tu contraseña
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              type="email"
              label="Correo"
              name="email"
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Enviar
        </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography component="p">¿Ya tienes cuenta? <Link to="/login">¿Inicia sesión?</Link></Typography>
            <Typography component="p">¿Nuevo en Inworkers? <Link to="/signup">Regístrate ahora »</Link></Typography>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
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

export default PasswordRecovery;
