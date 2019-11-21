import React from 'react';
import {
    Typography,
    Card,
    CardHeader,
    IconButton,
    CardContent,
    CardActions,
} from '@material-ui/core'
import queryString from 'query-string'
import { Edit, Delete } from '@material-ui/icons';
import { withRouter } from 'react-router-dom'
import { UserModel } from '../../models';
import { deleteUserById } from '../../services/firebase';

function UserItem({ email, id, name, ...props }) {
    const [hidden, setHidden] = React.useState(false)
    const userModel = new UserModel({ name, id, email })
    const params = queryString.stringify(userModel);
    const goToEdit = () => {
        props.history.push(`/user-edit?${params}`)
    }
    const deleteUser = async () => {
        console.log('delete', userModel);
        // eslint-disable-next-line no-restricted-globals
        const shouldDelete = confirm("¿Esta seguro que desea borrar ?" + userModel.name)
        if(!shouldDelete) return;
        const r = await deleteUserById(userModel.id)
        if (r.success) {
            alert("Usuario eliminado")
            setHidden(true)
        } else {
            alert("No se pudo eliminar usuario")
        }
    }
    if(hidden) return null
    return (
        <Card elevation={4} className="user-item-container" style={{ maxWidth: 200 }}>
            <CardHeader
                titleTypographyProps={{ style: { fontSize: 15 } }}
                title={email}
            />
            <CardContent>
                <Typography variant="h6" color="textSecondary" component="p">
                    {name}
                </Typography>
            </CardContent>
            <CardActions >
                <IconButton aria-label="edit" onClick={goToEdit}>
                    <Edit />
                </IconButton>
                <IconButton aria-label="edit" onClick={deleteUser}>
                    <Delete />
                </IconButton>
            </CardActions>

        </Card>
    )
}
export default withRouter(UserItem);