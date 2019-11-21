import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.scss';
import Main from './js';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase';
import { Provider } from './js/services/AuthContext';

export const config = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_DATABASEURL,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,
    measurementId: process.env.REACT_APP_MEASUREMENTID,
};

firebase.initializeApp(config)
firebase.analytics();
ReactDOM.render(
    <Provider>
        <Main />
    </Provider>,
    document.getElementById('root'));
serviceWorker.unregister();
