import React, {Component} from 'react';
import './App.css';
import TempHome from './components/TempHome.js'
import LoginPage from './LoginPage.js'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Switch} from "react-router-dom";
import UserContextProvider from './context/UserContextProvider';
import RegistrationPage from './components/RegistrationPage';

class App extends Component {
  
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      userRole: 'guest', 
      userId: 1
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

  

  render() {


      return (
        <div>
          <RegistrationPage></RegistrationPage>
        </div>
      );
   
      // return (
      //   <div>
      //     <BrowserRouter >
      //       <Switch>
      //           <UserContextProvider id={this.state.userId} role = {this.state.userRole}>
      //            {!this.state.loggedIn && <LoginPage 
      //               loggedIn={this.state.loggedIn}
      //               userRole={this.state.userRole}
      //               setLoginDoctor={() => this.setDoctor ()}
      //               setLoginNurse={() => this.setNurse ()}
      //               setLoginCentreAdmin={() => this.setCentreAdmin ()}
      //               setLoginClinicAdmin={() => this.setClinicAdmin ()}
      //               setLoginPatient={() => this.setPatient ()}
      //             />}
      //             {this.state.loggedIn &&
      //             <TempHome role = {this.state.userRole} />	}
      //           </UserContextProvider>		
      //       </Switch>
      //     </BrowserRouter>
			// 	</div>
      // );
    
  }
}

export default App;
