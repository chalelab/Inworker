import React from 'react';
import { Typography, TextField, Button, CircularProgress } from '@material-ui/core'
import OffertService from '../../services/offerts';
import OfertModel from '../../models/offert';

export default function CreateOffertPage(props) {
    const [title, setTitle] = React.useState("");
    const [price, setPrice] = React.useState(0);
    const [loading, setLoading] = React.useState(false);

    async function createOffert(event) {
        event.preventDefault()
        const offertService = new OffertService()
        const _ofertModel = new OfertModel({ title, price })
        setLoading(true)
        const r = await offertService.createOffert(_ofertModel)
        setLoading(false)
        console.log('createOffert', r);
        if (r.success) {
            props.history.goBack()
        } else {

        }
    }

    return (
        <div className="create-ofert-container">
            <Typography variant="h3" className="create-ofert-title">Crea una oferta</Typography>
            <form
                onSubmit={createOffert}
                className="create-ofert-container">

                <TextField
                    required
                    variant="outlined"
                    fullWidth={false}
                    name="Titulo de la oferta"
                    label="Titulo de la oferta"
                    type="text"
                    id="password"
                    className="input-container"
                    onChange={e => setTitle(e.target.value)}

                />

                <TextField
                    required
                    variant="outlined"
                    fullWidth={false}
                    name="Precio"
                    label="Precio"
                    type="number"
                    id="password"
                    className="input-container"
                    onChange={e => setPrice(e.target.value)}
                />
                <div className="buttons-container">
                    {loading && <CircularProgress />}
                    {!loading && <>
                        <Button
                            variant="contained"
                            type="submit"
                        >
                            Enviar
                    </Button>

                        <Button onClick={() => props.history.goBack()}>Cancelar</Button>
                    </>}
                </div>
            </form>

        </div>
    )
}