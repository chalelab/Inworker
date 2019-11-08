import React, { createContext, useState } from 'react'
import { getToken } from './storage';
import { signout } from './firebase';

const AuthContext = createContext();

const { Consumer } = AuthContext;

const Provider = ({ children }) => {

  const [isAuth, setAuth] = useState(false)

  const _signout = () => {
    console.log('signout');
    setAuth(false);
    signout()

  }
  React.useEffect(() => {
    const uid = getToken();
    if (uid) {
      setAuth(true)
    }

  }, [isAuth]);

  const value = {
    isAuth,
    setAuth,
    signout: _signout
  }

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
}
export { Provider, Consumer }