import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

class NewMedicationForm extends React.Component {

    constructor() {
        super()
        this.state = {
            medicationName: "",
            medicationDescription: ""
        }
      
    }

    handleChange = (event) => {
        this.setState( {
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        axios.post('http://localhost:8080/api/medication/new', { 

            name: this.state.medicationName,
            description: this.state.medicationDescription
        })
            .then(res => {
                alert("Successfully added new medication.");
            })
    }

    render() {
        return (
            <div> 
            <div class="row d-flex justify-content-center">
                <div class='col-md-3'>
                    <h1>>New medication </h1>
                    <Form onSubmit = {this.handleSubmit}>
                    <Form.Group controlId="formMedicationName">
                        <Form.Control type="text" name = "medicationName" placeholder="Enter medication name" onChange = {this.handleChange}/>
                    </Form.Group>

                
                    <Form.Group controlId="formMedicationDescription">
                        <Form.Control type="text" name = "medicationDescription" placeholder="Description" onChange = {this.handleChange} />
                    </Form.Group>
                    <Button variant="btn btn-success" type="submit">
                        Create
                    </Button>
                    </Form>
                </div>
             </div>
            </div>
        )
    }
}



export default NewMedicationForm