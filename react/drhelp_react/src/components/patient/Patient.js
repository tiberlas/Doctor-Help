import React, { Component } from 'react';
import PatientHeader from './PatientHeader.js';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import PatientProfile from './PatientProfile.js';
import { UserContext } from '../../context/UserContextProvider.js';

class Patient extends Component {
    
    state = {
        id: 0,
        email: "", 
        firstName: "", 
        lastName: "",
        address: "", 
        city: "", 
        state: "", 
        phoneNumber: "", 
        birthday: ""
    }

    static contextType = UserContext

    componentDidMount () {
        console.log (this.context.user);
        this.handlePatient ();
    }

    handlePatient = () => {
        fetch ("http://localhost:8080/api/patients/" + this.context.user.id + "/profile", { method: "GET" })
        .then (response => response.json ())
        .then (json => {
            this.setState ({
                email: json.email, 
                firstName: json.firstName, 
                lastName: json.lastName, 
                address: json.address, 
                city: json.city, 
                state: json.state, 
                phoneNumber: json.phoneNumber, 
                birthday: json.birthday, 
                insuranceNumber: json.insuranceNumber
            })
        });
    }

    render() {     
        return ( 
            <div>
                <PatientHeader />
                <div>
                    <Switch>
                        <Route exact path="/patient/profile">
                            <PatientProfile />
                        </Route>
                        <Route exact path="/">
                            <p>Some like more text</p>
                        </Route>
                    </Switch>
                </div>
            </div>
         );
    }
}
 
export default Patient;