import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import FormControl from 'react-bootstrap/FormControl';


class NewAdminForm extends React.Component {
    constructor() {
        super()
        this.state = {
            email: "",
            firstName: "",
            lastName: "",
            adminRole: "centre",
            clinicList: {},
            id: "",
            clinic_numbers: 0,
            error: false,
            errorMail: true,
            errorMailResponse: false,
            errorFirstName: true,
            errorLastName: true,
            success: false

        }
        
    }


    validate = () => {
        this.setState({error: false, errorMail: false, errorMailResponse: false, errorFirstName: false, errorLastName: false, success: false})
        if(!this.state.email.trim() || this.state.email.length < 3) {
            this.setState({error: true, errorMail: true})
        }

        if(!this.state.firstName.trim() || this.state.firstName.length < 3) {
            this.setState({error: true, errorFirstName: true})
        }

        if(!this.state.lastName.trim() || this.state.lastName.length < 3) {
            
            this.setState({error: true, errorLastName: true})
        }
    }

    handleChange = (event) => {
        this.setState( {
            [event.target.name]: event.target.value
        }, () => {this.validate()})
    }


    componentDidMount = () => {
        console.log("didmount")
        axios.get(`http://localhost:8080/api/clinics/all`)
      .then(res => {
        const clinicList = res.data
        this.setState({ clinicList })
      

        this.state.clinic_numbers = Object.keys(this.state.clinicList).length;
        console.log("size is " + this.state.clinic_numbers)
        if(this.state.clinic_numbers > 0) {
            // this.setState( (prevState) => 
            // {
            //     ...prevState,
                this.state.id = this.state.clinicList[0].id
            // })
        }

      })
    }

    componentDidUnmount() {
        console.log("unmount")
    }

    handleSubmit = (event) => {
        event.preventDefault()

        let birthdayForm = document.getElementById('ad_birthday').value;
        if(this.state.error)
          return

      
        if(this.state.adminRole === "clinic") {
                axios.post('http://localhost:8080/api/clinicAdmins/newAdmin', { 

                    email: this.state.email,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    id: this.state.id,
                    birthday: birthdayForm

                 }).then(res => {
                    // alert("Successfully added new clinic administrator.")
                    this.setState({success: true, error: false, errorMailResponse: false})
                }).catch(error => {
                    this.setState({errorMailResponse: true, success: false, error: true})
        })

        } else {
            axios.post('http://localhost:8080/api/centreAdmins/newAdmin', { 
                    email: this.state.email,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    birthday: birthdayForm
         })
            .then(res => {
                // alert("Successfully added new centre administrator.")
                this.setState({success: true, error: false, errorMailResponse: false})
            }).catch(error => {
                this.setState({errorMailResponse: true, success: false, error: true})
            })
        }
    }


    createSelectItems() {
        let items = []; 
        var size = Object.keys(this.state.clinicList).length;
        for (let i = 0; i < size; i++) {             
             items.push(<option key={i} name = "id" value={this.state.clinicList[i].id}> {this.state.clinicList[i].name} </option>);   
             //here I will be creating my options dynamically based on
             //what props are currently passed to the parent component
             console.log("doing it fam")
        }
        return items;
    }  
   
   onDropdownSelected(e) {
    //    let id = e.target.value
    //    this.setState({
    //         [e.target.name]: e.target.value
    //     })
       console.log("THE VAL", e.target.value);
       //here you will see the current selected value of the select input
   }

    render() {
        return (
            <div> 
            <div class="row d-flex justify-content-center">
                <div class='col-md-4'>
            
                    <h1>>New administrator </h1>
                    <Form onSubmit = {this.handleSubmit}>
                    <div className={`form-group ${(this.state.errorMail || this.state.errorMailResponse)? 'has-danger': ''}`}>
                    <Form.Group controlId="formAdminEmail">
                        <Form.Control type="email" name = "email" placeholder="email" onChange = {this.handleChange} className={`form-control ${(this.state.errorMailResponse) ? 'is-invalid': ''}`}/>
                        {this.state.errorMailResponse && <div class="invalid-feedback"> Admin with given mail already registered. </div>}
                    </Form.Group>
                    </div>

                    <div className={`form-group ${this.state.errorFirstName ? 'has-danger': ''}`}>
                    <Form.Group controlId="formAdminFirstName">
                        <Form.Control type="text" name = "firstName" placeholder="first name" onChange = {this.handleChange} className={`form-control ${(this.state.errorFirstName) ? 'is-invalid': 'is-valid'}`}/>
                    </Form.Group>
                    </div>

                    <Form.Group controlId="formAdminBirthday">
                    <FormControl required type="date" placeholder="Date of birth, in format: dd/mm/yyyy" id="ad_birthday"/>
                    </Form.Group>
                    <div className={`form-group ${this.state.errorLastName ? 'has-danger': ''}`}>
                    <Form.Group controlId="formAdminLastName">
                        <Form.Control type="text" name = "lastName" placeholder="last name" onChange = {this.handleChange} className={`form-control ${(this.state.errorLastName) ? 'is-invalid': 'is-valid'}`}/>
                        {this.state.success && 
                             <div class="valid-feedback"> Great success, added new administrator! </div>
                             }
                    </Form.Group>
                    </div>

                    <Form.Group controlId="formAdminRole">


                    <label>
                            <input required
                                type="radio" 
                                name="adminRole"
                                value="clinic"
                                checked={this.state.adminRole === "clinic"}
                                onChange={this.handleChange}
                            /> Clinic
                        </label> &nbsp;
                        <label>
                            <input required
                                type="radio" 
                                name="adminRole"
                                value="centre"
                                checked={this.state.adminRole === "centre"}
                                onChange={this.handleChange}
                            /> Clinical centre
                        </label>
                        <Form.Group controlId="formSelectClinic">
                        {this.state.adminRole==="clinic" && <select name = "id" onChange={this.handleChange} label="Multiple Select">
            {this.createSelectItems()}
        </select>}
                        </Form.Group>
                    </Form.Group>

                    { ((this.state.clinic_numbers > 0 && this.state.adminRole === "clinic") || this.state.adminRole === "centre") 
                    ? <input type='submit' value='Create' className={`btn btn-success ${(this.state.error) ? 'disabled': 'enabled'}`}/> 
                    : <div> <label>You must add at least 1 clinic. <Button variant="btn btn-success" type="submit" disabled> Submit </Button> </label> </div>}
                    
                    </Form>
                </div>
            </div>
            </div>
        )
    }


}

export default NewAdminForm