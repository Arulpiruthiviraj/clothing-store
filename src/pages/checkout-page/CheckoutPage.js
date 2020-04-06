import React from 'react';

import {useSelector} from "react-redux"
import CheckOutItem from "../../components/checkout-item/CheckOutItem"


import {
  selectCartItems,
  selectCartTotal
} from '../../redux/cart/cartSelector';

import './check-out.scss';
import { StripeCheckoutButton } from '../../components/stripe/StripeCheckoutButton';

const CheckoutPage = () => {

  const cartItems=useSelector((state)=>
  selectCartItems(state)
);
const total=useSelector((state)=>
selectCartTotal(state)
);

return (

  <div className='checkout-page'>
    <div className='checkout-header'>
      <div className='header-block'>
        <span>Product</span>
      </div>
      <div className='header-block'>
        <span>Description</span>
      </div>
      <div className='header-block'>
        <span>Quantity</span>
      </div>
      <div className='header-block'>
        <span>Price</span>
      </div>
      <div className='header-block'>
        <span>Remove</span>
      </div>
    </div>
    {cartItems.map(cartItem => (
      <CheckOutItem key={cartItem.id} cartItem={cartItem} />
    ))}
    <div className='total'>TOTAL: ${total}</div>
    <StripeCheckoutButton price={total}/>
    <div className='test-warning'>
      *Please use the following test credit card for payments*
      <br />
      4242 4242 4242 4242 - Exp: 01/20 - CVV: 123
    </div>
    {/* <StripeCheckoutButton price={total} /> */}
  </div>
);
}


export default CheckoutPage;