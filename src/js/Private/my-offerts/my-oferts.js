import React from 'react';
import { Card, CardHeader, CardContent, Tabs, Tab, Box, Typography, CardActions, IconButton } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';

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
        <div>
            <Tabs
                variant="fullWidth"
                value={value}
                onChange={handleChange} aria-label="simple tabs example" width="100%">
                <Tab label="Activas" {...a11yProps(0)} />
                <Tab label="Cerradas" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <div className="my-offerts-container">
                    <OffertItem />
                    <OffertItem />
                    <OffertItem />
                    <OffertItem />
                    <OffertItem />
                </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <div className="my-offerts-container">
                    <OffertItem />
                </div>
            </TabPanel>
        </div>
    )
}

function OffertItem(params) {
    return (
        <Card style={{ minWidth: 200, width: 300, height: "fit-content", margin: 10, minHeight: 100 }}>
            <CardHeader title="Labore laboris ipsum eu ad exercitation id qui enim." />
            <CardContent >
                <Typography>
                    Tempor proident dolor nulla excepteur et laborum dolor incididunt. Sint enim laboris sunt esse reprehenderit. Enim irure excepteur exercitation pariatur sit eu laboris laboris minim voluptate nostrud Lorem veniam. Magna irure reprehenderit incididunt incididunt cillum occaecat aute laboris enim esse qui esse amet. Mollit cillum cupidatat in proident non culpa ipsum culpa. Nulla nulla et id nulla quis culpa tempor enim dolor minim. Veniam culpa tempor commodo dolore qui cupidatat.
                    </Typography>
            </CardContent>
            <CardActions >
                <IconButton color="primary">
                    <Edit />
                </IconButton>
                <IconButton >
                    <Delete />
                </IconButton>
            </CardActions>
        </Card>
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