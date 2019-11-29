import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import {NavLink} from 'react-router-dom'
import {DoctorContext} from '../../context/DoctorContextProvider';

class DoctorHeader extends Component {
    static contextType = DoctorContext;

    render() { 
        return ( 
            <Navbar bg="light" expand="lg">
            <Navbar.Brand >{this.context.doctor.firstName}&nbsp;{this.context.doctor.lastName}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link >
                        <NavLink exact to = '/doctor/profile' >profile</NavLink>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Navbar>);
    }
}
 
export default DoctorHeader;