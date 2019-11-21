import React from 'react';
import { Typography, TextField, Button, CircularProgress, TextareaAutosize } from '@material-ui/core'
import queryString from 'query-string'
import OffertService from '../../services/offerts';
import { OfertModel, ServiceModel } from '../../models';
import ServiceService from '../../services/service';

export default function ServiceEdit(props) {
    const serviceService = new ServiceService()
    const [title, setTitle] = React.useState("");
    const [details, setDetails] = React.useState("");
    const [price, setPrice] = React.useState(0);
    const [headingText, setHeadingText] = React.useState("Crea un servicio");
    const [loading, setLoading] = React.useState(false);

    const service = queryString.parse(props.location.search);
    const serviceModel = new ServiceModel(service);
    const isEditing = !!serviceModel.id;
    React.useEffect(() => {
        if (isEditing) {
            setTitle(serviceModel.title)
            setDetails(serviceModel.details)
            setHeadingText(`Editando servicio: ${serviceModel.title}`);
        }
    }, [isEditing, serviceModel.title, serviceModel.details])



    async function createOffert(event) {
        event.preventDefault();

        if (isEditing) {
            const r = await serviceService.updateService(new ServiceModel({ title, price, id: serviceModel.id }))
            if (r.success) {
                props.history.goBack()
            } else {
                console.log(r);
                alert("No se pudo editar su servicio")
            }
        } else {

            const _ofertModel = new OfertModel({ title, price, details })
            setLoading(true)
            const r = await serviceService.createOffert(_ofertModel)
            setLoading(false)
            console.log('createOffert', r);
            if (r.success) {
                props.history.goBack()
            } else {
                alert("No se pudo crear")
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
                    name="Titulo de servicio"
                    label="Titulo de servicio"
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
                {/* <TextField
                    name="details"
                    label="Detalle de la oferta"
                    className="input-container"
                    onChange={e => setDetails(e.target.value)}
                    value={details}
                    multiline
                    rowsMax="4"
                    variant="outlined"
                /> */}
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