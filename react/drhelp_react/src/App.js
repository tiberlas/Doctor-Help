import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Router, Route, browserHistory, BrowserRouter, Switch} from "react-router-dom";
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import NewClinicForm from './components/clinic/NewClinicForm.js';
import ClinicAdministrator from './components/clinic_admin/ClinicAdministrator';
import Home from './components/Home.jsx';

class App extends Component {
  
  render() {
      return (
        <div className="App"> 
            <Header /> 

            <div>
                <BrowserRouter >
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/home" component={Home} />
                  <Route path={"/clinic/add"} component={NewClinicForm} />
                  <Route path={"/clinic+administrator"} component={ClinicAdministrator} /> 
                </Switch>
                </BrowserRouter>
            </div>
            
            <Footer />
        </div>
        
      );
  }
}

export default App;
