import React, { Component } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import {Link} from 'react-router-dom'
import {ClinicAdminContext} from '../../context/ClinicAdminContextProvider';
import {DropdownItem} from  'react-bootstrap'
import {DropdownToggle, DropdownMenu, NavbarToggler, Collapse, UncontrolledDropdown, NavItem} from 'reactstrap'
import { LinkContainer } from 'react-router-bootstrap';

class ClinicAdminHeader extends Component {
    static contextType = ClinicAdminContext
 
    state= {
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

            <NavbarToggler onClick={this.toggle}/>
            <Collapse isOpen={this.state.dropdownAdd} navbar className="collapse">
                <Nav className="mr-auto" navbar pullRight>
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                    Clinic
                    </DropdownToggle>
                    <DropdownMenu className='dropdown-menu'>
                    <LinkContainer exact to = '/clinic-administrator/clinic'>
                    <DropdownItem >Profile</DropdownItem>
                    </LinkContainer>
                    
                    <LinkContainer exact to='/clinic-administrator/clinic/change'>
                    <DropdownItem >Change</DropdownItem>
                    </LinkContainer>

                    </DropdownMenu>
                </UncontrolledDropdown>
                </Nav>
            </Collapse>

            <NavbarToggler onClick={this.toggle}/>
            <Collapse isOpen={this.state.dropdownAdd} navbar className="collapse">
                <Nav className="mr-auto" navbar pullRight>
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                    Room
                    </DropdownToggle>
                    <DropdownMenu className='dropdown-menu'>
                    <LinkContainer exact to = '/clinic-administrator/rooms'>
                    <DropdownItem >List</DropdownItem>
                    </LinkContainer>
                    
                    <LinkContainer exact to='/clinic-administrator/rooms/add'>
                    <DropdownItem >Add</DropdownItem>
                    </LinkContainer>

                    </DropdownMenu>
                </UncontrolledDropdown>
                </Nav>
            </Collapse>

            <NavbarToggler onClick={this.toggle}/>
            <Collapse isOpen={this.state.dropdownAdd} navbar className="collapse">
                <Nav className="mr-auto" navbar pullRight>
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                    Procedure type
                    </DropdownToggle>
                    <DropdownMenu className='dropdown-menu'>
                    <LinkContainer exact to = '/clinic-administrator/procedure-types'>
                    <DropdownItem >List</DropdownItem>
                    </LinkContainer>
                    
                    <LinkContainer exact to='/clinic-administrator/procedure-types/add'>
                    <DropdownItem >Add</DropdownItem>
                    </LinkContainer>

                    </DropdownMenu>
                </UncontrolledDropdown>
                </Nav>
            </Collapse>

            <Nav.Link>
                    <Link exact to='/clinic-administrator/medical-staff' class="nav-link">Medical staff</Link>
            </Nav.Link>

            </Nav>
            <Nav className="justify-content-end" >

                <Nav.Link>
                        <Link exact to = '/clinic-administrator/profile' class="nav-link">
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
 
export default ClinicAdminHeader;