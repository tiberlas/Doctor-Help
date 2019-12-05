import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import { PatientContext } from '../../context/PatientContextProvider';
import { Navbar } from 'react-bootstrap';
import {Link} from 'react-router-dom';

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
                    <Nav className="justify-content-start" style={{ width: "100%" }}>
                        <Nav.Link>
                            <Link exact to='/patient/profile' class="nav-link">Profile</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link exact to='/patient/clinicList' class="nav-link">Clinics</Link>
                        </Nav.Link>
                    </Nav>
                    <Nav className="justify-content-end" style={{ width: "100%" }}>
                        <Nav.Link>
                            <Link exact to='/login' onClick={this.props.logout} class="nav-link">Logout</Link>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse> 
            </Navbar>
        );
    }
}
 
export default PatientHeader;