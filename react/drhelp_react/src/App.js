import React, {Component} from 'react';

import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TempHome from './TempHome.js'

class App extends Component {
  
  render() {
      return (
        <div className="App">
            <TempHome/>
        </div>

      );
  }
}

export default App;
