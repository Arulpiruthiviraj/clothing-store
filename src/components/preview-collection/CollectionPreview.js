import React from 'react'
import "./preview-collection.scss"
import CollectionItem from '../collection-item/CollectionItem';


const CollectionPreview = ({title,items}) => {
    return (
        <div className="collection-preview ">
            <h1 className="title">{title.toUpperCase()}</h1>
            <div className="preview">
            {items.filter((item,idx)=>idx<4).map(({id,...otherItemsProps}) =>(
                <CollectionItem key={id}{...otherItemsProps}/>
            ))}
            </div>
        </div>
    );
}

export default CollectionPreview
