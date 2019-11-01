import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.scss';
import Main from './js';
import * as serviceWorker from './serviceWorker';
import  firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBePNpesPBLXP3BuAoAyq2C0hhByY7R5oU",
    authDomain: "inworkers-2241d.firebaseapp.com",
    databaseURL: "https://inworkers-2241d.firebaseio.com",
    projectId: "inworkers-2241d",
    storageBucket: "inworkers-2241d.appspot.com",
    messagingSenderId: "1055751489893",
    appId: "1:1055751489893:web:a36a2078dbd20b0302f98c",
    measurementId: "G-2TVDG9MPYN"
};

firebase.initializeApp(config)
firebase.analytics();


ReactDOM.render(<Main />, document.getElementById('root'));
serviceWorker.unregister();
