import React from 'react'
import _ from 'lodash';
import { Grid, Card, TextField, CardContent, Typography, Avatar, Grow, CardActions, IconButton, LinearProgress } from '@material-ui/core'
import { Edit, Delete, Check, Cancel } from '@material-ui/icons';
import { CommentModel } from '../../../models';
import { getUserid } from '../../../services/storage';
import CommentService from '../../../services/comments';

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
                    id={com.id}
                    isOwn={com.userId_own === getUserid()}

                />
            ))}
        </div>
    )
}
const CommentItem = ({ id, comment, onEdit, onDelete, isOwn, onUpdate }) => {
    const [mounted, setMounted] = React.useState(false);
    const [_comment, setComment] = React.useState(comment);
    const [isEditing, setIsEditing] = React.useState(false);
    const [sendindComment, setSendingComment] = React.useState(false);
    const [deleted, setDeleted] = React.useState(false);

    React.useEffect(() => {
        if (!mounted) {
            setTimeout(() => {
                setMounted(true)
            }, 200);
        }
    });

    const updateComment = async () => {
        const commentService = new CommentService();
        setSendingComment(true)
        const r = await commentService.updateComment(new CommentModel({ comment: _comment, id }))
        setSendingComment(false)
        if (r.success) {
            setIsEditing(false)
        } else {
            alert("No se pudo editar")
            console.log(r);
        }
    }

    const deleteComment = async () => {
        // eslint-disable-next-line no-restricted-globals
        const shouldDelete = confirm("¿ Estas seguro que deseas eliminar este comentario?")
        if(!shouldDelete) {
            return null;
        }
        const commentService = new CommentService();
        const r = await commentService.deleteComment(new CommentModel({ id }))
        if (r.success) {
            setDeleted(true)
        } else {
            alert("No se pudo eliminar")
            console.log(r);
        }


    }
    if (deleted) {
        return null;
    }

    if (isEditing) {
        return (
            <Card style={{ marginTop: 10 }} >
                <CardContent>
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={_comment}
                        onChange={({ target }) => setComment(target.value)}
                    />
                    {sendindComment && <LinearProgress />}
                </CardContent>
                {isOwn && <CardActions disableSpacing >
                    <IconButton color="primary" onClick={updateComment} >
                        <Check />
                    </IconButton>
                    <IconButton onClick={() => {
                        setIsEditing(false);
                        setComment(comment);
                    }
                    } >
                        <Cancel />
                    </IconButton>
                </CardActions>}
            </Card>
        )
    }
    return (
        <Grow in={mounted}>
            <Card style={{ marginTop: 10 }} >
                <CardContent>
                    <Typography>
                        {_comment}
                    </Typography>
                </CardContent>
                {isOwn && <CardActions disableSpacing >
                    <IconButton color="primary" onClick={() => setIsEditing(true)} >
                        <Edit />
                    </IconButton>
                    <IconButton onClick={deleteComment} >
                        <Delete />
                    </IconButton>
                </CardActions>}
            </Card>
        </Grow>
    )
}

export default Comments
