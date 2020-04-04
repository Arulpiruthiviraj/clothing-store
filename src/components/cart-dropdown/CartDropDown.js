import React from 'react'
import "./cart_dropdown.scss"
import {CustomButton} from '../custom-button/CustomButton'


export default function CartDropDown({toggleCartHidden}) {
    

    return (
        <div className="cart-dropdown">
            <div className="cart-items">

            </div>
            <CustomButton> GO TO CHECKOUT</CustomButton>
            
        </div>
    )
}
