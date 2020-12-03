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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set( {
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (err) {
            console.log('Failed to create user', err.message)
        }
    }


    return userRef;
}

export const addCollectionAndDocuments = async ( collectionKey, objectsToAdd ) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectsToAdd.forEach( obj => {
        const newDocRef = collectionRef.doc();
        batch.set( newDocRef, obj )
    })

    return await batch.commit()
}

export const convertCollectionsSnapshotToMap = collections => {
    const transformedCollections = collections.docs.map( doc => {
        const { title, items } = doc.data();

        return ({
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        })
    })

    return transformedCollections.reduce( (accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator
    }, {})
}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;