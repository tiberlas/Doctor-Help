import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {NavLink } from "react-router-dom";

class ClinicAdminHeader extends Component {
    state = {  }
    render() { 
        return ( 
        <Navbar bg="light" expand="lg">
        <Navbar.Brand >{this.props.name}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link >
                    <NavLink to = "clinic+administrator" exact activeClassName='active'>profile</NavLink>
                </Nav.Link>
                <Nav.Link>
                    <NavLink to = "clinic+administrator/rooms" exact activeClassName='active'>rooms</NavLink>
                </Nav.Link>
                <Nav.Link >medical staff</Nav.Link>   
            </Nav>
        </Navbar.Collapse>
        </Navbar>);
    }
}
 
export default ClinicAdminHeader;