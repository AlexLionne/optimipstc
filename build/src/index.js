import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter} from "react-router-dom";
import {reactLocalStorage} from "reactjs-localstorage";
import firebase from "./firebase";

const connection_max_time = 3600;
let notifications = [];
const uid = reactLocalStorage.get('uid');

if (uid !== null) {
    checkSession(uid);
}

/**
 * function checkSession : permet de verifier si la sessions stockée en backend dans firebase et toujours valide
 * temps maximum d'une sessions : ``session_maxtime = 3600 ``
 * @param uid
 */
function checkSession(uid) {
    let time = new Date();
    let to = time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds();

    firebase.database().ref('/sessions/' + uid).once('value').then(function (snapshot) {
        if (snapshot.val() !== null) {
            if (to <= snapshot.val().session_max_time) {
                firebase.database().ref('/users/' + uid).once('value').then(function (snapshot) {
                    login(snapshot.val().mail, snapshot.val().password.toString());
                });
                registerSession();
            } else {
                logout();
            }
        }
    });
}

/**
 *
 */
function registerSession() {
    let uid = firebase.auth().currentUser.uid;
    let time = new Date();
    firebase.database().ref('sessions/' + uid).set({
        connection_time: (time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds()),
        session_max_time: (time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds()) + connection_max_time
    });
}

function unRegisterSession() {
    let uid = firebase.auth().currentUser.uid;
    firebase.database().ref('sessions/' + uid).remove();
    reactLocalStorage.clear();
}

function logout() {
    unRegisterSession();
    window.location.href = '/';
}

function getNotifications() {
    firebase.database().ref('demandes/').once('value', function (snapshot) {
        if (snapshot.val() !== null) {
            Object.values(snapshot.val()).map((notification, i) => {
                if (reactLocalStorage.get('super_admin') === 'true') {
                    notifications.push(notification)
                }
            });
            reactLocalStorage.setObject('notifications', {'notifications': notifications});
        }
    });
};

function login(email, password) {
    firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
            firebase.database().ref('users/' + res.user.uid).once('value', function (snapshot) {
                reactLocalStorage.set('admin', snapshot.val().admin);
                reactLocalStorage.set('super_admin', snapshot.val().super_admin);
                if (snapshot.val().structure_id !== undefined) {
                    reactLocalStorage.setObject('structures', snapshot.val().structure_id);
                } else {
                    reactLocalStorage.setObject('structures', null);
                }
            });
            reactLocalStorage.set('uid', res.user.uid);
            registerSession();
            getNotifications();
        })
        .catch((error) => {

        });
}

ReactDOM.render(<BrowserRouter><App/></BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();