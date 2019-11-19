import React from 'react';
import {
    Typography,
    Card,
    CardHeader,
    IconButton,
    CardContent,
    CardActions,
} from '@material-ui/core'
import { Edit } from '@material-ui/icons';
import { withRouter } from 'react-router-dom'

function UserItem({ email, id, name, ...props }) {

    const goToEdit = () => {

        props.history.push(`/user-edit/${id}`)
    }
    return (
        <Card elevation={4} className="user-item-container" >
            <CardHeader
                title={email}

            />
            <CardContent>
                <Typography variant="h4" color="textSecondary" component="p">
                    {name}
                </Typography>
                <CardActions onClick={goToEdit}>
                    <IconButton aria-label="edit">
                        <Edit />
                    </IconButton>
                </CardActions>
            </CardContent>

        </Card>
    )
}
export default withRouter(UserItem);