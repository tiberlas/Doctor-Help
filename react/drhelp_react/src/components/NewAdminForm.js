import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'



class NewAdminForm extends React.Component {
    
    constructor() {
        super()
        this.state = {
            email: "",
            firstName: "",
            lastName: "",
            adminRole: "",
            clinicList: {},
            id: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.componentDidMount= this.componentDidMount.bind(this)
    }

    handleChange(event) {
        console.log("THE EV VAL", event.target.value);
        console.log("THE EV NAME", event.target.name);
        this.setState( {
            [event.target.name]: event.target.value
        })
    }


    componentDidMount = () => {
        console.log("didmount")
        axios.get(`http://localhost:8080/api/clinics/all`)
      .then(res => {
        const clinicList = res.data
        this.setState({ clinicList });
        //const items = clinicList.map(item => )
        // console.log(res.data[0].address)
        // console.log(this.state.clinicList[0].name)

       

      })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        const data = {
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            id: this.state.id
          };

        console.log("THE ID IS" + this.state.id)
        console.log(data)
      
        if(this.state.adminRole === "clinic") {
                axios.post('http://localhost:8080/api/clinicAdmins/newAdmin', { 

                    email: this.state.email,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    id: this.state.id

                 })
                    .then(res => {
                    console.log(data);
                    })
        } else {
            axios.post('http://localhost:8080/api/centreAdmins/newAdmin', {  email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName })
            .then(res => {
            console.log(data);
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
            <h1>> New administrator </h1>
            <Form onSubmit = {this.handleSubmit}>
            <Form.Group controlId="formAdminEmail">
                <Form.Control type="email" name = "email" placeholder="email" onChange = {this.handleChange}/>
            </Form.Group>

            <Form.Group controlId="formAdminFirstName">
                <Form.Control type="text" name = "firstName" placeholder="first name" onChange = {this.handleChange}/>
            </Form.Group>
            <Form.Group controlId="formAdminLastName">
                <Form.Control type="text" name = "lastName" placeholder="last name" onChange = {this.handleChange} />
            </Form.Group>

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
                {/* {<select 
                    value={this.state.clinicList.name}
                    onChange={this.handleChange}
                    name="favColor"
                >
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    <option value="red">Red</option>
                    <option value="orange">Orange</option>
                    <option value="yellow">Yellow</option>
                </select>} */}
                {this.state.adminRole==="clinic" && <select name = "id" onChange={this.handleChange} label="Multiple Select">
       {this.createSelectItems()}
  </select>}
                </Form.Group>
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
            </Form>
            <h1> {this.state.email} {this.state.firstName} {this.state.lastName} {this.state.adminRole} {}</h1>
            </div>
        )
    }


}

export default NewAdminForm