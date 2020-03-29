import React from 'react'
import "./custom-button.scss"
export const CustomButton = ({children,isGoogleSignIn,...otherProps}) => {
    return (
        <div className={`${isGoogleSignIn ?'google-sign-in':null}  custom-button`} {...otherProps}>
            {children}
        </div>
    )
}
