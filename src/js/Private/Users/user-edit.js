import React from 'react';
import { TextField, Button, CircularProgress } from '@material-ui/core'
import { getUserById, updateUserById } from '../../services/firebase';
import queryString from 'query-string'
import { UserModel } from '../../models';

class UserEdit extends React.Component {
    constructor(props) {
        super(props)
        const userModelParams = queryString.parse(props.location.search)

        this.userModel = new UserModel(userModelParams);
        console.log(this.userModel);

        this.state = {
            email: this.userModel.email,
            name: this.userModel.name,
            loading: false
        }
    }


    async componentDidMount() {
        // const { id } = this.props.match.params;
        // const { success, res } = await getUserById(id)

        // if (success) {
        //     this.setState({
        //         email: res.email,
        //         name: res.name
        //     })
        // }
    }
    handleChange = name => event => {
        this.setState({ [name]: event.target.value })
    };
    onSubmit = async (event) => {
        event.preventDefault();
        const { name, email } = this.state;
        this.setState({ loading: true })
        const r = await updateUserById(this.userModel.id, { name })
        this.setState({ loading: false })
        if (r.success) {
            this.props.history.goBack()
        } else {
            alert("No se pudo actualizar")
        }

    }
    render() {
        const { email, name, loading } = this.state;
        return (
            <form onSubmit={this.onSubmit} >
                <div className="user-edit-container">
                    <TextField
                        variant="outlined"
                        value={name}
                        label="Nombre"
                        onChange={this.handleChange('name')}
                    />
                    {/* <TextField
                        variant="outlined"
                        value={email}
                        label="Correo"
                        onChange={this.handleChange('email')}
                    /> */}
                    <div>
                        {loading ? (
                            <CircularProgress />
                        ) : <Button
                            color="primary"
                            variant="contained"
                            type="submit">
                                Guardar
                        </Button>}
                    </div>
                </div>
            </form>
        )
    }
}
export default UserEdit;