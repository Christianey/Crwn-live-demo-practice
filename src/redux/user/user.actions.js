import userActionTypes from './user.types';

export const setCurrentUser = user => ({
    type: userActionTypes.SET_CURRENT_USER,
    payload: user
})

export const googleSignInStart = () => ({
    type: userActionTypes.GOOGLE_SIGN_IN_START
})

export const SignInSuccess = (user) => ({
    type: userActionTypes.SIGN_IN_SUCCESS,
    payload: user
})

export const SignInFailure = (error) => ({
    type: userActionTypes.SIGN_IN_FAILURE,
    payload: error.message
})


export const emailSignInStart = (emailAndPassword) => ({
    type: userActionTypes.EMAIL_SIGN_IN_START,
    payload: emailAndPassword
})


export const signOutStart = () => ({
    type: userActionTypes.SIGN_OUT_START
})

export const signOutSuccess = () => ({
    type: userActionTypes.SIGN_OUT_SUCCESS
})

export const signOutFailure = (error) => ({
    type: userActionTypes.SIGN_OUT_FAILURE,
    payload: error
})