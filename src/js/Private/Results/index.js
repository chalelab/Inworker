import React from 'react';
// import { Link } from 'react-router-dom'
import { Grid, Typography, Paper, Button } from '@material-ui/core'

function Results(props) {
    function onClick() {
        props.history.push('/offert-details')
    }
    return (
        <Grid component='main' container direction='column'>
            <ResultItem onClick={onClick} />
            <ResultItem onClick={onClick}/>
        </Grid>
    )
}
function ResultItem(props) {
    return (
        <Grid item xs={12} >
            <Paper className={'result-item-container'} >
                <Typography variant='h4'>
                    Albañil
            </Typography>
                <Typography >
                    Lugar: Nogales
            </Typography>
                <Typography >
                    Fecha: 2012-12
            </Typography>
                <div className={'button-container'}>
                    <Button variant="contained" color="secondary" onClick={props.onClick}>
                        Ver mas
                    </Button>
                </div>
            </Paper>
        </Grid>
    )
}
export default Results