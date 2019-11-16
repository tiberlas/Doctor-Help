import React, { Component } from 'react'
import {UserContext} from '../../context/UserContextProvider'
import CentreAdminHeader from './CentreAdminHeader'
import {Route, Switch} from "react-router-dom"
import NewClinicForm from './NewClinicForm'
import NewAdminForm from './NewAdminForm'

class CenterAdministrator extends Component {
    state = {  }

    static contextType = UserContext

    render() { 
        return ( 
            <div>
                <CentreAdminHeader />

                <Switch>
                    <Route path="/clinic/add" ><NewClinicForm /> </Route>
                    <Route path="/clinic/add+admin" ><NewAdminForm /> </Route>
                </Switch>
            </div>
          );
    }
}
 
export default CenterAdministrator;