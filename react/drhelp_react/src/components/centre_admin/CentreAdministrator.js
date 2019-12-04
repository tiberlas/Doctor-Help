import React, { Component } from 'react'
import {UserContext} from '../../context/UserContextProvider'
import CentreAdminHeader from './CentreAdminHeader'
import {Route, Switch} from 'react-router-dom'
import NewClinicForm from './NewClinicForm'
import NewAdminForm from './NewAdminForm'
import PatientRequests from './PatientRequests';
import NewMedicationForm from '../medication/NewMedicationForm';
import CentreAdminProfile from './CentreAdminProfile'
import axios from 'axios'
import CentreAdminContextProvider from '../../context/CentreAdminContextProvider';
import CentreAdminChangeProfile from './CentreAdminChangeProfile'

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
        console.log("STATE OF ADMIN IS:", this.state)
        return ( 
            <div>
                <CentreAdminContextProvider admin={this.state.admin}> {/*probably doesnt work} */}
                <CentreAdminHeader />

                <Switch>
                    <Route exact path="/centreAdministrator/profile" ><CentreAdminProfile /> </Route>
                    <Route exact path="/centreAdministrator/profile/change" ><CentreAdminChangeProfile  handleUpdate={this.handleCentreAdmin}/> </Route>
                    <Route path="/clinic/add" ><NewClinicForm /> </Route>
                    <Route path="/admin/add" ><NewAdminForm /> </Route>
                    <Route path = "/admin/requests"> <PatientRequests/> </Route>
                    <Route path = "/medication/new"> <NewMedicationForm/> </Route>
                </Switch>
                </CentreAdminContextProvider>
            </div>
          );
    }
}
 
export default CenterAdministrator;