import React from 'react';
import HomePage from './pages/homepage/HomePage';
import { Route, Switch } from 'react-router';

const HatsPage=() => {
  return(
    <h1>HatsPage</h1>
  );
}

function App() {
  return (
    <div className="App">
    <Switch>
    <Route exact path="/" component={HomePage} />
      <Route path="/shop/hats" component={HatsPage}/>
    </Switch>
    </div>
  );
}

export default App;
