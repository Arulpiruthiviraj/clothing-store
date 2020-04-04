import React from 'react'
import "./custom-button.scss"
export const CustomButton = ({children,isGoogleSignIn,inverted,...otherProps}) => {

    return (
        <button className={`${inverted ?'inverted':null} ${isGoogleSignIn ?'google-sign-in':null}  custom-button`} {...otherProps}>
            {children}
        </button>
    )
}
