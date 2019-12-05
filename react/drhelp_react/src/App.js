import React, {Component} from 'react';
import './App.css';
import TempHome from './components/TempHome.js'
import LoginPage from './LoginPage.js'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Switch} from "react-router-dom";
import UserContextProvider from './context/UserContextProvider';
import RegistrationPage from './components/RegistrationPage';
import interceptor from './Interseptor.js';
import axios from "axios"

class App extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false,
      userRole: 'guest', 
      userId: 1,
      currentUrl: window.location.href.split('=')[0]
    }

    this.confirmRegistration = this.confirmRegistration.bind(this)
  }

  setDoctor () {
    this.setState ({
      loggedIn: true,
      userRole: 'doctor',
    })
  }

  setNurse () {
    this.setState ({
      loggedIn: true,
      userRole: 'nurse',
    })
  }

  setCentreAdmin () {
    this.setState ({
      loggedIn: true,
      userRole: 'centreAdmin',
    })
  }

  setClinicAdmin () {
    this.setState ({
      loggedIn: true,
      userRole: 'clinicAdmin',
    })
  }

  setPatient () {
    this.setState ({
      loggedIn: true,
      userRole: 'patient',
    })
  }

  confirmRegistration = () => {
    console.log("bingo")
    axios.put('http://localhost:8080/api/patients/confirmAccount', {
      headers: {'Content-Type':'application/json'},
          email: window.location.href.split('=')[1]
     }).then(response => {console.log("done")})

  }

  render() {


    console.log("href " + this.state.currentUrl)
    if(this.state.currentUrl === 'http://localhost:3000/activate') {
      console.log("bingo")
      fetch('http://localhost:8080/api/patients/confirmAccount', {
        method: 'put',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify( {
            email: window.location.href.split('=')[1]
        })
     }).then(response => response.json()).then(console.log("done"))
        return (
          <div> 
            
            <h2> Your account has been confirmed. Click the <a href="http://localhost:3000/"> link </a> 
            to log in with your credentials. </h2>
        </div>
        )
    }


   
      return (
        <div>
          <BrowserRouter >
            <Switch>
                <UserContextProvider id={this.state.userId} role = {this.state.userRole}>
                 {!this.state.loggedIn && 
                    <LoginPage 
                    loggedIn={this.state.loggedIn}
                    userRole={this.state.userRole}
                    setLoginDoctor={() => this.setDoctor ()}
                    setLoginNurse={() => this.setNurse ()}
                    setLoginCentreAdmin={() => this.setCentreAdmin ()}
                    setLoginClinicAdmin={() => this.setClinicAdmin ()}
                    setLoginPatient={() => this.setPatient ()}
                    />
                    
                  }
                  {this.state.loggedIn &&
                  <TempHome role = {this.state.userRole} />	}
                </UserContextProvider>		
            </Switch>
          </BrowserRouter>
				</div>
      );
    

}
}

export default App;
