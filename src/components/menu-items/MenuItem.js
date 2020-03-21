import React from 'react';
import './menu-item.scss'
import {withRouter} from 'react-router-dom'

 const MenuItem = ({title,imageUrl,size,history,linkUrl,match}) => {
     console.log(`${match.url}${linkUrl}`)
    return (
        <div style={{
            backgroundImage:`url(${imageUrl})`
        }} className={`${size} menu-item `} onClick={()=>{history.push(`${match.url}${linkUrl}`)}}>
            <div className="content">
                <h1 className="title">
                    {title.toUpperCase()}
                </h1>
                <span>
                    SHOP NOW
                </span>
            </div>
       </div>
    )
}
export default withRouter(MenuItem);