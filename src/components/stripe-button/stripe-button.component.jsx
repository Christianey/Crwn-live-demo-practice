import React from 'react'
import StripeCheckout from 'react-stripe-checkout'



const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51Hnm6jAm99eWlS7umDi9FChYgK8N0jIOER3QQwb6DHsa8z1C1bxlU8FKwtOv5KlI5hOFllXin0gUL7wiTHMi3MWf00lIHI8vzx';

    const onToken = (token) => {
        console.log(token);
        alert('Payment Successful')
    }
    

    return (
        <StripeCheckout
            label='Pay Now'
            name='Crwn Clothing'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total price is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;