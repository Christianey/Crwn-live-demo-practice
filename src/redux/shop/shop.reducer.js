import ShopActionTypes from "./shop.types";

// const { default: SHOP_DATA } = require("./shop.data");

const INITIAL_STATE = {
    collections: null,
    isFetching: false,
    errorMessage: ''
};

const shopReducer = ( state = INITIAL_STATE, action ) => {
    switch(action.type) {
        case ShopActionTypes.fetchCollectionsStart:
            return ({
                ...state,
                isFetching: true
            })
        case ShopActionTypes.fetchCollectionsSuccess:
            return ({
                ...state,
                isFetching: false,
                collections: action.payload
            })
        case ShopActionTypes.fetchCollectionsFailure:
            return ({
                ...state,
                isFetching: false,
                errorMessage: action.payload
            })
        default:
            return state
    }
}

export default shopReducer;