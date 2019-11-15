import React, { Component } from 'react';
import ClinicAdminHeader from './ClinicAdminHeader';
import HandlingRooms from './HandlingRooms';
import {Route, Switch} from "react-router-dom";
import ClinicAdminBlank from './ClinicAdminBlank';

class ClinicAdministrator extends Component {
    state = { 
        name: "to be added", 
        id: 25
    }

    componentDidMount() {
        fetch('http://localhost:8080/api/clinicAdmins/'+this.state.id+'/name', { method: "GET" })
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

                <div>
                <Switch>
                <Route exact={true} path="/clinic+administrator" ><ClinicAdminBlank id={this.state.id} /> </Route>
                    <Route path="/clinic+administrator/profile" ><ClinicAdminBlank id={this.state.id} /> </Route>
                    <Route path="/clinic+administrator/rooms" ><HandlingRooms /> </Route>
                </Switch>
                </div>
            </div> );
    }
}
 
export default ClinicAdministrator
;