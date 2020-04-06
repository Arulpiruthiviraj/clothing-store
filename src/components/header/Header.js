import React from 'react'
import "./header.scss"
import { Link } from 'react-router-dom'
import {ReactComponent as Logo} from "../../assets/AprApparels.svg"
import {auth} from "../../firebase/FirebaseUtils"
import {useSelector} from "react-redux"
import { CartIcon } from '../cart-icon/cartIcon'
import CartDropDown from '../cart-dropdown/CartDropDown'
import {selectCartHidden} from "../../redux/cart/cartSelector"
import {selectCurrentUser} from "../../redux/user/userSelector"

function Header() {
      const currentUser=useSelector((state) => selectCurrentUser(state));
      const hidden=useSelector((state) => selectCartHidden(state));
    return (
        <div className="header">
            <Link to="/">
                <Logo className="logo-container"/>
            </Link>
            <div className="options">
               <Link to="/shop" className="option">SHOP</Link>
               <Link to="/shop" className="option">CONTACT</Link>
               {
               currentUser?
               (<div className="option" onClick={()=>{auth.signOut();}}>SIGN OUT</div>)
               : 
               (<Link to="/signin" className="option">SIGN IN</Link>)
               }
               <CartIcon/>
            </div>
            {!hidden ?
            <CartDropDown/>:
            null
            }
            
        </div>
    )
}




export default Header
