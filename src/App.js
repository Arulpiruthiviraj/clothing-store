import React,{useState,useEffect}from 'react';
import HomePage from './pages/homepage/HomePage';
import { Route, Switch } from 'react-router';
import ShopPage from './pages/shop/ShopPage';
import "./App.css";
import Header from './components/header/Header';
import { SignInUp } from './pages/sign-in-out/SignInUp';
import {auth} from "./firebase/FirebaseUtils.js"




function App() {
const[currentUser,setCurrentUser]=useState(null)
useEffect(() => {
  auth.onAuthStateChanged(user=>{
    setCurrentUser({currentUser:user})
    console.log(user)
  })
}, []);

  return (
    <div className="App">
       <Header/>
       <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage}/>
          <Route path="/signin" component={SignInUp}/>
         </Switch>
    </div>
  );
}

export default App;
