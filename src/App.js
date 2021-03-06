import './App.css';
import React from 'react';

import Login from './Components/Login';
import SignUp from './Components/Signup';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import ErrorPage from './Components/ErrorPage';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Test from './Components/Test';

function App() {
  return (
    <>
   
    <Router>
    
    <Switch>
    <Route  exact path="/" component={Login}/>
    <Route path="/signup" component={SignUp}/>
    <Route path="/home" component={Home}/> 
    <Route path="/test" component={Test}/> 
    <Route component={ErrorPage}/>
    </Switch>
    </Router>
    </>
  );
}

export default App;
