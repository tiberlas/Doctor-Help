import React from 'react';
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import {Link} from 'react-router-dom'

class Header extends React.Component {

    render() {
        return(
            <Navbar bg="light" expand="lg">
            <Navbar.Brand href="home">Doctor Help</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link >
                    <Link exact to='/home'>Home</Link>
                </Nav.Link>
                <Nav.Link>
                    <Link exact to='/clinic+administrator'>clinic administrator</Link>
                </Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item >
                        <Link exact to='/clinic/add'>Add new clinic</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item name = "showAdminForm"> 
                        <Link exact to='/clinic/add+admin'> Add new administrator </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item >
                        <Link exact to='/clinic/add'>Separated link</Link>
                    </NavDropdown.Item>
                </NavDropdown>
            </Nav>
        <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-success">Search</Button>
        </Form>
        </Navbar.Collapse>
        </Navbar>
        );
    };

} export default Header