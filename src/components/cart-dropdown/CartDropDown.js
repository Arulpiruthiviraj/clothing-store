import React from 'react'
import "./cart_dropdown.scss"
import {CustomButton} from '../custom-button/CustomButton'
import { CartItem } from '../cart-item/CartItem'
import {useSelector} from "react-redux"


export default function CartDropDown() {
    
    const cartItems=useSelector(({cart:{cartItems}}) => cartItems);
    console.log(" cart items s"+JSON.stringify(cartItems))

    return (
        <div className="cart-dropdown">
            <div className="cart-items">
                {
                    cartItems.map((cartItem,id)=>(
                        <CartItem key={id} item={cartItem}/>
                    ))
                }
               
            </div>
            <CustomButton> GO TO CHECKOUT</CustomButton>
            
        </div>
    )
}
