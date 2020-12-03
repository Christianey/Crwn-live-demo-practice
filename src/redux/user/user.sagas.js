import { takeLatest, call, put, all } from 'redux-saga/effects';
import { auth, googleProvider, createUserProfileDocument } from '../../firebase/firebase.utils'
import { SignInSuccess, SignInFailure, signOutFailure, signOutSuccess } from './user.actions';
import userActionTypes from './user.types';

function* getSnapshot(user) {
    try {
        const userRef = yield call( createUserProfileDocument, user );
        const userSnapshot = yield userRef.get();
        return userSnapshot;
    } catch(err) {
        yield console.log(err)
    }

}

function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        const userSnapshot = yield call(getSnapshot, user);
        yield put( SignInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }) ) 
    } catch (error) {
        yield put( SignInFailure( error.message ) )
    }
}

function* signInWithEmail({ payload: { email, password }}) {
    try {
        const {user} = yield auth.signInWithEmailAndPassword(email, password);
        const userSnapshot = call(getSnapshot, user);
        yield put( SignInSuccess({ id: userSnapshot.id, ...userSnapshot.data }))
      } catch (error) {
        yield put( SignInFailure(error) );
      }
}      

export function* onGoogleSignInStart() {
    yield takeLatest( userActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle )
}

export function* onEmailSignInStart() {
    yield takeLatest( userActionTypes.EMAIL_SIGN_IN_START, signInWithEmail )
}

export function* signOut() {
    try {
        yield auth.signOut()
        yield put(signOutSuccess())
    } catch(error) {
        yield put(signOutFailure(error))
    }
}

export function* onSignOutStart() {
    yield takeLatest( userActionTypes.SIGN_OUT_START, signOut)
}

export function* userSagas() {
    yield all([call(onGoogleSignInStart), call(onEmailSignInStart), call(onSignOutStart)])
}