import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'
import Logo from '../../../assets/inworkers.jpeg'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import { TextField, Grid, Menu, MenuItem, Button } from '@material-ui/core';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';


function Search(props) {
    const [search, setSearch] = useState('');
    const [goToResult, setGoToResult] = useState(false);

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