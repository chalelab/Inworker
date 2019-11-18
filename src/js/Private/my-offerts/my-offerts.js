import React from 'react';
import { Tabs, Tab, Box, Typography, CardActions, IconButton, CircularProgress } from '@material-ui/core';
import OffertService from '../../services/offerts';
import { Provider, Consumer } from '../../services/OffertContext'
import OffertItem from './components/offert-item';
import Tab1 from './Tab-active';
import Tab2 from './Tab-inactive';
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
export default function MyOfferts(params) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


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
                    {({ loading }) => {
                        if (loading) return (
                            <div className="loading-results-container">
                                <CircularProgress className="circular-progress" />
                                <Typography>Cargando...</Typography>
                            </div>
                        )
                        return (
                            <div>
                                <TabPanel value={value} index={0}>
                                    <Tab1 />
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    <Tab2 />
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