import React from 'react'
import _ from 'lodash';
import { Grid, Card, CardHeader, CardContent, Typography, Avatar, Grow, CardActions, IconButton } from '@material-ui/core'
import { Edit, Delete } from '@material-ui/icons';
import { CommentModel } from '../../../models';
import { getUserid } from '../../../services/storage';

/**
 * 
 * @param {{comments:[CommentModel]}} param0 
 */
const Comments = ({ comments }) => {
    return (
        <div >
            <Typography variant="h4" style={{ marginBottom: 10 }}>Comentarios</Typography>
            {_.map(comments, com => (
                <CommentItem
                    key={com.id}
                    comment={com.comment}
                    isOwn={com.userId_own === getUserid()}

                />
            ))}
        </div>
    )
}
const CommentItem = ({ comment, onEdit, onDelete, isOwn }) => {
    const [mounted, setMounted] = React.useState(false)
    React.useEffect(() => {
        setTimeout(() => {
            setMounted(true)
        }, 200);
    }, [mounted]);

    return (
        <Grow in={mounted}>
            <Card style={{ marginTop: 10 }} >
                <CardContent>
                    <Typography>
                        {comment}
                    </Typography>
                </CardContent>
                {isOwn && <CardActions disableSpacing >
                    <IconButton color="primary" onClick={onEdit} >
                        <Edit />
                    </IconButton>
                    <IconButton onClick={onDelete} >
                        <Delete />
                    </IconButton>
                </CardActions>}
            </Card>
        </Grow>
    )
}

export default Comments
