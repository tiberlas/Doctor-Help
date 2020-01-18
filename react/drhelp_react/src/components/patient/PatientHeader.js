import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import { PatientContext } from '../../context/PatientContextProvider';
import { Navbar } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {DropdownItem} from  'react-bootstrap'
import {DropdownToggle, DropdownMenu, NavbarToggler, Collapse, UncontrolledDropdown, NavItem} from 'reactstrap'
import { LinkContainer } from 'react-router-bootstrap';

class PatientHeader extends Component {
    state = {  }
 
    static contextType = PatientContext;

    collapse (arg) {
        alert ("Collapsing")
    }

    render() { 
        return ( 
            <Navbar bg="light" expand="lg" id="navbarColor01">
                <Navbar.Brand >
                    <Nav> 
                        <Nav.Link>
                            <Link exact to = '/home' class="nav-link">
                            <strong> drHelp++ </strong>
                            </Link>
                        </Nav.Link>
                    </Nav>
                </Navbar.Brand>
            <NavbarToggler aria-controls="basic-navbar-nav"/>
            <Collapse id="basic-navbar-nav" isOpen={this.state.dropdownAdd} navbar className="collapse">
                <Nav className="mr-auto">
                    <Nav.Link>
                        <Link exact to='/patient/clinicList' class="nav-link">Clinics</Link>
                    </Nav.Link>

                    
                    <Collapse isOpen={true} navbar className="collapse">
                        <Nav>
                            <UncontrolledDropdown nav inNavbar={true}>
                                <DropdownToggle nav caret >
                                    Appointments
                                </DropdownToggle>
                                <DropdownMenu width="1000" >
                                    <LinkContainer exact to='/patient/appointmentList' class="nav-link" >
                                        <DropdownItem >
                                            Pending Appintments
                                        </DropdownItem>
                                    </LinkContainer>
                                    <LinkContainer  exact to='/patient/history' class="nav-link">
                                        <DropdownItem onClick={this.toggle}>
                                            Patient History
                                        </DropdownItem>
                                    </LinkContainer>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>

                    
                    
                    
                    <Nav.Link>
                        <Link exact to='/patient/health-record' class="nav-link">Health record</Link>
                    </Nav.Link>
                </Nav>
                <Nav className="justify-content-end" >
                    <Nav.Link>
                        <Link exact to = '/patient/profile' class="nav-link">
                            {this.context.patient.firstName}&nbsp;{this.context.patient.lastName}
                        </Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link exact to='/login' onClick={this.props.logout} class="nav-link">Logout</Link>
                    </Nav.Link>
                </Nav>
            </Collapse>
        </Navbar>
            
        );
    }
}
 
export default PatientHeader;