import React, { useState } from 'react';
import queryString from 'query-string';
import _ from 'lodash';
import { Grid, Typography, Avatar, Button, Snackbar, CircularProgress, Badge } from '@material-ui/core'
import { Map } from '@material-ui/icons';
import { OfertModel, ServiceModel } from '../../models';
import OffertService from '../../services/offerts';
import ServiceService from '../../services/service';
import { getUserid } from '../../services/storage';

function OffertDetails(props) {
    const search = queryString.parse(props.location.search)
    const offertModel = new OfertModel({ ...search });

    const offertService = new OffertService();
    const serviceService = new ServiceService();
    const [showSnack, setShowSnack] = useState(false);
    const [loading, setLoading] = useState(false);

    async function applyOffert() {
        setLoading(true);
        const offertResult = await offertService.closeOffert(offertModel);
        const servRespose = await serviceService.createService(new ServiceModel({ price: offertModel.price, title: offertModel.title, userId_own: offertModel.userId, user_guest: getUserid() }))
        setLoading(false);
        if (offertResult.success && servRespose.success) {
            setShowSnack(true)

        } else {
            alert("No pudo aplicar su oferta. Intente mas tarde")
            console.log(offertResult, servRespose);
        }

    }
    return (
        <Grid container component='main' spacing={2} className={'offert-details-container'}>
            <Grid item sm={12}>
                <Typography variant="h4">{offertModel.title}</Typography>
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
                    <li>{offertModel.details}</li>
                </ul>
            </Grid>

            <Grid item sm={12}>
                <Typography variant='h5'>Ciudad: Barranquilla</Typography>
                <div className="mapa"></div>
            </Grid>
            <Grid item sm={12}>
                <Typography variant='h5'>Etiquetas</Typography>
                <Typography variant='caption'>
                    {_.map(offertModel.keywords, (keyword) => (` ${keyword}, `)).slice(3, 7)}
                </Typography>
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