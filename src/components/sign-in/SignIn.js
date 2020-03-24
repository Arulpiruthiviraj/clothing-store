import React,{useState} from 'react'
import { FormInput } from '../form-input/FormInput';
import "./sign-in.scss";
import { CustomButton } from '../custom-button/CustomButton';
import {signInWithGoogle} from '../../firebase/FirebaseUtils.js'


 
function SignIn({props}) {

    const initialSignInFormState={email: '', password:''}
    const[signInData,setSignInData]=useState(initialSignInFormState)

    const handleSubmit=(event) => {
        event.preventDefault();
    }

    const handleChange=(event) =>{
        const{name,value}=event.target;
        setSignInData({...signInData,[name]:value})
    }
 
    return (
        <div className="sign-in">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                name="email" 
                type="email"  
                value={signInData.email} 
                label="Email address"
                handleChange={handleChange} required/>
                <FormInput  
                name="password" 
                type="password" 
                value={signInData.password} 
                handleChange={handleChange}
                label="Password" required/>
                <div className="single-line">   
                <CustomButton type="submit">Sign In</CustomButton> 
                <CustomButton onClick={signInWithGoogle}>Sign In wih Google</CustomButton> 
                </div>  
            </form>
        </div>
    )
}

export default SignIn
