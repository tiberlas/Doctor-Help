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
            clinicDescription: "", 
            error: false,
            errorName: false,
            errorAddress: false,
            errorDescription: false,
            errorClinicName: false
        }
       
    }

    isCharNumber(c){
        return c >= '0' && c <= '9';
    }

    validate = () => {
        this.setState({error: false, errorName: false, errorAddress: false, errorDescription: false, errorClinicName: false})
        if(!this.state.clinicName.trim() || this.state.clinicName.length < 3) {
            this.setState({error: true, errorName: true})
        }

        if(!this.state.clinicDescription.trim() || this.state.clinicDescription.length < 3) {
            this.setState({error: true, errorDescription: true})
        }

        if(!this.state.clinicAddress.trim() || this.state.clinicAddress.length < 3 || !this.isCharNumber(this.state.clinicAddress[0])) {
            
            this.setState({error: true, errorAddress: true})
        }
    }


    handleChange = (event) => {
        this.setState( {
            [event.target.name]: event.target.value
        }, () => {this.validate()})
    }

    handleSubmit = (event) => {
        event.preventDefault()

        if(this.state.error)
            return

        axios.post('http://localhost:8080/api/clinics/newClinic', { 

            name: this.state.clinicName,
            address: this.state.clinicAddress,
            description: this.state.clinicDescription
        })
            .then(res => {
                alert("Successfully added new clinic.");

            }).catch(error => { 
                this.setState({errorClinicName: true})
            })
    }

    render() {
        return (
            
                <div class="row d-flex justify-content-center">
                    <div class='col-md-3'>
                    
                    <h1>>New clinic </h1>
                   
                   
                    <Form onSubmit = {this.handleSubmit}>
                    <div className={`form-group ${(this.state.errorName || this.state.errorClinicName)? 'has-danger': ''}`}>
                    <Form.Group controlId="formClinicName">         
                        <Form.Control type="text" name = "clinicName" placeholder="Enter clinic name" onChange = {this.handleChange} className={`form-control ${(this.state.errorName || this.state.errorClinicName) ? 'is-invalid': ''}`}/>
                        {this.state.errorClinicName ? <div class="invalid-feedback">Clinic with that name already exists. </div>
                        : <Form.Text className="text-muted">
                        Clinic has to have a sensible name.
                        </Form.Text> }
                     
                    </Form.Group>
                    </div>

                    <div className={`form-group ${this.state.errorAddress? 'has-danger': ''}`}>
                    <Form.Group controlId="formClinicAddress">
                        <Form.Control type="text" name = "clinicAddress" placeholder="Address" onChange = {this.handleChange} className={`form-control ${this.state.errorAddress? 'is-invalid': ''}`}/>
                        {this.state.errorAddress &&  <div class="invalid-feedback"> Invalid address format </div>}
                    </Form.Group>
                    </div>

                    <div className={`form-group ${this.state.errorDescription? 'has-danger': ''}`}>
                    <Form.Group controlId="formClinicDescription">
                        <Form.Control type="text" name = "clinicDescription" placeholder="Description" onChange = {this.handleChange} className={`form-control ${this.state.errorDescription? 'is-invalid': ''}`} />
                    </Form.Group>
                    </div>

                    
                        {/* <input type='submit' value='submit' className={`btn btn-success ${this.state.error? 'disabled': ''}`}/> */}
                    
                       
                        <input type='submit' value='Create' className={`btn btn-success ${this.state.error? 'disabled': ''}`}/>
                    {/* <Button variant="btn btn-success" type="submit" className={`btn btn-success ${this.state.error? 'disabled': ''}`}>
                        Create
                    </Button> */}

                    </Form>
                    </div>
                   
                    </div>
            
        )
    }
}


export default NewClinicForm