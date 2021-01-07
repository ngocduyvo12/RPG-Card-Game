import React from 'react';
import Home from "./pages/home";
import Login from "./pages/login";
import Combat from "./components/Combat";
import Welcome from "./components/Welcome";
import Inventory from "./pages/inventory";
// import Map from "./components/map"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PostCombat from './components/postCombat';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/home/:id" component={Home} />
        <Route exact path="/welcome/:id" component={Welcome} />
        <Route exact path="/combat/:location/:id" component={Combat} />
        <Route exact path="/inventory/:id" component={Inventory} />
        <Route exact path="/results" component={PostCombat} />
      </Switch>
    </Router>
  )
}

export default App;
