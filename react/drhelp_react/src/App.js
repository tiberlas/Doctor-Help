import React, {Component} from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TempHome from './TempHome.js'

class App extends Component {
  
  
  render() {
      return (
        <div className="App">
          {/* <header className="App-header"> */}
            {/* <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload it.
            </p> */}

            {/* <MenuPopupState/> */}
            <TempHome/>
          {/* </header> */}
        </div>
        
      );
  }
}

export default App;
