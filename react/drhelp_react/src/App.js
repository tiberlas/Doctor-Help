import React, {Component} from 'react';

import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TempHome from './components/TempHome.js'
import LoginPage from './LoginPage.js'

class App extends Component {
  
  render() {
      return (
        <div className="App">
            <LoginPage/>
        </div>

      );
  }
}

export default App;
