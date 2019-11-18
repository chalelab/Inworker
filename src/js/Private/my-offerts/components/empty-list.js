import React from 'react';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'

export default function EmptyOffertList() {
    return (
        <Container>
            <Grid alignItems="center" >
                <Typography>No tienes ofertas</Typography>
            </Grid>
        </Container>
    )
}