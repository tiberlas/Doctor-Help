import React, {Component} from 'react';
import './App.css';
import TempHome from './components/TempHome.js'
import LoginPage from './LoginPage.js'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Switch} from "react-router-dom";
import UserContextProvider from './context/UserContextProvider';
import RegistrationPage from './components/RegistrationPage';
import axios from "axios"

//const http = axios.create() 

const interceptor = axios.interceptors.request.use(function(config) {
  let token = JSON.parse(localStorage.getItem('token'))
  alert(token)
  if ( token != null ) {
   // alert("1token is " + token).then(  axios.interceptors.request.eject(interceptor)).then(  alert("2token is " + token))
    axios.interceptors.request.eject(interceptor)
    axios.post('http://localhost:8080/api/refreshToken', {

                    'jwtToken': JSON.parse(localStorage.getItem('token'))

                  }).then(response => {
                      console.log(response.data.jwtToken)
                      localStorage.removeItem('token')
                      localStorage.setItem('token', JSON.stringify(response.data.jwtToken))
                      alert("set a new token.")
                      
                  })
                  const token = JSON.parse(localStorage.getItem('token'))
                  config.headers.Authorization = `Bearer ${token}`;
                  //config.headers.Authorization = 'Bearer ' + JSON.parse(localStorage.getItem('token'))
  return config;
  }
}, function(err) {
  return Promise.reject(err);
});

axios.interceptors.response.use(null, function(err) {
    if ( err.status === 401 ) {
        localStorage.removeItem('token')
        window.location.href = 'http://localhost:3000/login'//temp solution
    }
    return Promise.reject(err);
  });



class App extends Component {
  
  constructor() {
    super()
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
    fetch('http://localhost:8080/api/patients/confirmAccount', {
      method: 'put',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify( {
          email: window.location.href.split('=')[1]
      })
     }).then(response => response.json()).then(console.log("done"))

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
