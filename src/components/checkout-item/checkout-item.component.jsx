import React from 'react'
import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
import { addItem, clearItem, removeItem } from '../../redux/cart/cart.actions';
// import { selectCartItems } from '../../redux/cart/cart.selectors';

import './checkout-item.styles.scss';

const CheckoutItem = ({ item, clearItem, addItem, removeItem }) => {
    const {name, quantity, price, imageUrl} = item;
    return (
        <div className="checkout-item">
            <div className="image-container"><img src={imageUrl} alt="" /></div>
            <span className="name">{name}</span>
            <div className="quantity">
                <div role='img' aria-label='testing' className='arrow' onClick={()=>removeItem(item )}>&#10094;</div>
                <span className="value">{quantity}</span>
                <span role='img' aria-label='testing' className='arrow' onClick={()=>addItem(item)}>&#10095;</span>
            </div>
            <span className="price">${price}</span>
            <div className="remove-button" onClick={() => clearItem(item)}>
                ✖
            </div>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    clearItem: item => dispatch(clearItem(item)),
    addItem: itemToAdd => dispatch(addItem(itemToAdd)),
    removeItem: itemToRemove => dispatch(removeItem(itemToRemove))
})


export default connect(null, mapDispatchToProps)(CheckoutItem);
