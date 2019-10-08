import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Home/';
import Login from './Login/';
import SignUp from './SignUp/';
import PasswordRecovery from './PasswordRecovery/';
import PublicAppbar from './components/appbar';
function Public(props) {
  return (
    <main>
      <BrowserRouter>
        <PublicAppbar />
        <Route path="/" exact component={Home} />
        <Route path="/login" render={(routerProps) => <Login setAuthentication={props.setAuthentication} {...routerProps}/>} />
        <Route path="/signup" render={(routerProps) => <SignUp setAuthentication={props.setAuthentication}  {...routerProps} />}  />
        <Route path="/passwordRecovery" component={PasswordRecovery} />
      </BrowserRouter>
    </main>
  );
}

export default Public;
