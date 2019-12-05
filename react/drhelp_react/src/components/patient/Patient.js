import React, { Component } from 'react';
import PatientHeader from './PatientHeader.js';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import PatientProfile from './PatientProfile.js';
import { UserContext } from '../../context/UserContextProvider.js';
import PatientContextProvider from '../../context/PatientContextProvider.js';
import PatientChangeProfile from './PatientChangeProfile';
import axios from 'axios'
import ClinicListing from './ClinicListing.js';

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

    update () {
        this.forceUpdate();
    }

    handlePatient = () => {
        let path = "http://localhost:8080/api/patients/" + this.context.user.id + "/profile";
        axios.get (path)
        .then (response => {
            this.setState ({
                email: response.data.email, 
                firstName: response.data.firstName, 
                lastName: response.data.lastName, 
                address: response.data.address, 
                city: response.data.city, 
                state: response.data.state, 
                phoneNumber: response.data.phoneNumber, 
                birthday: response.data.birthday, 
                insuranceNumber: response.data.insuranceNumber
            });
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
                    <PatientHeader logout={() => this.props.logout ()}/>
                    <div>
                        <Switch>
                            <Route exact path="/patient/profile">
                                <PatientProfile />
                            </Route>
                            <Route exact path="/patient/clinicList">
                                <ClinicListing />
                            </Route>
                            <Route exact path="/patient/profile/change">
                                <PatientChangeProfile updateData={() => this.handlePatient()}/>
                            </Route>
                        </Switch>
                    </div>
                </PatientContextProvider>
            </div>
         ); 
    }
}
 
export default Patient;