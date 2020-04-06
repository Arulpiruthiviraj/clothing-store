import React from 'react'
import './directory.scss'
import MenuItem from '../menu-items/MenuItem'
import {selectDirectorySections} from "../../redux/directory/directorySelector"
import {useSelector} from "react-redux"

export default function Directory() {
    const sections=useSelector(selectDirectorySections)
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
