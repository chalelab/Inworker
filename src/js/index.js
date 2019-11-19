import React from 'react';
import Public from './Public';
import Private from './Private';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './theme';

import { Consumer } from './services/AuthContext';

function Main() {
  return (
    <main>
      <Consumer>
        {({ isAuth, setAuth, signout }) => {
          console.log({isAuth, setAuth, signout})
          return (
            <MuiThemeProvider theme={theme}>
              {
                isAuth ?
                  <Private setAuthentication={setAuth} signout={signout} />
                  :
                  <Public setAuthentication={setAuth} />
              }

            </MuiThemeProvider>
          )
        }}

      </Consumer>
    </main>
  );
}

export default Main;
