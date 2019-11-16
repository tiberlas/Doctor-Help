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
    }
  }

  setDoctor () {
    this.setState ({
      loggedIn: true,
      userRole: 'doctor',
    })
  }


  render() {

    if (!this.state.loggedIn) {
      return (
        <div className="App">
            <LoginPage 
              loggedIn={this.state.loggedIn}
              userRole={this.state.userRole}
              fcnSetLoginData={() => this.setDoctor ()}
            />
        </div>
      );
    }
    else {
      return (
        <div>
					<TempHome userRole={this.props.userRole} userId = "1"/>			
				</div>
      );
    }
  }
}

export default App;
