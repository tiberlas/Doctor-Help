import React from 'react';
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'

class Header extends React.Component {

    render() {
        return(
            <Navbar bg="light" expand="lg">
            <Navbar.Brand href="home">Doctor Help</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="home">Home</Nav.Link>
                <Nav.Link href="clinic+administrator">clinic administrator</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="clinic/add" >Add new clinic</NavDropdown.Item>
                    <NavDropdown.Item href="clinic/add+admin"  name = "showAdminForm"> Add new administrator</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="clinic/add">Separated link</NavDropdown.Item>
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