import React, { Component } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import {NavLink} from 'react-router-dom'
import {ClinicAdminContext} from '../../context/ClinicAdminContextProvider';

class ClinicAdminHeader extends Component {
    static contextType = ClinicAdminContext

    // componentDidMount() {
    //     fetch('http://localhost:8080/api/clinicAdmins/'+this.context.admin.id+'/name', { method: "GET" })
    //     .then(responce => responce.json())
    //     .then(responce => {
    //         this.setState({name: responce.firstName + ' ' + responce.lastName})
    //     });
    // }

    render() { 
        return ( 
        <Navbar bg="light" expand="lg">
        <Navbar.Brand >{this.context.admin.firstName}&nbsp;{this.context.admin.lastName}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link >
                    <NavLink exact to = '/clinic+administrator/profile' >profile</NavLink>
                </Nav.Link>
                <Nav.Link>
                    <NavLink exact to = '/clinic+administrator/rooms'  >rooms</NavLink>
                </Nav.Link>
                <Nav.Link >medical staff</Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Navbar>);
    }
}
 
export default ClinicAdminHeader;