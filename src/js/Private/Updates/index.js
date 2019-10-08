import React from 'react';
import { Grid, Typography, Card } from '@material-ui/core'
import Logo from '../../utils/Logo'
export default function Updated(params) {
    return (
        <div container className='about-container'>
        <Logo/>
            <Typography variant='h4'>
                <b>Proximas actualizaciones:</b>
            </Typography>
            <Typography variant='h5'>
               Se agregarán cambios proximanente
            </Typography>
        </div>
    )
}