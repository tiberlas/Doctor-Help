import React, { Component } from 'react';
import DoctorHeader from './DoctorHeader.jsx'
import DoctorProfile from './DoctorProfile.jsx'
import { UserContext } from '../../context/UserContextProvider'
import DoctorContextProvider from '../../context/DoctorContextProvider';
import {Route, Redirect} from "react-router-dom";
import {Switch} from "react-router-dom";
import DoctorChangeProfile from './DoctorChangeProfile.jsx';
import DoctorChangePassword from './DoctorChangePassword.jsx';
import axios from 'axios';
import Calendar from '../Calendar'

class Doctor extends Component {
    state = { 
        id: 0,
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        phoneNumber: "",
        birthday: "",
        clinicId: 1
     }

    static contextType = UserContext

    componentDidMount() {
        this.handleDoctor();
    }

    handleDoctor = () => {
        axios.get("http://localhost:8080/api/doctors/profile")
            .then(response =>  {
                this.setState({
                    id: response.data.id,
                    email: response.data.email,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    address: response.data.address,
                    city: response.data.city,
                    state: response.data.state,
                    phoneNumber: response.data.phoneNumber,
                    birthday: response.data.birthday,
                    clinicId: response.data.clinicId
                })
            })
    }

    render() { 
        var doctor = {id: this.state.id, firstName: this.state.firstName, lastName: this.state.lastName, address: this.state.address, state: this.state.state, city: this.state.city, phoneNumber: this.state.phoneNumber, email: this.state.email, birthday: this.state.birthday, clinicId: this.state.clinicId, role:'doctor'} 
        return ( 
            <div>
                <DoctorContextProvider doctor={doctor} >
                    <DoctorHeader logout={() => this.props.logout ()}/>

                    <div>
                        <Switch>
                            <Route exact path="/doctor/"> <DoctorProfile /></Route>
                            <Route exact path="/doctor/profile"> <DoctorProfile /></Route>
                            <Route exact path="/doctor/profile/change"> <DoctorChangeProfile handleUpdate={this.handleDoctor}/></Route>
                            <Route exact path="/doctor/profile/change/password"> <DoctorChangePassword /></Route>
                            <Route exact path = "/doctor/schedule"><Calendar medical_staff = {doctor} /></Route> 
                        </Switch>
                    </div>
                </DoctorContextProvider>
            </div>
         );
    }
}
 
export default Doctor;