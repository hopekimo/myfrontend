import { firebase } from './core';

const google = new firebase.auth.GoogleAuthProvider();
google.addScope('https://www.googleapis.com/auth/contacts.readonly');

/**
 * Logs a user out
 * @method logUserOut
 * @module letters/backend/auth
 * @return {Promise}
 */
export function logUserOut() {
    return firebase.auth().signOut();
}

/**
 * Logs the user in with Github
 * @method loginWithGithub
 * @module letters/backend/auth
 * @return {void}
 */
export function loginWithGoogle() {
    return firebase.auth().signInWithPopup(google);
}

/**
 * Gets the user, if any, from Firebase
 * @method getFirebaseUser
 * @module letters/backend/auth
 * @return {FireBaseUser}
 */
export function getFirebaseUser() {
    return new Promise(resolve => firebase.auth().onAuthStateChanged(user => resolve(user)));
}

/**
 * Gets the token from firebase
 * @method getFirebaseToken
 * @module letters/backend/auth
 * @return {string}
 */
export function getFirebaseToken() {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) {
        return Promise.resolve(null);
    }
    return currentUser.getIdToken(true);
}