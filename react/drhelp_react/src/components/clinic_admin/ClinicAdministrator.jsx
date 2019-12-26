import React, { Component } from 'react';
import ClinicAdminHeader from './ClinicAdminHeader';
import HandlingRooms from './HandlingRooms';
import {Route, Redirect} from "react-router-dom";
import {Switch} from "react-router-dom";
import ClinicAdminProfile from './ClinicAdminProfile';
import { UserContext } from '../../context/UserContextProvider'
import ClinicAdminChangeProfile from './ClinicAdminChangeProfile';
import ClinicAdminContextProvider from '../../context/ClinicAdminContextProvider';
import ClinicAdminMedicalStaff from './ClinicAdminMedicalStaff';
import ClinicAdminChangePassword from './ClinicAdminChangePassword';
import axios from 'axios';
import Clinic from '../clinic/Clinic';
import ClinicChangeProfile from './ClinicChangeProfile';
import NewRoom from '../rooms/NewRoom.jsx';
import HandleingProcedureTypes from './HandleingProcedureTypes';
import NewProcedureType from '../procedureType/NewProcedureType';
import HandleingPredefinedAppointments from './HandleingPredefinedAppointments';
import NewPredefinedAppointment from '../predefined_appointments/NewPredefinedAppointment';
import CreateMedicalStaff from './CreateMedicalStaff';

class ClinicAdministrator extends Component {
    state = {
            id: 1, 
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
        //console.log(this.context.user);
        this.handleClinicAdmin();
    }

    handleClinicAdmin = () => {
        axios.get("http://localhost:8080/api/clinicAdmins/profile")
            .then(response =>  {
                this.setState({
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
        var admin = {id: this.state.id, firstName: this.state.firstName, lastName: this.state.lastName, address: this.state.address, state: this.state.state, city: this.state.city, phoneNumber: this.state.phoneNumber, email: this.state.email, birthday: this.state.birthday, clinicId: this.state.clinicId} 
        return (
             <div>
                <ClinicAdminContextProvider admin={admin}>
                <ClinicAdminHeader logout={() => this.props.logout ()}></ClinicAdminHeader>

                <div>
                <Switch>
                    <Route exact path="/clinic-administrator/clinic" ><Clinic clinicId={this.state.clinicId}/> </Route>
                    <Route exact path="/clinic-administrator/clinic/change" ><ClinicChangeProfile clinicId={this.state.clinicId}/> </Route>
                    <Route exact path="/clinic-administrator/profile" ><ClinicAdminProfile /> </Route>
                    <Route exact path="/clinic-administrator/" ><ClinicAdminProfile /> </Route>
                    <Route exact path="/clinic-administrator/profile/change" ><ClinicAdminChangeProfile  handleUpdate={this.handleClinicAdmin}/> </Route>
                    <Route exact path="/clinic-administrator/rooms" ><HandlingRooms /> </Route>
                    <Route exact path='/clinic-administrator/rooms/add'> <NewRoom /> </Route>
                    <Route exact path="/clinic-administrator/procedure-types" ><HandleingProcedureTypes /> </Route>
                    <Route exact path='/clinic-administrator/procedure-types/add'> <NewProcedureType /> </Route>
                    <Route exact path='/clinic-administrator/predefined-appointments'> <HandleingPredefinedAppointments /> </Route>
                    <Route exact path='/clinic-administrator/predefined-appointments/add'> <NewPredefinedAppointment /> </Route>
                    <Route exact path='/clinic-administrator/medical-staff'> <ClinicAdminMedicalStaff /> </Route>
                    <Route exact path='/clinic-administrator/medical-staff/add'> <CreateMedicalStaff /> </Route>
                    <Route exact path='/clinic-administrator/profile/change/password'> <ClinicAdminChangePassword /> </Route>
                </Switch>
                </div>
                </ClinicAdminContextProvider>
            </div> );
    }
}
 
export default ClinicAdministrator