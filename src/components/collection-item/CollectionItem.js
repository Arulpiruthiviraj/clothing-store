import React from 'react'
import "./collection-item.scss"
import { CustomButton } from '../custom-button/CustomButton'
import {useDispatch} from "react-redux"
import {addItem} from "../../redux/cart/cartAction"

const CollectionItem = ({item}) => {

    const { name,price,imageUrl}=item
    const dispatch=useDispatch();

    
    return (
        <div className="collection-item">
            <div className="image"
                 style={{backgroundImage:`url(${imageUrl})`}}/>
                <div className="collection-footer">
                   <span className="name">{name}</span>
                   <span className="price">${price}</span>
                </div>
                <CustomButton onClick={()=>dispatch(addItem(item))} className="custom-button" inverted>ADD TO CART</CustomButton>
                 
        </div>
    )
}

export default CollectionItem
