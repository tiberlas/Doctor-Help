import React, { Component } from 'react';
import ClinicAdminHeader from './ClinicAdminHeader';
import HandlingRooms from './HandlingRooms';
import {Route} from "react-router-dom";
import ClinicAdminBlank from './ClinicAdminBlank';

class ClinicAdministrator extends Component {
    state = { name: "to be added" }

    componentDidMount() {
        fetch('http://localhost:8080/api/clinicAdmins/25/name', { method: "GET" })
        .then(responce => responce.json())
        .then(responce => {
            this.setState({name: responce.firstName + ' ' + responce.lastName})
        });
    }

    render() { 
        return (
             <div>
                <ClinicAdminHeader name={this.state.name} ></ClinicAdminHeader>
                <div>HELLO ADMIN</div>

                    <Route path="/clinic+administrator" ><ClinicAdminBlank /> </Route>
                    <Route path="/clinic+administrator/rooms" ><HandlingRooms /> </Route>
            </div> );
    }
}
 
export default ClinicAdministrator
;