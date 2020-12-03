import { convertCollectionsSnapshotToMap, firestore } from '../../firebase/firebase.utils';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import ShopActionTypes from './shop.types';
import { fetchCollectionsFailure, fetchCollectionsSuccess } from './shop.actions';

export function* fetchCollectionsStartAsync () {
    const collectionRef = firestore.collection("collections");

    try{
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call( convertCollectionsSnapshotToMap, snapshot )
        
        yield put(fetchCollectionsSuccess(collectionsMap) )
    } catch(error) {
        yield put(fetchCollectionsFailure(error.message))
        
    }
}

export function* fetchCollectionsStart() {
    yield takeLatest(ShopActionTypes.fetchCollectionsStart, fetchCollectionsStartAsync )
}

export function* shopSagas() {
    yield all([call(fetchCollectionsStart)])
}