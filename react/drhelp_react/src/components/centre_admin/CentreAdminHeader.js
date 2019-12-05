import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import NavLink from 'react-bootstrap/NavLink'
import Navbar from 'react-bootstrap/Navbar'

import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import {Link} from 'react-router-dom'

class CentreAdminHeader extends Component {
    render() { 
        return ( 
            <Navbar bg="light" expand="lg">
        <Navbar.Brand >{this.props.id}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link >
                    <Link exact to = '/centreAdministrator/profile' >Profile</Link>
                </Nav.Link>
                <Nav.Link >
                    <Link exact to = '/clinic/add' >New clinic</Link>
                </Nav.Link>
                <Nav.Link>
                    <Link exact to = '/admin/add'  >New admin</Link>
                </Nav.Link>
                <Nav.Link >
                    <Link exact to = '/admin/requests'> Patient requests </Link>
                </Nav.Link>   
                <Nav.Link> 
                    <Link exact to = '/medication/new'> New medication </Link>
                </Nav.Link>
                <Nav.Link> 
                    <Link exact to = '/diagnosis/new'> New diagnosis </Link>
                </Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
         );
    }
}
 
export default CentreAdminHeader;