import firebase from 'firebase';

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN
};

try {
    firebase.initializeApp(config);
} catch (e) {
    console.error('Error initializing firebase — check your source code');
    console.error(e);
}

export { firebase };