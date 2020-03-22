import React from 'react';
import HomePage from './pages/homepage/HomePage';
import { Route, Switch } from 'react-router';
import ShopPage from './pages/shop/ShopPage';
import "./App.css";
import Header from './components/header/Header';




function App() {
  return (
    <div className="App">
       <Header/>
       <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage}/>
         </Switch>
    </div>
  );
}

export default App;
