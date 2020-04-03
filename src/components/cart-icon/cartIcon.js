import React from 'react'
import "./cart-icon.scss"
import {ReactComponent as ShoppingIcon} from '../../assets/shopping_bag_icon.svg'

export const CartIcon = () => {
    return (
        <div className="cart-icon">
            <ShoppingIcon className="shopping-icon"/>
            <span className="item-count">0</span>
        </div>
    )
}
