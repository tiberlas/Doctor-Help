import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'


class NewClinicForm extends React.Component {

    constructor() {
        super()
        this.state = {
            clinicName: "",
            clinicAddress: "",
            clinicCity: "",
            clinicState: "",
            clinicDescription: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState( {
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()

        axios.post('http://localhost:8080/api/clinics/newClinic', { 

            name: this.state.clinicName,
            address: this.state.clinicAddress,
            city: this.state.clinicCity,
            state: this.state.clinicState,
            description: this.state.clinicDescription
        })
            .then(res => {
                alert("Successfully added new clinic.");
            })


        // fetch('http://localhost:8080/api/clinics/newClinic', {
        //     method: 'post',
        //     headers: {'Content-Type':'application/json', 'Authorization': 'Bearer ' + token},
        //     body: JSON.stringify( {
        //         name: this.state.clinicName,
        //         address: this.state.clinicAddress,
        //         description: this.state.clinicDescription
        //     })
        //    }).then(response => {
        //        if(response.status === 401 || response.status === 403) {
        //             alert("Session expired, please log in again.")
        //             localStorage.removeItem('token')
        //             window.location.href = 'http://localhost:3000/login'
        //        }
        //    })
        
           
    }

    render() {
        return (
            <div> 
            <h1>>New clinic </h1>
            <Form onSubmit = {this.handleSubmit}>
            <Form.Group controlId="formClinicName">
                {/* <Form.Label>Naziv klinike</Form.Label> */}
                <Form.Control type="text" name = "clinicName" placeholder="Enter clinic name" onChange = {this.handleChange}/>
                <Form.Text className="text-muted">
                Clinic has to have a sensible name.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formClinicAddress">
                {/* <Form.Label>Password</Form.Label> */}
                <Form.Control type="text" name = "clinicAddress" placeholder="Address" onChange = {this.handleChange}/>
            </Form.Group>

            <Form.Group controlId="formClinicCity">
                {/* <Form.Label>Password</Form.Label> */}
                <Form.Control type="text" name = "clinicCity" placeholder="City" onChange = {this.handleChange}/>
            </Form.Group>

            <Form.Group controlId="formClinicState">
                {/* <Form.Label>Password</Form.Label> */}
                <Form.Control type="text" name = "clinicState" placeholder="State" onChange = {this.handleChange}/>
            </Form.Group>

            <Form.Group controlId="formClinicDescription">
                {/* <Form.Label>Password</Form.Label> */}
                <Form.Control type="text" name = "clinicDescription" placeholder="Description" onChange = {this.handleChange} />
            </Form.Group>
            <Button variant="btn btn-success" type="submit">
                Submit
            </Button>
            </Form>
            <h1> {this.state.clinicName} {this.state.clinicAddress} {this.state.clinicDescription} </h1>
            </div>
        )
    }
}


export default NewClinicForm