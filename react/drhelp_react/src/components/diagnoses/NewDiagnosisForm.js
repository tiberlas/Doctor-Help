import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

class NewDiagnosisForm extends React.Component {

    constructor() {
        super()
        this.state = {
            
            diagnosisName: "",
            diagnosisDescription: "",
            error: false,
            errorDiagnosisName: false,
            errorDiagnosisResponse: false,
            errorDescription: false
        }
      
    }

    validate = () => {
        this.setState({error: false, errorDiagnosisName: false, errorDiagnosisResponse: false, errorDescription: false})
        if(!this.state.diagnosisName.trim() || this.state.diagnosisName.length < 3) {
            this.setState({error: true, errorDiagnosisName: true})
        }

        if(!this.state.diagnosisDescription.trim() || this.state.diagnosisDescription.length < 3) {
            this.setState({error: true, errorDescription: true})
        }

    }

    handleChange = (event) => {
        this.setState( {
            [event.target.name]: event.target.value
        }, ()=> {this.validate()})
    }

    handleSubmit = (event) => {
        event.preventDefault()

        axios.post('http://localhost:8080/api/diagnoses/new', { 

            name: this.state.diagnosisName,
            description: this.state.diagnosisDescription
        })
            .then(res => {
                alert("Successfully added new diagnosis.");
            }).catch(error => {
                this.setState({
                    errorDiagnosisResponse: true
                })
            })
    }

    render() {
        return (
            <div> 
            <div class="row d-flex justify-content-center">
                <div class='col-md-3'>
                <h1>>New diagnosis </h1>
                <Form onSubmit = {this.handleSubmit}>
                <div className={`form-group ${(this.state.errorDiagnosisName || this.state.errorDiagnosisResponse)? 'has-danger': ''}`}>
                <Form.Group controlId="formDiagnosisName">
                    <Form.Control type="text" name = "diagnosisName" placeholder="Enter diagnosis name" onChange = {this.handleChange} className={`form-control ${(this.state.errorDiagnosisName || this.state.errorDiagnosisResponse) ? 'is-invalid': ''}`}/>
                    {this.state.errorDiagnosisResponse && <div class="invalid-feedback"> Diagnosis already exists. </div>}
                </Form.Group>
                </div>

                <div className={`form-group ${(this.state.errorDescription)? 'has-danger': ''}`}>
                <Form.Group controlId="formDiagnosisDescription">
                    <Form.Control type="text" name = "diagnosisDescription" placeholder="Description" onChange = {this.handleChange} className={`form-control ${(this.state.errorDescription) ? 'is-invalid': ''}`}/>
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



export default NewDiagnosisForm