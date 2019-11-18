import React from 'react';
import { Card, CardHeader, CardContent, Typography, CardActions, IconButton } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';

export default function OffertItem({ title }) {
    return (
        <Card style={{ minWidth: 100, width: 300, height: "fit-content", margin: 10, minHeight: 40 }}>
            <CardHeader title="Labore laboris ipsum eu ad exercitation id qui enim." />
            <CardContent >
                <Typography>
                    {title}
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