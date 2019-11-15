
import React from 'react'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'


import NewClinicForm from './NewClinicForm';
import NewAdminForm from './NewAdminForm';

class TempHome extends React.Component {
    
    constructor() {
        super()

        this.state = {
            showClinicForm: false,
            showAdminForm: false,
        }

         this.onChange = this.onChange.bind(this)
    }

    onChange(event) {

        event.persist()
        console.log(event.target.name)
        this.setState( (prevState) => {
            if(event.target.name === "showClinicForm") {
                return {
                    showAdminForm: false,
                    showClinicForm: true
                }
            }
            if(event.target.name === "showAdminForm") {
                return {
                    showAdminForm: true,
                    showClinicForm: false
                }
            }
        })
    }
   

    render() {
        let showClinicForm = this.state.showClinicForm ? <NewClinicForm/> : ''
        let showAdminForm = this.state.showAdminForm ? <NewAdminForm/> : ''
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
                            <NavDropdown.Item href="#action/3.1" name = "showClinicForm" onClick = {this.onChange}>Add new clinic</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2"  name = "showAdminForm" onClick = {this.onChange}> Add new administrator</NavDropdown.Item>
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

                <body> {/*ovde lupam forme */}

                {this.state.showClinicForm && <NewClinicForm/>}
                {this.state.showAdminForm && <NewAdminForm/>}

                </body>
            </div>

            
        )
    }
}



export default TempHome