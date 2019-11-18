import React from 'react';
import { Card, CardHeader, CardContent, Typography, CardActions, IconButton } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';

export default function OffertItem({ title, price,onEdit, onDelete }) {
    return (
        <Card style={{ minWidth: 200, height: "fit-content", margin: 10, minHeight: 40 }}>
            <CardHeader title={title} />
            <CardContent >
                <Typography>
                    {title}
                </Typography>
                <Typography>
                    Por : {price}
                </Typography>
            </CardContent>
            <CardActions >
                <IconButton color="primary" onClick={onEdit} >
                    <Edit />
                </IconButton>
                <IconButton onClick={onDelete} >
                    <Delete />
                </IconButton>
            </CardActions>
        </Card>
    )
}