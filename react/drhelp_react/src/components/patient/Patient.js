import React, { Component } from 'react';
import PatientHeader from './PatientHeader.js';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import PatientProfile from './PatientProfile.js';
import { UserContext } from '../../context/UserContextProvider.js';
import PatientContextProvider from '../../context/PatientContextProvider.js';
import PatientChangeProfile from './PatientChangeProfile';

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
        var patient = {
            id: this.state.id,
            email: this.state.email, 
            firstName: this.state.firstName, 
            lastName: this.state.lastName,
            address: this.state.address, 
            city: this.state.city, 
            state: this.state.state, 
            phoneNumber: this.state.phoneNumber, 
            birthday: this.state.birthday,
            insuranceNumber: this.state.insuranceNumber
        }
        return ( 
            <div>
                <PatientContextProvider patient={patient}>
                    <PatientHeader />
                    <div>
                        <Switch>
                            <Route exact path="/patient/profile">
                                <PatientProfile />
                            </Route>
                            <Route exact path="/patient/profile/change">
                                <PatientChangeProfile />
                            </Route>
                        </Switch>
                    </div>
                </PatientContextProvider>
            </div>
         );
    }
}
 
export default Patient;