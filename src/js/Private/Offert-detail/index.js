import React, { useState } from 'react';
import queryString from 'query-string';
import _ from 'lodash';
import { Grid, Typography, Avatar, Button, Snackbar, CircularProgress, TextField, LinearProgress } from '@material-ui/core'
import { Map } from '@material-ui/icons';
import { OfertModel, ServiceModel, CommentModel } from '../../models';
import OffertService from '../../services/offerts';
import CommentService from '../../services/comments';
import ServiceService from '../../services/service';
import { getUserid } from '../../services/storage';
import Comments from './components/comments';

class OffertDetails extends React.Component {
    constructor(props) {
        super(props)
        this.offertService = new OffertService();
        this.commentService = new CommentService();
        this.serviceService = new ServiceService();
        const search = queryString.parse(props.location.search)
        this.offertModel = new OfertModel({ ...search });
        this.state = {
            comments: [],
            comment: '',
            sendingComment: false,
            showSnack: false,
            loading: false

        }
    }
    async componentDidMount() {
        await this.getComments()
    }

    getComments = async () => {
        const response = await this.commentService.getComments(this.offertModel)
        console.log('response', response);
        if (response.success) {
            this.setState({ comments: response.res })

        } else {
            console.log(response);
            alert("No se pudo crear su comentario intente de nuevo")
        }

    }

    createComment = async (event) => {
        const { comment } = this.state;
        event.preventDefault()
        this.setState({ sendingComment: true })
        const commentModel = new CommentModel({ userId_own: getUserid(), comment, offertId: this.offertModel.id });
        const response = await this.commentService.createComment(commentModel)
        this.setState({ sendingComment: false })
        if (response.success) {
            commentModel.id = response.res;
            this.setState({
                comment: '',
                comments: [commentModel, ...this.state.comments,]
            })
        } else {
            console.log(response);
            alert("No se pudo crear su comentario intente de nuevo")
        }
    }

    applyOffert = async () => {
        this.setState({ loading: true })
        const offertResult = await this.offertService.closeOffert(this.offertModel);
        const servRespose = await this.serviceService.createService(new ServiceModel({ price: this.offertModel.price, title: this.offertModel.title, userId_own: this.offertModel.userId, user_guest: getUserid() }))
        this.setState({ loading: false })
        if (offertResult.success && servRespose.success) {
            this.setState({ showSnack: true })
        } else {
            alert("No pudo aplicar su oferta. Intente mas tarde")
            console.log(offertResult, servRespose);
        }

    }

    setComment = ({ target }) => this.setState({ comment: target.value })

    render() {
        const { loading, showSnack, comment, comments, sendingComment } = this.state;
        return (
            <Grid container component='main' className={'offert-details-container'}>
                <Grid item sm={12} >
                    <Typography style={{marginBottom:10}} variant="h4">{this.offertModel.title}</Typography>
                </Grid>
                <Grid item sm={10} >
                    <div className="contact-data">
                        <div>
                            <Typography variant="h5">Señor ofertante</Typography>
                            <Typography variant="body1">
                                <Map></Map>
                                Barranquilla,Colombia
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="h5">Telefono:xxxxx</Typography>
                            <Typography variant="h5">email:xxxxx</Typography>
                        </div>
                    </div>
                </Grid>

                <Grid item sm={12}>
                    <Typography>Cosas por hacer</Typography>
                    <ul>
                        <li>{this.offertModel.details}</li>
                    </ul>
                </Grid>
                <Grid item sm={12}>
                    <Typography variant='h5'>Etiquetas</Typography>
                    <Typography variant='caption'>
                        {_.map(this.offertModel.keywords, (keyword) => (` ${keyword}, `)).slice(3, 7)}
                    </Typography>
                </Grid>
                <Grid item sm={12} className="buttons-container" >
                    <Button
                        color='primary'
                        variant='contained'
                        size='medium'
                        onClick={() => this.props.history.goBack()}>
                        Atras
                      </Button>

                    {!loading && <Button
                        color='secondary'
                        variant='contained'
                        size='medium'
                        onClick={this.applyOffert}>
                        Aplicar oferta
                     </Button>}
                    {loading && <CircularProgress />}
                </Grid>
                <div style={{ width: "60vw" }}>
                    <form style={{ marginBottom: 20 }} onSubmit={this.createComment}>
                        <TextField
                            variant="filled"
                            fullWidth
                            label="Agrega tu comentario"
                            color="primary"
                            required
                            onChange={this.setComment}
                            value={comment}
                        />
                    </form>
                    {sendingComment && <LinearProgress style={{ marginBottom: 10 }} />}
                    <Comments comments={comments} />
                </div>
                <Snackbar
                    open={showSnack}
                    autoHideDuration={6000}
                    onClose={() => this.setState({ showSnack: false })}
                    message={<span id="message-id">Oferta enviada correctamente</span>}
                />
            </Grid>
        )
    }


}


export default OffertDetails