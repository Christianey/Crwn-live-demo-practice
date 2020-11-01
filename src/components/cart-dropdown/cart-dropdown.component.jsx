import React from 'react'

import './cart-dropdown.styles.scss';

import CustomButton from '../custom-button/custom-button.component';
import { connect } from 'react-redux';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

const CartDropdown = ({items, history, dispatch}) => (
    <div className="cart-dropdown">
        {!items.length ?
            <span className='empty-message'>Your Cart is Empty</span> :
            <div className="cart-items">
                {items.map(item => (
                    <CartItem key={item.id} item={item} />
                ))}
            </div>}
        <CustomButton
            onClick={() => {
                history.push('/checkout');
                dispatch(toggleCartHidden());
            } }
        >GO TO CHECKOUT</CustomButton>
    </div>
)

const mapStateToProps =  createStructuredSelector({
    items: selectCartItems
})

export default withRouter(connect(mapStateToProps)(CartDropdown));
