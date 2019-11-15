import React, {Component} from 'react';
import './App.css';
import TempHome from './components/TempHome.js'
import LoginPage from './LoginPage.js'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


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
