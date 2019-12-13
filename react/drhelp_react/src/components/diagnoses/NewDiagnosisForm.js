import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

class NewDiagnosisForm extends React.Component {

    constructor() {
        super()
        this.state = {
            
            diagnosisName: "",
            diagnosisDescription: ""
        }
      
    }

    handleChange = (event) => {
        this.setState( {
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        axios.post('http://localhost:8080/api/diagnoses/new', { 

            name: this.state.diagnosisName,
            description: this.state.diagnosisDescription
        })
            .then(res => {
                alert("Successfully added new diagnosis.");
            })
    }

    render() {
        return (
            <div> 
            <div class="row d-flex justify-content-center">
                <div class='col-md-3'>
                <h1>>New diagnosis </h1>
                <Form onSubmit = {this.handleSubmit}>
                <Form.Group controlId="formDiagnosisName">
                    <Form.Control type="text" name = "diagnosisName" placeholder="Enter diagnosis name" onChange = {this.handleChange}/>
                </Form.Group>

            
                <Form.Group controlId="formDiagnosisDescription">
                    <Form.Control type="text" name = "diagnosisDescription" placeholder="Description" onChange = {this.handleChange} />
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



export default NewDiagnosisForm