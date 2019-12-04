import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import {NavLink} from 'react-router-dom'
import {NurseContext} from '../../context/NurseContextProvider';
 
class NurseHeader extends Component {
    static contextType = NurseContext;

    render() { 
        return ( 
            <Navbar bg="light" expand="lg">
            <Navbar.Brand >{this.context.nurse.firstName}&nbsp;{this.context.nurse.lastName}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link >
                        <NavLink exact to = '/nurse/profile' >profile</NavLink>
                    </Nav.Link>
                </Nav>
                <Nav className="justify-content-end" style={{ width: "100%" }}>
                    <Nav.Link>
                        <NavLink exact to='/login' onClick={this.props.logout}>Logout</NavLink>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Navbar>);
    }
}
 
export default NurseHeader;