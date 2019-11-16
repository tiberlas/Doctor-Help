
import React from 'react'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import {Router, Route, browserHistory, BrowserRouter, Switch} from "react-router-dom";
import Header from './header.jsx';
import Footer from './footer.jsx';
import ClinicAdministrator from './clinic_admin/ClinicAdministrator';
import Home from './Home.jsx';

import NewClinicForm from './NewClinicForm';
import NewAdminForm from './NewAdminForm';
import UserContextProvider from '../context/UserContextProvider.js';

class TempHome extends React.Component {

   
    render() {
        return(
            <div>  
                <div>

                    <BrowserRouter >
                        <UserContextProvider role = {this.props.userRole} id = {this.props.userId}>
                        <Header />
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/home" component={Home} />
                            <Route path={"/clinic/add"} component={NewClinicForm} />
                            <Route path={"/clinic/add+admin"} component={NewAdminForm} />     
                        </Switch>
                        </UserContextProvider> 
                    </BrowserRouter>
                </div>

                <Footer />
            </div>

            
        )
    }
}



export default TempHome