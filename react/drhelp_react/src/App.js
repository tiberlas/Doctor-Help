import React, {Component} from 'react';
import './App.css';
import TempHome from './components/TempHome.js'
import LoginPage from './LoginPage.js'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootswatch/dist/darkly/bootstrap.css';
import {BrowserRouter, Redirect, Route} from "react-router-dom";
import {Switch} from "react-router-dom";
import UserContextProvider from './context/UserContextProvider';
import RegistrationPage from './components/RegistrationPage';
import PatientProfile from './components/patient/PatientProfile';
import interceptor from './Interseptor.js';
import axios from "axios"
import FirstTimePasswordChange from './components/FirstTimePasswordChange'


class App extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false,
      userRole: 'guest', 
      userId: 1,
      currentUrl: window.location.href.split('=')[0],
      passwordChange: false
    }
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

  logout () {
    this.setState ({
      loggedIn: false,
      userRole: 'guest',
    })
    localStorage.setItem('token', null);
  }

  // confirmRegistration = () => {
  //   console.log("bingo")
  //   axios.put('http://localhost:8080/api/patients/confirmAccount', {
  //     headers: {'Content-Type':'application/json'},
  //         email: window.location.href.split('=')[1]
  //    }).then(response => {console.log("done")})

  // }

  setPasswordChange(role) {
    this.setState({
      passwordChange: true,
      userRole: role
    })
  }

  render() {


    console.log("href " + this.state.currentUrl)
    if(this.state.currentUrl === 'http://localhost:3000/activate') {
      console.log("bingo" + window.location.href.split('=')[1] )
      fetch('http://localhost:8080/api/patients/confirmAccount', {
            method: 'put',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: window.location.href.split('=')[1]
            })
     }).then(console.log("done"))
        return (
          <div> 
             <div class="row d-flex justify-content-center">
                <div class='col-md-3'>
                  <h2> Your account has been confirmed. <br/>Click the <a href="http://localhost:3000/login"> link </a> 
                  to log in with your credentials. </h2>
                  </div>
              </div>

        </div>
        )
    }

      return (
        <div>
          <BrowserRouter >
            <Switch>
                { this.state.passwordChange?
                 <div> <FirstTimePasswordChange role = {this.state.userRole}/>  </div>:

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
                    setPasswordChange = {(role) => this.setPasswordChange(role)}
                    />
                    // <PatientProfile></PatientProfile>
                  }
                  {(this.state.loggedIn && !this.state.passwordChange) &&
                  < TempHome role = {this.state.userRole} logout={() => this.logout ()}/>	}
                  <Route render={() => <Redirect to={{pathname: "/login"}} />} />

                  </UserContextProvider>}		
            </Switch>
          </BrowserRouter>
        </div>

      );
    

}
}

export default App;
