import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import PrivateAppBar from './components/appbar'
import Search from './Search';
import Results from './Results';
import OffertDetails from './Offert-detail';
import About from './About';
import Updates from './Updates';
import Profile from './Profile';
import Users from './Users';
import UserEdit from './Users/user-edit';
import EditProfile from './Profile/user-edit';
/**
 * 
 * Rutas privadas 
 */
function Private(props) {
  return (
    <main>
      <BrowserRouter>
        <PrivateAppBar signout={props.signout} />
        <div style={{ marginTop: 64 }}>

          <Route path="/" exact component={Search} />
          <Route path="/results" component={Results} />
          <Route path="/offert-details" component={OffertDetails} />
          <Route path="/about" component={About} />
          <Route path="/updates" component={Updates} />
          <Route path="/profile" component={Profile} />
          <Route path="/users" component={Users} />
          <Route path="/user-edit/:id" component={UserEdit} />
          <Route path="/edit-profile/:id" component={EditProfile} />
        </div>
        {/* <Redirect to='/' /> */}
      </BrowserRouter>
    </main>
  );
}

export default Private;
