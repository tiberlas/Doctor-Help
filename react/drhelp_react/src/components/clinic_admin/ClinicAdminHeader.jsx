import React, { Component } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import {NavLink} from 'react-router-dom'
import {ClinicAdminContext} from '../../context/ClinicAdminContextProvider';

class ClinicAdminHeader extends Component {
    static contextType = ClinicAdminContext

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
                <Nav.Link>
                    <NavLink exact to='/clinic+administrator/medical+staff'>medical staff</NavLink>
                </Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Navbar>);
    }
}
 
export default ClinicAdminHeader;