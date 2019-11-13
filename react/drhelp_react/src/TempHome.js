
import React from 'react'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'


import NewClinicForm from './NewClinicForm'

class TempHome extends React.Component {
    
    constructor() {
        super()

        this.state = {
            showClinicForm: false,
            showClinicAdminForm: false,
            showCentreAdminForm: false
        }

        this.newClinicEvent = this.newClinicEvent.bind(this)
    }


    newClinicEvent() {
        this.setState( (prevState) => {
            if(!prevState.showClinicForm) {
                return {
                    ...prevState,
                    showClinicForm: true
                }
            } 

            console.log("BOOLEAN " + this.state.showClinicForm)
        })


        console.log("doing it fam.")
    }

    render() {
        let showClinicForm = this.state.showClinicForm
        if(showClinicForm) {
            return <NewClinicForm/>
        }

        return(
            <div> 
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1" onClick = {this.newClinicEvent}>Add new clinic</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Add new clinic administrator</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Add new centre administrator</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
                </Form>
                </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}



export default TempHome