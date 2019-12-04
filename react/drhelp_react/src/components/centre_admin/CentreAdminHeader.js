import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import {NavLink} from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import {CentreAdminContext} from '../../context/CentreAdminContextProvider';
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import {Link} from 'react-router-dom'

class CentreAdminHeader extends Component {

    static contextType = CentreAdminContext

    render() { 
        return ( 
            <Navbar bg="light" expand="lg">
             <Navbar.Brand ></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link >
                    <NavLink exact to = '/centreAdministrator/profile' >Profile</NavLink>
                </Nav.Link>
                <Nav.Link >
                    <NavLink exact to = '/clinic/add' >New clinic</NavLink>
                </Nav.Link>
                <Nav.Link>
                    <NavLink exact to = '/admin/add'  >New admin</NavLink>
                </Nav.Link>
                <Nav.Link >
                    <NavLink exact to = '/admin/requests'> Patient requests </NavLink>
                </Nav.Link>   
                <Nav.Link> 
                    <NavLink exact to = '/medication/new'> New medication </NavLink>
                </Nav.Link>
                <Nav.Link> 
                    <NavLink exact to = '/diagnosis/new'> New diagnosis </NavLink>
                </Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
        )

    }
}
 
export default CentreAdminHeader;