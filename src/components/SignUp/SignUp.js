import React,{useState} from 'react'
import "./sign-up.scss"
import { FormInput } from '../form-input/FormInput'
import { CustomButton } from '../custom-button/CustomButton'
import {auth,createUserProfileDocument} from '../../firebase/FirebaseUtils.js'



function SignUp() {

    const initialSignUpFormState={displayName:'',email: '', password:'',confirmPassword:'',}
    const[signUpData,setSignUpData]=useState(initialSignUpFormState)



   const handleSubmit=async event=>{
       event.preventDefault();
       
       if(signUpData.password !==  signUpData.confirmPassword){
        alert("Password don't match")
        return;
       }

       try {
           const {user} = await auth.createUserWithEmailAndPassword(signUpData.email,signUpData.password);
          await createUserProfileDocument(user,{displayName:signUpData.displayName})
          setSignUpData(initialSignUpFormState)

       }catch (err) {
           console.error("error is  ",err)
       }
    
    }

    const handleChange=event => {
        const {name,value} =event.target;
        setSignUpData({...signUpData,[name]:value})
    }

    return (
        <div className="sign-up">
            <h2 className="title">I do not have an account</h2>
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <FormInput
                type="text"
                name="displayName"
                value={signUpData.displayName}
                handleChange={handleChange}
                label="Display Name"
                required
                />
                 <FormInput
                type="email"
                name="email"
                value={signUpData.email}
                handleChange={handleChange}
                label="E-Mail"
                required
                />
                     <FormInput
                type="password"
                name="password"
                value={signUpData.password}
                handleChange={handleChange}
                label="Password"
                required
                />
                     <FormInput
                type="password"
                name="confirmPassword"
                value={signUpData.confirmPassword}
                handleChange={handleChange}
                label=" Confirm Password"
                required
               />
               <CustomButton type="submit">SignUp</CustomButton>
            </form>
            
        </div>
    )
}

export default SignUp
