import React from 'react';
import { Typography } from '@material-ui/core'
import Logo from '../../utils/Logo'
export default function Updated(params) {
    return (
        <div container className='about-container'>
        <Logo/>
            <Typography variant='h4'>
                <b>Próximas actualizaciones:</b>
            </Typography>
            <Typography variant='h5'>
               Se agregarán cambios proximamente
            </Typography>
        </div>
    )
}