import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

class NewMedicationForm extends React.Component {

    constructor() {
        super()
        this.state = {
            medicationName: "",
            medicationDescription: "",
            error: false,
            errorMedicationName: false,
            errorMedicationResponse: false,
            errorDescription: false
        }
      
    }


    validate = () => {
        this.setState({error: false, errorMedicationResponse: false, errorDescription: false, errorMedicationName: false})
        if(!this.state.medicationName.trim() || this.state.medicationName.length < 3) {
            this.setState({error: true, errorMedicationName: true})
        }

        if(!this.state.medicationDescription.trim() || this.state.medicationDescription.length < 3) {
            this.setState({error: true, errorDescription: true})
        }

    }

    handleChange = (event) => {
        this.setState( {
            [event.target.name]: event.target.value
        }, () => {this.validate()})
    }

    handleSubmit = (event) => {
        event.preventDefault()

        axios.post('http://localhost:8080/api/medication/new', { 

            name: this.state.medicationName,
            description: this.state.medicationDescription
        })
            .then(res => {
                alert("Successfully added new medication.");
            }).catch(error => {
                this.setState({
                    errorMedicationResponse: true
                })
            })
    }

    render() {
        return (
            <div> 
            <div class="row d-flex justify-content-center">
                <div class='col-md-3'>
                    <h1>>New medication </h1>
                   
                    <Form onSubmit = {this.handleSubmit}>
                    <div className={`form-group ${(this.state.errorMedicationName || this.state.errorMedicationResponse)? 'has-danger': ''}`}>
                    <Form.Group controlId="formMedicationName">
                        <Form.Control type="text" name = "medicationName" placeholder="Enter medication name" onChange = {this.handleChange} className={`form-control ${(this.state.errorMedicationName || this.state.errorMedicationResponse) ? 'is-invalid': ''}`}/>
                        {this.state.errorMedicationResponse && <div class="invalid-feedback"> Medication already exists. </div>}
                    </Form.Group>
                    </div>

                
                    <div className={`form-group ${(this.state.errorDescription)? 'has-danger': ''}`}>
                    <Form.Group controlId="formMedicationDescription">
                        <Form.Control type="text" name = "medicationDescription" placeholder="Description" onChange = {this.handleChange} className={`form-control ${(this.state.errorDescription) ? 'is-invalid': ''}`}/>
                    </Form.Group>
                    </div>
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