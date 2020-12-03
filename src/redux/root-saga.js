import { userSagas } from "./user/user.sagas";

const { all, call } = require("redux-saga/effects");
const { shopSagas } = require("./shop/shop.sagas");

function* rootSaga() {
    yield all([call(shopSagas), call(userSagas)])
}

export default rootSaga;