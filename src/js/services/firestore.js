import firebase from "firebase"
require("firebase/firestore")
const config = {
    apiKey: "AIzaSyBePNpesPBLXP3BuAoAyq2C0hhByY7R5oU",
    authDomain: "inworkers-2241d.firebaseapp.com",
    databaseURL: "https://inworkers-2241d.firebaseio.com",
    projectId: "inworkers-2241d",
    storageBucket: "inworkers-2241d.appspot.com",
    messagingSenderId: "1055751489893"
 };
 firebase.initializeApp(config);
var db = firebase.firestore();
export default db;