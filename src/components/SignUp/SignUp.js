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
       console.log(" hey all how are you  ",signUpData)

       if(signUpData.password !==  signUpData.confirmPassword){
        alert("Password don't match")
        return;
       }

       try {
           const {user} = await auth.createUserWithEmailAndPassword(signUpData.email,signUpData.password);
          await createUserProfileDocument(user, signUpData.displayName)
          setSignUpData(null)

       }catch (err) {
           console.error(err)
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
                onChange={handleChange}
                label="Display Name"
                required
                />
                 <FormInput
                type="email"
                name="email"
                value={signUpData.email}
                onChange={handleChange}
                label="E-Mail"
                required
                />
                     <FormInput
                type="password"
                name="password"
                value={signUpData.password}
                onChange={handleChange}
                label="Password"
                required
                />
                     <FormInput
                type="password"
                name="confirmPassword"
                value={signUpData.confirmPassword}
                onChange={handleChange}
                label=" Confirm Password"
                required
               />
               <CustomButton type="submit">SignUp</CustomButton>
            </form>
            
        </div>
    )
}

export default SignUp
