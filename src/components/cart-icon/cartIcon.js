import React from 'react'
import "./cart-icon.scss"
import {ReactComponent as ShoppingIcon} from '../../assets/shopping_bag_icon.svg'
import {useDispatch,useSelector} from "react-redux"
import {toggleCartHidden} from '../../redux/cart/cartAction'
import {selectCartItemsCount} from '../../redux/cart/cartSelector'


export const CartIcon = () => {
    const dispatch=useDispatch(); 
    const itemsCount=useSelector((state)=>
        selectCartItemsCount(state)
    );
    
    return (
        <div className="cart-icon" onClick={()=>dispatch(toggleCartHidden())}>
            <ShoppingIcon className="shopping-icon"/>
            <span className="item-count">{itemsCount}</span>
        </div>
    )
}
