import firebase from "firebase";

let config = {
    apiKey: "AIzaSyCv0_nihFtTq9pok9ZUBL87z-5lRXmOwS0",
    authDomain: "optimips-tc-160ea.firebaseapp.com",
    databaseURL: "https://optimips-tc-160ea.firebaseio.com",
    projectId: "optimips-tc-160ea",
    storageBucket: "optimips-tc-160ea.appspot.com",
    messagingSenderId: "528744122656",
    appId: "1:528744122656:web:5bae12872604ed97"
};
//called once
firebase.initializeApp(config);
firebase.auth().languageCode = 'fr';
export default firebase;