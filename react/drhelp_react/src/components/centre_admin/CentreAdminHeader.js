import React, { Component, useState } from 'react';
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import NavLink from 'react-bootstrap/NavLink'
import Navbar from 'react-bootstrap/Navbar'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import {Link} from 'react-router-dom'
import {CentreAdminContext} from '../../context/CentreAdminContextProvider';
import {DropdownItem} from  'react-bootstrap'
import {DropdownToggle, DropdownMenu, NavbarToggler, Collapse,
  UncontrolledDropdown, NavItem} from 'reactstrap'
import { LinkContainer } from 'react-router-bootstrap';
import MenuItem from 'react-bootstrap/DropdownMenu';


class CentreAdminHeader extends Component {
  static contextType = CentreAdminContext;
    
  state = {
    dropdownAdd: false,
    isOpenManage: false
  }

  toogle = () => {
    this.setState({dropdownAdd:!this.state.dropdownAdd});
  }

  
  handleOpenManage = () => {
    this.setState({ isOpenManage: true })
  }

  handleCloseManage = () => {
     this.setState({ isOpenManage: false })
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
            <Collapse id="basic-navbar-nav" isOpenManage={this.state.dropdownAdd} navbar className="collapse">
            
            <Nav>
              <NavDropdown
                onMouseEnter = { this.handleOpenManage }
                onMouseLeave = { this.handleCloseManage }
                show={ this.state.isOpenManage }
                noCaret
                id="language-switcher-container"
                title="Dashboard"
              >
                <LinkContainer exact to="/admin/dashboard/d-m">
                            <DropdownItem >Diagnoses and medication</DropdownItem>
                          </LinkContainer>

                          <LinkContainer exact to="/admin/dashboard/c">
                            <DropdownItem >Clinics</DropdownItem>
                          </LinkContainer>

                          <LinkContainer exact to="/admin/dashboard/a">
                            <DropdownItem >Administrators</DropdownItem>
                          </LinkContainer>
                
              </NavDropdown>
            </Nav>

            
            <Nav className="mr-auto">
                <Nav.Link>
                  <Link exact to = '/admin/requests' class="nav-link"> Patient requests </Link>
                </Nav.Link>
            </Nav>

            <Nav className="justify-content-end" >

                <Nav.Link>
                        <Link exact to = '/centreAdministrator/profile' class="nav-link">
                          {this.context.admin.firstName}&nbsp;{this.context.admin.lastName}
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
 
export default CentreAdminHeader;