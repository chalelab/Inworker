import React from 'react';
import _ from 'lodash';
import queryString from 'query-string';
// import { Link } from 'react-router-dom'
import { Grid, Typography, Paper, Button, CircularProgress } from '@material-ui/core'
import OffertService from '../../services/offerts';

function Results(props) {
    const [loading, setLoading] = React.useState(true);
    const [results, setResults] = React.useState([]);
    const { search } = queryString.parse(props.location.search)
    console.log({ search });
    const onClick = (offert) => () => {
        props.history.push('/offert-details')
    }
    React.useEffect(() => {

        searchOfferts(search)
    }, [search])

    async function searchOfferts(text) {
        const offertService = new OffertService()
        setLoading(true)
        const { res, success } = await offertService.searchOfferts(text)
        if (success) {
            setResults(res)
        }
        setLoading(false)
    }


    if (loading) {
        return (
            <div className="loading-results-container">
                <CircularProgress className="circular-progress" />
                <Typography>Cargando resultados</Typography>
            </div>

        )
    }

    if (_.isEmpty(results)) {
        return (
            <div className="loading-results-container">
                <Typography variant="h3">Sin resultados</Typography>
            </div>
        )
    }
    return (
        _.map(results, (offert) => {
            return (
                <ResultItem
                    key={offert.id}
                    onClick={onClick(offert)}
                    title={offert.title}
                />)
        })
    )
}
function ResultItem({ title, onClick }) {
    return (
        <Grid item xs={12} onClick={onClick} className="result-item-container">
            <Paper className="result-item-content" >
                <Typography variant='h4'>
                    {title}
                </Typography>
                <Typography >
                    Lugar: Nogales
            </Typography>
                <Typography >
                    Fecha: 2012-12
            </Typography>
                <div className={'button-container'}>
                    <Button variant="contained" color="secondary" onClick={onClick}>
                        Ver mas
                    </Button>
                </div>
            </Paper>
        </Grid>
    )
}
export default Results