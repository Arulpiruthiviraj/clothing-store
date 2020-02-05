import React from 'react'
import { MenuItem } from '../menu-items/MenuItem'
import sections from './directoryData'
import './directory.scss'
export default function Directory() {
    return (
        <div className="directory-menu">
            {sections.map(({title,imageUrl,id,size})=>
               (
                   <MenuItem key={id} title={title} imageUrl={imageUrl} size={size}/>
               ) )}
        </div>
    )
}
