import { createSelector } from 'reselect';

const selectCart = state => state.cart;

export const selectCartItems = createSelector(
    [selectCart],
    cart => cart.items
)

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
)
export const selectCartItemsCount = createSelector(
    [selectCartItems], 
    items => items.reduce((acc, num) => {
        return acc + num.quantity;
    }, 0)
)

export const selectCartItemsTotal = createSelector(
    [selectCartItems],
    items => items.reduce((acc, num) => 
        acc + num.quantity * num.price, 0)
)
