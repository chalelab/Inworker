import React from 'react';
import { TextField, Button } from '@material-ui/core'
import { getUserById, updateUserById } from '../../services/firebase';

class UserEdit extends React.Component {
    state = {
        email: '',
        name: ''
    }
    async componentDidMount() {
        const { id } = this.props.match.params;
        const { success, res } = await getUserById(id)

        if (success) {
            this.setState({
                email: res.email,
                name: res.name
            })
        }
    }
    handleChange = name => event => {
        this.setState({ [name]: event.target.value })
    };
    onSubmit = async (event) => {
        event.preventDefault();
        const { id } = this.props.match.params;
        const { name, email } = this.state;
        await updateUserById(id, { name, email })

    }
    render() {
        const { email, name } = this.state;
        return (
            <form className="user-edit-container" onSubmit={this.onSubmit}>
                <TextField
                    variant="outlined"
                    value={name}
                    label="Nombre"
                    onChange={this.handleChange('name')}
                />
                <TextField
                    variant="outlined"
                    value={email}
                    label="Correo"
                    onChange={this.handleChange('email')}
                />
                <Button
                    color="primary"
                    variant="contained"
                    type="submit">Guardar</Button>
            </form>
        )
    }
}
export default UserEdit;