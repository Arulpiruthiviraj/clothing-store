import React from 'react';
import HomePage from './pages/homepage/HomePage';
import { Route, Switch } from 'react-router';
import ShopPage from './pages/shop/ShopPage';




function App() {
  return (
    <div className="App">
    <Switch>
    <Route exact path="/" component={HomePage} />
      <Route path="/shop" component={ShopPage}/>
    </Switch>
    </div>
  );
}

export default App;
