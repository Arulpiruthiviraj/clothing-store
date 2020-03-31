import React,{useState,useEffect}from 'react';
import HomePage from './pages/homepage/HomePage';
import { Route, Switch } from 'react-router';
import ShopPage from './pages/shop/ShopPage';
import "./App.css";
import Header from './components/header/Header';
import { SignInUp } from './pages/sign-in-out/SignInUp';
import {auth,createUserProfileDocument} from "./firebase/FirebaseUtils.js"




function App() {

const[currentUser,setCurrentUser]=useState(null)

const unSubcribeFromAuth=()=>null;

useEffect(() => {
  auth.onAuthStateChanged(async userAuth=>{
    if (userAuth){
      const userRef=await createUserProfileDocument(userAuth);
      userRef.onSnapshot(snapShot=>{
        setCurrentUser({id:snapShot.id,
        ...snapShot.data()}
        )
      })
      console.log(userAuth)
    }
    setCurrentUser(userAuth)
    })
  return function cleanup() {
    console.log("unsubribe")
    unSubcribeFromAuth();
  };
}, []);


  return (
    <div className="App">
       <Header currentUser={currentUser}/>
       <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage}/>
          <Route path="/signin" component={SignInUp}/>
         </Switch>
    </div>
  );
}

export default App;
