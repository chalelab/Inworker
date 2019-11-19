import React, { useState } from 'react';
import { Grid, Typography, Avatar, Button, Snackbar, CircularProgress } from '@material-ui/core'
import { Map } from '@material-ui/icons';

function OffertDetails(props) {

    const [showSnack, setShowSnack] = useState(false);
    const [loading, setLoading] = useState(false);

    function applyOffert() {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setShowSnack(true)
        }, 2000)

    }
    return (
        <Grid container component='main' spacing={2} className={'offert-details-container'}>
            <Grid item sm={12}>
                <Typography variant="h4">Titulo de la oferta</Typography>
            </Grid>
            <Grid item sm={10} >
                <div className="contact-data">
                    <Avatar sizes >H</Avatar>
                    <div>
                        <Typography variant="h5">Señor ofertante</Typography>
                        <Typography variant="body1">
                            <Map></Map>
                            Barranquilla,Colombia
                        </Typography>
                    </div>
                    <div>
                        <Typography variant="h5">Telefono:xxxxx</Typography>
                        <Typography variant="h5">email:xxxxx</Typography>
                    </div>
                </div>
            </Grid>

            <Grid item sm={12}>
                <Typography>Cosas por hacer</Typography>
                <ul>
                    <li>Actividad 1</li>
                    <li>Actividad 2</li>
                </ul>
                <Typography>Do consequat excepteur cillum nulla dolore officia consectetur Lorem enim laborum. Culpa cupidatat reprehenderit laborum dolor incididunt esse sit ullamco Lorem. Ex ullamco quis adipisicing eu dolor tempor exercitation exercitation nulla elit. Sunt tempor ea sit quis magna sint enim. Commodo elit est consequat aute deserunt sunt sit sint elit velit dolore.</Typography>
            </Grid>

            <Grid item sm={12}>
                <Typography variant='h5'>Ciudad: Barranquilla</Typography>
                <div className="mapa"></div>
            </Grid>
            <Grid item sm={12}>
                <Typography variant='h5'>Etiquetas</Typography>
                <Typography variant='h6'>Albanil,Pared, Barranquilla</Typography>
            </Grid>
            <Grid item sm={12} className="buttons-container" >
                <Button
                    color='primary'
                    variant='contained'
                    size='medium'
                    onClick={() => props.history.goBack()}>
                    Atras
                  </Button>

                {!loading && <Button
                    color='secondary'
                    variant='contained'
                    size='medium'
                    onClick={applyOffert}>
                    Aplicar oferta
                 </Button>}
                {loading && <CircularProgress />}

            </Grid>
            <Snackbar
                open={showSnack}
                autoHideDuration={6000}
                onClose={() => setShowSnack(false)}
                message={<span id="message-id">Oferta enviada correctamente</span>}
            />
        </Grid>
    )
}

export default OffertDetails