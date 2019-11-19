import React from 'react';
import { Grid, GridList } from '@material-ui/core';
import { getUsers } from '../../services/firebase'
import UserItem from './user-item';

class Users extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            users: []
        };
    };


    async componentDidMount() {
        const { res, success } = await getUsers()
        if (success) {
            this.setState({ users: res })
        }
    }

    mapUserList = () => {
        const { users } = this.state;
        return users.map(user => {
                return (<UserItem email={user.email} key={user.id} id={user.id} name={user.name}/>)
            
        })
    }

    render() {
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