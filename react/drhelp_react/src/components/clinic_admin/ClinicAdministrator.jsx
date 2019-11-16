import React, { Component } from 'react';
import ClinicAdminHeader from './ClinicAdminHeader';
import HandlingRooms from './HandlingRooms';
import {Route, Switch} from "react-router-dom";
import ClinicAdminBlank from './ClinicAdminProfile';
import { UserContext } from '../../context/UserContextProvider'

class ClinicAdministrator extends Component {
    
    state = {
        name: ''
    }

    static contextType = UserContext

    componentDidMount() {
        fetch('http://localhost:8080/api/clinicAdmins/'+this.context.user.id+'/name', { method: "GET" })
        .then(responce => responce.json())
        .then(responce => {
            this.setState({name: responce.firstName + ' ' + responce.lastName})
        });
    }

    render() { 
        return (
             <div>
                <ClinicAdminHeader name={this.state.name} ></ClinicAdminHeader>

                <div>
                <Switch>
                    <Route exact={true} path="/clinic+administrator" ><ClinicAdminBlank id={this.context.user.id} /> </Route>
                    <Route path="/clinic+administrator/profile" ><ClinicAdminBlank id={this.context.user.id} /> </Route>
                    <Route path="/clinic+administrator/rooms" ><HandlingRooms /> </Route>
                </Switch>
                </div>
            </div> );
    }
}
 
export default ClinicAdministrator