import React, { Component } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import {Link} from 'react-router-dom'
import {ClinicAdminContext} from '../../context/ClinicAdminContextProvider';

class ClinicAdminHeader extends Component {
    static contextType = ClinicAdminContext
 
    render() { 
        return ( 
        <Navbar bg="light" expand="lg" id="navbarColor03">
        <Navbar.Brand >{this.context.admin.firstName}&nbsp;{this.context.admin.lastName}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link class="nav-item">
                    <Link exact to = '/clinic+administrator/profile' class="nav-link" >profile</Link>
                </Nav.Link>
                <Nav.Link >
                    <Link exact to = '/clinic+administrator/clinic' class="nav-link">clinic's profile</Link>
                </Nav.Link>
                <Nav.Link >
                    <Link exact to = '/clinic+administrator/clinic/change' class="nav-link">change clinic's profile</Link>
                </Nav.Link>
                <Nav.Link>
                    <Link exact to = '/clinic+administrator/rooms' class="nav-link">rooms</Link>
                </Nav.Link>
                <Nav.Link>
                    <Link exact to = '/clinic+administrator/rooms/add' class="nav-link">add rooms</Link>
                </Nav.Link>
                <Nav.Link>
                    <Link exact to='/clinic+administrator/medical+staff' class="nav-link">medical staff</Link>
                </Nav.Link>
            </Nav>
            <Nav className="justify-content-end" >
                <Nav.Link>
                    <Link exact to='/login' onClick={this.props.logout} class="nav-link">Logout</Link>
                </Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
        );
    }
}
 
export default ClinicAdminHeader;