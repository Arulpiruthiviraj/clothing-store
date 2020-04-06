import React from 'react'
import { CollectionOverview } from '../../components/collection-overview/CollectionOverview'
import { Route} from 'react-router';
import CollectionPage from '../collection/CollectionPage';

function ShopPage({match}) {

    return (
        <div className="shop-page">
            <Route exact path={`${match.path}`} component={CollectionOverview}/>
            <Route path={`${match.path}/:collectionId`} component={CollectionPage}/>
        </div>
    )
}

export default ShopPage
