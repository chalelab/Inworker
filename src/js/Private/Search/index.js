import React, { useState } from 'react';
import {  Redirect } from 'react-router-dom'
import Logo from '../../../assets/inworkers.jpeg'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import { TextField, Grid, Menu, MenuItem, Button } from '@material-ui/core';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';


function Search(params) {
    const [search, setSearch] = useState('');
    const [goToResult, setGoToResult] = useState(false);

    if (goToResult) {
        return <Redirect to='/results' />
    }
    return (
        <Grid  component="main" className='search-container' >
            <img src={Logo} className={'logo'} alt='Logo' />
            <div className='search-input-container'>
                <TextField
                    id="outlined-name"
                    label="Busca trabajos disponibles"
                    // className={classes.textField}
                    fullWidth
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    margin="normal"
                    variant="outlined"
                />
                <Button
                    onClick={ ()=>setGoToResult(true)}
                    color="secondary">
                    Buscar
                </Button>

            </div>
            <Grid item sm={12} >
                <MenuPopupState />
            </Grid>
            <Grid item sm={12}>
                <Button
                    color="secondary"
                    variant="contained"
                    
                    className='add-ofert-button'>
                    Agregar oferta
                </Button>
            </Grid>
        </Grid>
    )
}

function MenuPopupState() {
    return (
        <PopupState variant="popover" popupId="demo-popup-menu">
            {popupState => (
                <React.Fragment>
                    <Button variant="contained" color='primary' {...bindTrigger(popupState)}>
                        Barranquilla
                    <ArrowDropDownIcon />
                    </Button>
                    <Menu {...bindMenu(popupState)}>
                        <MenuItem onClick={popupState.close}>Barranquilla</MenuItem>
                    </Menu>
                </React.Fragment>
            )}
        </PopupState>
    );
}
export default Search