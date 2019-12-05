import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
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
                    <Link exact to = '/clinic/add' class="nav-link">New clinic</Link>
                </Nav.Link>
                <Nav.Link>
                    <Link exact to = '/admin/add' class="nav-link">New admin</Link>
                </Nav.Link>
                <Nav.Link >
                    <Link exact to = '/admin/requests' class="nav-link"> Patient requests </Link>
                </Nav.Link>   
                <Nav.Link> 
                    <Link exact to = '/medication/new' class="nav-link"> New medication </Link>
                </Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
         );
    }
}
 
export default CentreAdminHeader;