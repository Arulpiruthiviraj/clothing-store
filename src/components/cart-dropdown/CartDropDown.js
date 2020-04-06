import React from 'react'
import "./cart_dropdown.scss"
import {CustomButton} from '../custom-button/CustomButton'
import { CartItem } from '../cart-item/CartItem'
import {useSelector} from "react-redux"
import {selectCartItems} from "../../redux/cart/cartSelector"
import {withRouter} from "react-router"


 function CartDropDown({history}) {
    
    const cartItems=useSelector((state)=>
        selectCartItems(state)
    );

    return (
        <div className="cart-dropdown">
            <div className="cart-items">
                {
                    cartItems.length?
                    cartItems.map((cartItem,id)=>(
                        <CartItem key={id} item={cartItem}/>
                    )):
                    <span className="empty-message">Your cart is empty</span>
                }
               
            </div>
            <CustomButton onClick={()=>history.push("/check-out")}> GO TO CHECKOUT</CustomButton>
            
        </div>
    )
}

export default withRouter(CartDropDown)