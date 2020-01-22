import React, { Component } from 'react'
import CentreAdminHeader from './CentreAdminHeader'
import {Route} from 'react-router-dom'
import {Switch} from 'react-router-dom'
import NewClinicForm from './dashboard/clinics/NewClinicForm'
import NewAdminForm from './NewAdminForm'
import PatientRequests from './PatientRequests';
import CentreAdminProfile from './CentreAdminProfile'
import axios from 'axios'
import CentreAdminContextProvider from '../../context/CentreAdminContextProvider';
import CentreAdminChangeProfile from './CentreAdminChangeProfile'
import CentreAdminChangePassword from './CentreAdminChangePassword'
import CentreAdminDashboard from './CentreAdminDashboard'
import { ClinicOverview } from './dashboard/clinics/ClinicOverview'

class CenterAdministrator extends Component {
    state = {
        admin: {
            id: 1, 
            email: "",
            firstName: "",
            lastName: "",
            address: "",
            city: "",
            state: "",
            phoneNumber: "",
            birthday: ""
        }
}


componentDidMount() {
    this.handleCentreAdmin();
}

handleCentreAdmin = () => {
    axios.get("http://localhost:8080/api/centreAdmins/profile")
        .then(response =>  {
            this.setState({
                admin: {
                    email: response.data.email,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    address: response.data.address,
                    city: response.data.city,
                    state: response.data.state,
                    phoneNumber: response.data.phoneNumber,
                    birthday: response.data.birthday
                }
            })
        })
}
    render() { 
        return ( 
            <div>

                <CentreAdminContextProvider admin={this.state.admin}> 
                <CentreAdminHeader logout={() => this.props.logout ()}/>

                <Switch>
                    <Route exact path="/centreAdministrator/profile" ><CentreAdminProfile /> </Route>
                    <Route exact path="/centreAdministrator/profile/change" ><CentreAdminChangeProfile  handleUpdate={this.handleCentreAdmin}/> </Route>
                    <Route exact path='/centreAdministrator/profile/change/password'> <CentreAdminChangePassword first={false}/> </Route>
                    <Route path="/admin/dashboard/c" ><ClinicOverview /> </Route>
                    <Route path="/admin/dashboard/a" ><NewAdminForm /> </Route>
                    <Route path="/admin/dashboard/d-m" ><CentreAdminDashboard /> </Route>
                    <Route path = "/admin/requests"> <PatientRequests/> </Route>
                   
                </Switch>
                </CentreAdminContextProvider>
            </div>
          );
    }
}
 
export default CenterAdministrator;