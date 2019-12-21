import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import {Link} from 'react-router-dom'
import {DoctorContext} from '../../context/DoctorContextProvider';
 
class DoctorHeader extends Component {
    static contextType = DoctorContext;

    render() { 
        return ( 
            <Navbar bg="light" expand="lg">
           <Navbar.Brand >
              <Nav> 
                  <Nav.Link>
                    <Link exact to = '/home' class="nav-link">
                      <strong> drHelp++ </strong>
                    </Link>
                  </Nav.Link>
                </Nav>
            </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">

                  <Nav.Link>
                          <Link exact to='/doctor/schedule' class="nav-link">Schedule</Link>
                  </Nav.Link>

                </Nav>
                <Nav className="justify-content-end" style={{ width: "100%" }}>

                    <Nav.Link>
                     <Link exact to = '/doctor/profile' class="nav-link">
                          {this.context.doctor.firstName}&nbsp;{this.context.doctor.lastName}
                          </Link>
                    </Nav.Link>
                    <Nav.Link>
                            <Link exact to='/login' onClick={this.props.logout} class="nav-link">Logout</Link>
                        </Nav.Link>
                    </Nav>
            </Navbar.Collapse>
            </Navbar>);
    }
}
 
export default DoctorHeader;