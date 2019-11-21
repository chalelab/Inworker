import React from 'react';
import { Grid, GridList,CircularProgress, Typography } from '@material-ui/core';
import { getUsers } from '../../services/firebase'
import UserItem from './user-item';

class Users extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            users: [],
            loading: true
        };
    };


    async componentDidMount() {
        this.setState({ loading: true })
        const { res, success } = await getUsers()
        this.setState({ loading: false })
        if (success) {
            this.setState({ users: res })
        }
    }

    mapUserList = () => {
        const { users } = this.state;
        return users.map(user => {
            return (<UserItem email={user.email} key={user.id} id={user.id} name={user.name} />)

        })
    }

    render() {
        const { loading } =  this.state;
        if(loading){
            return (
                <Grid className='users-container users-loading-container'>
                   <CircularProgress/>
                   <Typography>
                       Cargando
                   </Typography>
            </Grid>
            )
        }
        return (
            <Grid className='users-container'>
                <GridList>
                    {this.mapUserList()}
                </GridList>
            </Grid>
        )
    }
}
export default Users;