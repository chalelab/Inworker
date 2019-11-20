import React from 'react';
import { Typography, TextField, Button, CircularProgress, TextareaAutosize } from '@material-ui/core'
import queryString from 'query-string'
import OffertService from '../../services/offerts';
import { OfertModel } from '../../models';

export default function CreateOffertPage(props) {
    const offertService = new OffertService()
    const [title, setTitle] = React.useState("");
    const [details, setDetails] = React.useState("");
    const [price, setPrice] = React.useState(0);
    const [headingText, setHeadingText] = React.useState("Crea una oferta");
    const [loading, setLoading] = React.useState(false);

    const offert = queryString.parse(props.location.search);
    const offertModel = new OfertModel(offert);
    const isEditing = !!offertModel.id;
    React.useEffect(() => {
        if (isEditing) {
            setTitle(offertModel.title)
            setPrice(offertModel.price)
            setDetails(offertModel.details)
            setHeadingText(`Editando oferta: ${offertModel.title}`);
        }
    }, [isEditing, offertModel.title, offertModel.price, offertModel.details])



    async function createOffert(event) {
        event.preventDefault();

        if (isEditing) {
            const r = await offertService.updateOffert(new OfertModel({ title, price, id: offertModel.id, details }))
            if (r.success) {
                props.history.goBack()
            } else {
                alert("No se pudo editar su oferta")
            }
        } else {

            const _ofertModel = new OfertModel({ title, price, details })
            setLoading(true)
            const r = await offertService.createOffert(_ofertModel)
            setLoading(false)
            console.log('createOffert', r);
            if (r.success) {
                props.history.goBack()
            } else {
                alert("No se pudo crear su oferta")
            }

        }
    }

    return (
        <div className="create-ofert-container">
            <Typography variant="h3" className="create-ofert-title">{headingText}</Typography>
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
                    value={title}

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
                    value={price}

                />
                <TextField
                    name="details"
                    label="Detalle de la oferta"
                    className="input-container"
                    onChange={e => setDetails(e.target.value)}
                    value={details}
                    multiline
                    rowsMax="4"
                    variant="outlined"
                />
                {/* <TextField
                    id="filled-multiline-flexible"
                    label="Multiline"
                    multiline
                    rowsMax="4"
                    value={value}
                    onChange={handleChange}
                    className={classes.textField}
                    margin="normal"
                    variant="filled"
                /> */}
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