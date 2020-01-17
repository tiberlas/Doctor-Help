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
              <Nav.Link>
                  <Link exact to='/patient/appointmentList' class="nav-link">Requested Appointments</Link>
              </Nav.Link>
              <Nav.Link>
                  <Link exact to='/patient/history' class="nav-link">Patient History</Link>
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