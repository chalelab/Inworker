import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'
import Logo from '../../../assets/inworkers.jpeg'

import { TextField, Grid, Button } from '@material-ui/core';


function Search(props) {
    const [search, setSearch] = useState('');
    const [goToResult] = useState(false);

    if (goToResult) {
        return <Redirect to='/results' />
    }
    function searchOfferts(event) {
        event.preventDefault();
        props.history.push(`results?search=${String(search).toLowerCase()}`)

    }
    return (
        <Grid component="main" className='search-container' >
            <img src={Logo} className={'logo'} alt='Logo' />
            <form className='search-input-container' onSubmit={searchOfferts}>
                <TextField
                    id="outlined-name"
                    label="Buscar oferta"
                    fullWidth
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    margin="normal"
                    variant="outlined"
                />
            </form>
            {/* <Grid item sm={12} >
                <MenuPopupState />
            </Grid> */}
            <Grid item sm={12}>
                <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => props.history.push("/create-offert")}

                    className='add-ofert-button'>
                    Agregar oferta
                </Button>
            </Grid>
        </Grid>
    )
}

export default Search