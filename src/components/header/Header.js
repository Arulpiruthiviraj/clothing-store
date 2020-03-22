import React from 'react'
import "./header.scss"
import { Link } from 'react-router-dom'
import {ReactComponent as Logo} from "../../assets/crown.svg"

function Header() {
    return (
        <div className="header">
            <Link to="/">
                <Logo className="logo-container"/>
            </Link>
            <div className="options">
               <Link to="/shop" className="option">SHOP</Link>
               <Link to="/shop" className="option">CONTACT</Link>
            </div>
        </div>
    )
}

export default Header
