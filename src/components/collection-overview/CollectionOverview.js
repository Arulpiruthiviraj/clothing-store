import React from 'react'
import "./collection-overview.scss"
import CollectionPreview from '../preview-collection/CollectionPreview'
import {useSelector} from "react-redux"
import { selectCollectionsForPreview } from '../../redux/shop/shopSelector'


export const CollectionOverview = () => {

    const collections=useSelector(selectCollectionsForPreview)


    return (
        <div className="collection-overview">
            {
            collections.map(({id,...collectionProps}) =>(
                
                <CollectionPreview key={id} {...collectionProps}/>
                
            ))
        }
            
        </div>
    )
}
