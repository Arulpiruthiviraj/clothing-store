import React from 'react'
import "./custom-button.scss"
export const CustomButton = ({children,...otherProps}) => {
    return (
        <div className="custom-button" {...otherProps}>
            {children}
        </div>
    )
}
