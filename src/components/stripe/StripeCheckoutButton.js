import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

export const StripeCheckoutButton = ({price}) => {
    const priceForStrip=price*100;
    const publishableKey="pk_test_P0UqBFArJDCUj2bg9X8xehap00Vi5TVqVQ"
    
    const onToken=(token)=>{
        console.log(token)
        alert("Payment Successful");
    }


    return (
        <StripeCheckout
        label="Pay Now"
        name="AprApparels"
        billingAddress
        shippingAddress
        description={`Your Total is $${price} `}
        amount={priceForStrip}
        panelLabel={"Pay Now"}
        token={onToken}
        stripeKey={publishableKey}
        />
    )
}
