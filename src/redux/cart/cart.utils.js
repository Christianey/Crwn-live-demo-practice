export const addItemToCart = (cartItems, itemToAdd) => {
  console.log(cartItems)
  console.log(itemToAdd)
  const itemExists = cartItems.find((item) => item.id === itemToAdd.id);

  if (itemExists) {
    return cartItems.map((item) =>
      item.id === itemToAdd.id
        ? { ...itemToAdd, quantity: item.quantity + 1 }
        : { ...item }
    );
  }

  return [...cartItems, { ...itemToAdd, quantity: 1 }]
};

export const removeItemFromCart = (cartItems, itemToRemove) => {
  const itemExists = cartItems.find( item => item.id === itemToRemove.id)

  if(itemExists) {
    if(itemToRemove.quantity === 1) return clearItemFromCart(cartItems, itemToRemove)
    return cartItems.map( item => item.id === itemToRemove.id ? {...itemToRemove, quantity: item.quantity - 1} : {...item})
  }
}

export const clearItemFromCart = (cartItems, itemToClear) => cartItems.filter( item => item.id !== itemToClear.id )
