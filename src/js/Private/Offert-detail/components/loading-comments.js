import React from 'react'
import { CircularProgress, Typography } from '@material-ui/core'

export default function LoadingComments() {
    return (
        <div className="loading-comments-container">
            <CircularProgress style={{ marginBottom: 10 }} />
            <Typography>
                Cargando comentarios un momento por favor
            </Typography>
        </div>
    )
}
