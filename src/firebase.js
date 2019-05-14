import firebase from "firebase";

let config = {
    apiKey: "AIzaSyBeIE_EAfMGhEAmGP1MxVwtm_06izzEbbE",
    authDomain: "optimips-tc.firebaseapp.com",
    databaseURL: "https://optimips-tc.firebaseio.com",
    projectId: "optimips-tc",
    storageBucket: "optimips-tc.appspot.com",
    messagingSenderId: "1013757135720"
};


//called once
firebase.initializeApp(config);
firebase.auth().languageCode = 'fr';
export default firebase;