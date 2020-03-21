import React from 'react'
import sections from './directoryData'
import './directory.scss'
import MenuItem from '../menu-items/MenuItem'



export default function Directory() {
    return (
        <div className="directory-menu">
            {sections.map(({id,...otherSectionProps})=>
               (
                   <MenuItem key={id} {...otherSectionProps}/>
               )
                )}
        </div>
    )
}
