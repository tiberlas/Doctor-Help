import React, { Component } from 'react'
import {UserContext} from '../../context/UserContextProvider'
import CentreAdminHeader from './CentreAdminHeader'
import {Route, Switch} from "react-router-dom"
import NewClinicForm from './NewClinicForm'
import NewAdminForm from './NewAdminForm'
import PatientRequests from './PatientRequests';

class CenterAdministrator extends Component {
    state = {  }

    static contextType = UserContext

    render() { 
        return ( 
            <div>
                <CentreAdminHeader />

                <Switch>
                    <Route path="/clinic/add" ><NewClinicForm /> </Route>
                    <Route path="/admin/add" ><NewAdminForm /> </Route>
                    <Route path = "/admin/requests"> <PatientRequests/> </Route>
                </Switch>
            </div>
          );
    }
}
 
export default CenterAdministrator;