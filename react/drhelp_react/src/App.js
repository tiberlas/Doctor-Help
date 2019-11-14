import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Router, Route, browserHistory} from "react-router";
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import NewClinicForm from './components/clinic/NewClinicForm.js';
import ClinicAdministrator from './components/clinic_admin/ClinicAdministrator';

class App extends Component {
  
  render() {
      return (
        <div className="App"> 
            <Header /> 

            <div>
                <Router path={"/"} history={browserHistory}>
                  <Route path={"clinic/add"} component={NewClinicForm} />
                  <Route path={"clinic+administrator"} component={ClinicAdministrator} />
                </Router>
            </div>
            
            <Footer />
        </div>
        
      );
  }
}

export default App;
