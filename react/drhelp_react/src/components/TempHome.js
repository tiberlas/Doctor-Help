
import React from 'react'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import {Router, Route, browserHistory, BrowserRouter, Switch} from "react-router-dom";
import Header from './Header.jsx';
import Footer from './Footer';
import ClinicAdministrator from './clinic_admin/ClinicAdministrator';
import Home from './Home.jsx';

import NewClinicForm from './NewClinicForm';
import NewAdminForm from './NewAdminForm';

class TempHome extends React.Component {
    
    constructor() {
        super()

        this.state = {
        }
    }
   
    render() {
        return(
            <div> 
                <Header /> 

                <div>
                    <BrowserRouter >
                    <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/home" component={Home} />
                    <Route path={"/clinic/add"} component={NewClinicForm} />
                    <Route path={"/clinic/add+admin"} component={NewAdminForm} />
                    <Route path={"/clinic+administrator"} component={ClinicAdministrator} /> 
                    
                    </Switch>
                    </BrowserRouter>
                </div>

                <Footer />
            </div>

            
        )
    }
}



export default TempHome