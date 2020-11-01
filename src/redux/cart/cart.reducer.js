import { addItemToCart, clearItemFromCart, removeItemFromCart } from "./cart.utils";

const { cartActionTypes } = require("./cart.types");

const INITIAL_STATE = {
    hidden: true,
    items: []
};

const cartReducer = ( currentState = INITIAL_STATE, action ) => {
    switch(action.type) {
        case cartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...currentState,
                hidden: !currentState.hidden
            }
        case cartActionTypes.ADD_ITEM:
            return {
                ...currentState,
                items: addItemToCart(currentState.items, action.payload)
            }
        case cartActionTypes.REMOVE_ITEM:
            return {
                ...currentState,
                items: removeItemFromCart(currentState.items, action.payload)
            }
        case cartActionTypes.CLEAR_ITEM_FROM_CART:
            return {
                ...currentState,
                items: clearItemFromCart(currentState.items, action.payload)
            }
        default:
            return currentState
    }
}

export default cartReducer;