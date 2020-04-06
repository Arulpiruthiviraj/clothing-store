import React,{useEffect}from 'react';
import HomePage from './pages/homepage/HomePage';
import { Route, Switch,Redirect} from 'react-router';
import ShopPage from './pages/shop/ShopPage';
import "./App.css";
import Header from './components/header/Header';
import { SignInUp } from './pages/sign-in-out/SignInUp';
import {auth,createUserProfileDocument} from "./firebase/FirebaseUtils.js"
import {useSelector,useDispatch} from "react-redux"
import {setCurrentUser} from './redux/user/userAction.js'
import CheckoutPage from './pages/checkout-page/CheckoutPage';


function App() {
  const dispatch=useDispatch();
  const currentUser=useSelector(({user}) => user.currentUser)

  const unSubcribeFromAuth=()=>null;
useEffect(() => {
  auth.onAuthStateChanged(async userAuth=>{
    if (userAuth){
      const userRef=await createUserProfileDocument(userAuth);
      userRef.onSnapshot(snapShot=>{
        dispatch(setCurrentUser({id:snapShot.id,
        ...snapShot.data()}
        ))
      })
    }
    dispatch(setCurrentUser(userAuth))
    })
  return function cleanup() {
    console.log("unsubribe")
    unSubcribeFromAuth();
  };
}, []);


  return (
    <div className="App">
       <Header/>
       <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage}/>
          <Route exact  path="/check-out" component={CheckoutPage}/>

          <Route exact path="/signin"  render={() => (currentUser?(
          <Redirect to="/"/>)
          :
          (<SignInUp/>))}/>
         </Switch>
    </div>
  );
}



export default App;
