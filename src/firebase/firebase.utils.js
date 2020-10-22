import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAssP-gkL4GJZBnr8K10Cf8FSJ4lAPRQMw",
    authDomain: "crown-db-57650.firebaseapp.com",
    databaseURL: "https://crown-db-57650.firebaseio.com",
    projectId: "crown-db-57650",
    storageBucket: "crown-db-57650.appspot.com",
    messagingSenderId: "648109224981",
    appId: "1:648109224981:web:e9c917893aa5c0a10dca1c",
    measurementId: "G-5HSY08K8YR"
}

firebase.initializeApp(config)

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;