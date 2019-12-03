import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import { PatientContext } from '../../context/PatientContextProvider';
import { Navbar } from 'react-bootstrap';
import {NavLink} from 'react-router-dom';

class PatientHeader extends Component {
    state = {  }

    static contextType = PatientContext;

    render() { 
        return (  
            <Navbar bg="light" expane="lg">
                <Navbar.Brand>
                    {this.context.patient.firstName}&nbsp;{this.context.patient.lastName}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="patient-navbar">
                        <Nav.Link>
                            <NavLink exact to='/patient/profile'>Profile</NavLink>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse> 
            </Navbar>
        );
    }
}
 
export default PatientHeader;