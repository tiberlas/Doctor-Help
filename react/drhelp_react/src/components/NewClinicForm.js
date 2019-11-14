import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'



class Card {
    constructor(name, address, description) {
      this.name = name;
      this.address = address;
      this.description = description;
    }
  }


class NewClinicForm extends React.Component {

    constructor() {
        super()
        this.state = {
            clinicName: "",
            clinicAddress: "",
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

        const data = {
            name: this.state.clinicName,
            address: this.state.clinicAddress,
            description: this.state.clinicDescription
          };

        let data1 = new Card(this.state.name, this.state.address, this.state.description)
        //   Object data1 = new Object()
        //   data1.name = this.state.name
        //   data1.address = this.state.address
        //   data1.description = this.state.description
        console.log(data)
        const datastr = JSON.stringify(data)
        console.log(" str "+datastr)
          axios.post('http://localhost:8080/api/clinics/newClinic', {
            //   name: this.state.name,
            //   address: this.state.address,
            //   description: this.state.description
            data1
            },  {headers: {'content-type': 'application/json'}})
            .then(res => {
              console.log(res.data);
            })
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
            <Form.Group controlId="formClinicDescription">
                {/* <Form.Label>Password</Form.Label> */}
                <Form.Control type="text" name = "clinicDescription" placeholder="Description" onChange = {this.handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
            </Form>
            <h1> {this.state.clinicName} {this.state.clinicAddress} {this.state.clinicDescription} </h1>
            </div>
        )
    }
}


export default NewClinicForm