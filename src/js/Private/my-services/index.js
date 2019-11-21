import React from 'react';
import { Tabs, Tab, Box, Typography, CircularProgress } from '@material-ui/core';
import queryString from 'query-string';
import { Provider, Consumer } from '../../services/ServiceContext'
import Tab1 from './Tab-active';
import Tab2 from './Tab-inactive';
import ServiceService from '../../services/service';
// import { OfertModel } from '../../models';
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
export default function MyServices(props) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    /**
     * 
     * @param {OfertModel} offert 
     */
    const deleteService = (getMyServices) => (service) => async () => {
        // eslint-disable-next-line no-restricted-globals
        const shouldDelete = confirm(`¿ Esta seguro que deseas borrar el servicio ${service.title}`);
        if (shouldDelete) {
            const serviceService = new ServiceService()
            const response = await serviceService.deleteService(service)
            if (response.success) {
                getMyServices()
            } else {
                alert("No pudo borrar")
                console.log(response);
            }
        }
    }
    /**
    * 
    * @param {} offert 
    */
    const editService = (offert) => () => {
        const params = queryString.stringify(offert)
        props.history.push(`my-services-edit?${params}`)

    }


    return (
        <Provider>
            <div>
                <Tabs
                    variant="fullWidth"
                    value={value}
                    onChange={handleChange} aria-label="simple tabs example" width="100%">
                    <Tab label="Activas" {...a11yProps(0)} />
                    <Tab label="Cerradas" {...a11yProps(1)} />
                </Tabs>
                <Consumer>
                    {({ loading, getMyServices }) => {
                        if (loading) return (
                            <div className="loading-results-container">
                                <CircularProgress className="circular-progress" />
                                <Typography>Cargando...</Typography>
                            </div>
                        )
                        return (
                            <div>
                                <TabPanel value={value} index={0}>
                                    <Tab1
                                        onDelete={deleteService(getMyServices)}
                                        onEdit={editService}
                                    />
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    <Tab2
                                        onDelete={deleteService(getMyServices)}
                                        onEdit={editService}
                                    />
                                </TabPanel>
                            </div>
                        )
                    }}
                </Consumer>

            </div>
        </Provider>

    )
}



function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}