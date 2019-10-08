import React from 'react';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Logo from '../../utils/Logo';

function Home() {
  const inworkerBold = <b>Inworkers.</b>
  return (
    <Grid container component="main" className="container">
      <Grid item xs={12} sm={6} md={7} className="home">
        <div className="content">
          <Logo />
        </div>
      </Grid>
      <Grid item xs={12} sm={6} md={5} className="home">
        <div className="content">
          <Typography component="h5" variant="h4">Consigue trabajo haciendo lo que mas te gusta</Typography>
          <Typography component="p">Únete hoy a {inworkerBold}</Typography>
          <Typography component="p">¿Ya tienes cuenta? <Link to="/login">¿Inicia sesión?</Link></Typography>
          <Typography component="p">¿Nuevo en {inworkerBold}? <Link to="/signup">Regístrate ahora »</Link></Typography>
        </div>
      </Grid>
    </Grid>
  );
}

export default Home;
