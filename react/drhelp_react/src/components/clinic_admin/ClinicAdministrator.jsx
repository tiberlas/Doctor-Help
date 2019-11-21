import React, { Component } from 'react';
import ClinicAdminHeader from './ClinicAdminHeader';
import HandlingRooms from './HandlingRooms';
import {Route, Switch, Redirect} from "react-router-dom";
import ClinicAdminProfile from './ClinicAdminProfile';
import { UserContext } from '../../context/UserContextProvider'
import ClinicAdminChangeProfile from './ClinicAdminChangeProfile';
import ClinicAdminContextProvider from '../../context/ClinicAdminContextProvider';
import ClinicAdminMedicalStaff from './ClinicAdminMedicalStaff';
import ClinicAdminChangePassword from './ClinicAdminChangePassword';

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
        this.handleClinicAdmin();
    }

    handleClinicAdmin = () => {
        fetch("http://localhost:8080/api/clinicAdmins/"+ this.context.user.id + "/profile", { method: "GET" })
            .then(response => response.json())
            .then(json => {
                this.setState({
                    email: json.email,
                    firstName: json.firstName,
                    lastName: json.lastName,
                    address: json.address,
                    city: json.city,
                    state: json.state,
                    phoneNumber: json.phoneNumber,
                    birthday: json.birthday,
                    clinicId: json.clinicId
                })
            })
    }

    render() {
        var admin = {id: this.state.id, firstName: this.state.firstName, lastName: this.state.lastName, address: this.state.address, state: this.state.state, city: this.state.city, phoneNumber: this.state.phoneNumber, email: this.state.email, birthday: this.state.birthday, clinicId: this.state.clinicId} 
        return (
             <div>
                <ClinicAdminContextProvider admin={admin}>
                <ClinicAdminHeader></ClinicAdminHeader>

                <div>
                <Switch>
                    <Route exact path="/clinic+administrator/" ><ClinicAdminProfile /> </Route>
                    <Route exact path="/clinic+administrator/profile" ><ClinicAdminProfile /> </Route>
                    <Route exact path="/clinic+administrator/profile/change" ><ClinicAdminChangeProfile  handleUpdate={this.handleClinicAdmin}/> </Route>
                    <Route exact path="/clinic+administrator/rooms" ><HandlingRooms /> </Route>
                    <Route exact path='/clinic+administrator/medical+staff'> <ClinicAdminMedicalStaff /> </Route>
                    <Route exact path='/clinic+administrator/profile/change/password'> <ClinicAdminChangePassword /> </Route>
                </Switch>
                </div>
                </ClinicAdminContextProvider>
            </div> );
    }
}
 
export default ClinicAdministrator