import React from 'react';
import { Card, CardHeader, CardContent, Typography, CardActions, IconButton } from '@material-ui/core';
import { Edit, Delete,RemoveRedEye } from '@material-ui/icons';

export default function OffertItem({ title, price, details, onEdit, onDelete,onOpen }) {
    return (
        <Card style={{ minWidth: 200, height: "fit-content", margin: 10, minHeight: 40, width: 300 }}>
            <CardHeader title={title} />
            <CardContent >
                <Typography variant="h5">
                    Por : ${price}
                </Typography>
                <Typography variant="body">
                    {details}
                </Typography>
            </CardContent>
            <CardActions >
                <IconButton  onClick={onOpen} >
                    <RemoveRedEye />
                </IconButton>
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