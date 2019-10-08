import React from 'react';
import { Grid, Typography, Card, Button } from '@material-ui/core'
import Logo from '../../utils/Logo'
export default function About(props) {
    return (
        <div container className='about-container'>
            <Logo />
            <Typography variant='h4'>
                Esta página web fue diseñada para encontrar trabajadores y trabajos
            </Typography>
            <Typography variant='h5'>
                <b>Creado por:</b>SEBASTIAN ANDRADES - BENJAMIN CHALELA - JEAN PALACIO
            </Typography>
            <Button color='primary'
                variant='contained'
                size='medium'
                onClick={() => props.history.push('/updates')}
            >Actualizaciones</Button>
        </div>
    )
}