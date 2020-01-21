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


class CentreAdminHeader extends Component {
  static contextType = CentreAdminContext;
    
  state = {
    dropdownAdd: false
  }

  toogle = () => {
    this.setState({dropdownAdd:!this.state.dropdownAdd});
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
                  <Link exact to = '/admin/dashboard' class="nav-link"> Dashboard </Link>
            </Nav.Link>
              
                <NavbarToggler onClick={this.toggle}/>
                  <Collapse isOpen={this.state.dropdownAdd} navbar className="collapse">
                      <Nav className="mr-auto" navbar pullRight>
                        <UncontrolledDropdown nav inNavbar>
                          <DropdownToggle nav caret>
                            Add
                          </DropdownToggle>
                          <DropdownMenu className='dropdown-menu'>
                          <LinkContainer exact to="/clinic/add">
                            <DropdownItem >New clinic</DropdownItem>
                          </LinkContainer>

                          <LinkContainer exact to="/admin/add">
                            <DropdownItem >New administrator</DropdownItem>
                          </LinkContainer>

                          <LinkContainer exact to="/medication/new">
                            <DropdownItem >New medication</DropdownItem>
                          </LinkContainer>

                          <LinkContainer exact to="/diagnosis/new">
                            <DropdownItem >New diagnosis</DropdownItem>
                          </LinkContainer>

                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </Nav>
            </Collapse>
                
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