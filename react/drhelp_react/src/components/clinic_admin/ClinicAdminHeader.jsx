import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import {Link} from 'react-router-dom'

class ClinicAdminHeader extends Component {
    state = { name: '' }

    componentDidMount() {
        fetch('http://localhost:8080/api/clinicAdmins/'+this.props.id+'/name', { method: "GET" })
        .then(responce => responce.json())
        .then(responce => {
            this.setState({name: responce.firstName + ' ' + responce.lastName})
        });
    }

    render() { 
        return ( 
        <Navbar bg="light" expand="lg">
        <Navbar.Brand >{this.state.name}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link >
                    <Link exact to = '/clinic+administrator/profile' >profile</Link>
                </Nav.Link>
                <Nav.Link>
                    <Link exact to = '/clinic+administrator/rooms'  >rooms</Link>
                </Nav.Link>
                <Nav.Link >medical staff</Nav.Link>   
            </Nav>
        </Navbar.Collapse>
        </Navbar>);
    }
}
 
export default ClinicAdminHeader;