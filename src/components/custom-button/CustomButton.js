import React from 'react'
import "./custom-button.scss"
export const CustomButton = ({children,isGoogleSignIn,...otherProps}) => {

    console.log(otherProps)
    return (
        <button className={`${isGoogleSignIn ?'google-sign-in':null}  custom-button`} {...otherProps}>
            {children}
        </button>
    )
}
