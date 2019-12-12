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
    showAdd: false,
    dropdownAdd: false
  }

  toogle = () => {
    this.setState({dropdownAdd:!this.state.dropdownAdd});
  }


  // menuAdd = (event) => {
  //   event.preventDefault()

  //   this.setState({showAdd: true}, () => {
  //     document.addEventListener('click', this.closeAdd)
  //   })
  // }

  // closeAdd = (event) => {
  //   if(!this.dropdownMenu.contains(event.target)) {
  //     this.setState({showAdd: false}, () => {
  //       document.removeEventListener('click', this.closeAdd)
  //     })
  //   }
  // }

  

    render() { 

      
        return ( 
            <Navbar bg="light" expand="lg" id="navbarColor01">
            <Navbar.Brand >
              <Nav> 
                  <Nav.Link>
                    <Link exact to = '/home' class="nav-link">
                      <strong> drHelp </strong>
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

                {/* <Nav.Link >
                  <Dropdown>
                      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                      Custom toggle
                      </Dropdown.Toggle>

                      <Dropdown.Menu as={CustomMenu}>
                      <Dropdown.Item eventKey="1">Red</Dropdown.Item>
                      <Dropdown.Item eventKey="2">Blue</Dropdown.Item>
                      <Dropdown.Item eventKey="3" active>
                          Orange
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="1">Red-Orange</Dropdown.Item>
                      </Dropdown.Menu>
                  </Dropdown>
              </Nav.Link> */}
  
              {/* <Nav.Link> 
                  <Link exact to = '/medication/new' class="nav-link"> New medication </Link>
              </Nav.Link>
              <Nav.Link> 
                  <Link exact to = '/diagnosis/new' class="nav-link"> New diagnosis </Link>
              </Nav.Link> */}

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