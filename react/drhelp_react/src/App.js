import React, {Component} from 'react';
import './App.css';
import TempHome from './components/TempHome.js'
import LoginPage from './LoginPage.js'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


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
      userRole: 'dclinicAdminoctor',
    })
  }

  setPatient () {
    this.setState ({
      loggedIn: true,
      userRole: 'patient',
    })
  }

  render() {

    if (!this.state.loggedIn) {
      return (
        <div className="App">
            <LoginPage 
              loggedIn={this.state.loggedIn}
              userRole={this.state.userRole}
              setLoginDoctor={() => this.setDoctor ()}
              setLoginNurse={() => this.setNurse ()}
              setLoginCentreAdmin={() => this.setCentreAdmin ()}
              setLoginClinicAdmin={() => this.setClinicAdmin ()}
              setLoginPatient={() => this.setPatient ()}
            />
        </div>
      );
    }
    else {
      return (
        <div>
					<TempHome userRole={this.state.userRole} userId = {this.state.userId}/>			
				</div>
      );
    }
  }
}

export default App;
