import React, { useState, useEffect } from 'react';
import Public from './Public';
import Private from './Private';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './theme';

import { getToken } from './services/storage';
import { signout  } from './services/firebase';

function Main() {
  const [isAuth, setIsAuth] = useState(false);

  // const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsAuth(true);
    }
  }, [isAuth]);

  const setAuthentication = val => {
    setIsAuth(val);
  }
  const _signout = () => {
    console.log('signout');
    setIsAuth(false);
    signout()
    
  }

  
  return (
    <main>
      <MuiThemeProvider theme={theme}>
        {
          isAuth ?
            <Private setAuthentication={setAuthentication} signout={_signout} />
            :
            <Public setAuthentication={setAuthentication}  />
        }

      </MuiThemeProvider>
    </main>
  );
}

export default Main;
