import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

class ClinicAdminHeader extends Component {
    state = {  }
    render() { 
        return ( 
        <Navbar bg="light" expand="lg">
        <Navbar.Brand >{this.props.name}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link href="clinic+administrator">profile</Nav.Link>
                <Nav.Link href="clinic+administrator/rooms">rooms</Nav.Link>
                <Nav.Link href="">medical staff</Nav.Link>   
            </Nav>
        </Navbar.Collapse>
        </Navbar>);
    }
}
 
export default ClinicAdminHeader;