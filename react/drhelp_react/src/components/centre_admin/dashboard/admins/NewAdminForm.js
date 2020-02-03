import React,{Fragment} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import FormControl from 'react-bootstrap/FormControl';
import Select from 'react-select'

const fontStyles = {
    container: base => ({
        ...base,
        flex: 1
      }),
    option: provided => ({
    ...provided,
    color: 'black'
    }),
    control: provided => ({
    ...provided,
    color: 'black'
    }),
    singleValue: provided => ({
    ...provided,
    color: 'black'
    })
}

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
            error: false,
            errorMail: true,
            errorMailResponse: false,
            errorFirstName: true,
            errorLastName: true,
            success: false,
            loading: false,
            clinicOptions: []
        }
        
    }


    validate = () => {
        this.setState({error: false, errorMail: false, errorMailResponse: false, errorFirstName: false, errorLastName: false, success: false}, ()=>{
            this.props.disabledOff(false)
        })
        if(!this.state.email.trim() || this.state.email.length < 3) {
            this.setState({error: true, errorMail: true}, ()=>this.props.disabledOn())
        }

        if(!this.state.firstName.trim() || this.state.firstName.length < 3) {
            this.setState({error: true, errorFirstName: true}, ()=>this.props.disabledOn())
        }

        if(!this.state.lastName.trim() || this.state.lastName.length < 3) {
            
            this.setState({error: true, errorLastName: true}, ()=>this.props.disabledOn())
        }
    }

    handleChange = (event) => {
        this.setState( {
            [event.target.name]: event.target.value
        }, () => {this.validate()})
    }


    componentDidMount = () => {
        axios.get(`http://localhost:8080/api/clinics/all`)
      .then(res => {
        this.setState({ clinicList: res.data })
            let items = []
            let size = Object.keys(this.state.clinicList).length
            for (let i = 0; i < size; i++) {
                let option = {
                    label: this.state.clinicList[i].name,
                    value: this.state.clinicList[i].id
                }             
                items.push(option);
           }

           this.setState({
               clinicOptions: items
           })
      })
    }

    handleClinicChange = (option) => {
        console.log('option', option)
        this.setState({id: option.value}, ()=>{
            console.log('clinic id is ', this.state.id)
        })
    }

    handleSubmit = () => {
    
        if(this.state.error)
          return

      this.setState({loading: true}, () => {
        if(this.state.adminRole === "clinic") {
            this.submitClinicAdmin()
        } else {
            this.submitCentreAdmin()
        }
      })
      
}

    submitCentreAdmin = () => {
        let birthdayForm = document.getElementById('ad_birthday').value;
            axios.post('http://localhost:8080/api/centreAdmins/newAdmin', { 
                email: this.state.email,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                birthday: birthdayForm
        })
        .then(res => {
            this.setState({success: true, error: false, errorMailResponse: false, loading: false}, ()=>{
                this.props.disabledOff(true)
            })
        }).catch(error => {
            this.setState({errorMailResponse: true, success: false, error: true, loading: false}, ()=>this.props.disabledOn())
        })
        }

    submitClinicAdmin = () => {
        let birthdayForm = document.getElementById('ad_birthday').value;
        axios.post('http://localhost:8080/api/clinicAdmins/newAdmin', { 

            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            id: this.state.id, //clinic id
            birthday: birthdayForm

         }).then(res => {
            this.setState({success: true, error: false, errorMailResponse: false, loading: false}, ()=>{
                this.props.disabledOff(true)
            })
        }).catch(error => {
            this.setState({errorMailResponse: true, success: false, error: true, loading: false}, ()=>this.props.disabledOn())
        })
    }


    createSelectItems() {
        let items = []; 
        var size = Object.keys(this.state.clinicList).length;
        for (let i = 0; i < size; i++) {             
             items.push(<option key={i} name = "id" value={this.state.clinicList[i].id}> {this.state.clinicList[i].name} </option>);   
        }
        return items;
    }  
    render() {
        return (
            <div> 
            <div class="row d-flex justify-content-center">
                <div class='col-md-11'>
  
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
                    </Form.Group>
                    </div>

                    <Form.Group controlId="formAdminRole">
                            
                    <strong> Role:  </strong>&emsp;

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
                    </Form.Group>
                        <Form.Group controlId="formSelectClinic">

                       {this.state.adminRole==="clinic" 
                       && <Fragment>
                           <div style={{ display: 'inline-flex'}}> 
                            <strong> Clinic:  </strong>&emsp;   
                            {/* <select name = "id" onChange={this.handleChange} label="Multiple Select">
                                {this.createSelectItems()}
                            </select>  */}
                            <div style={{width: '300px'}}>
                                <Select 
                                    id="diagnosisSelect" 
                                    styles={fontStyles} 
                                    className="basic-single" 
                                    classNamePrefix="select" 
                                    name="diagnosis" 
                                    autosize={true}
                                    options={this.state.clinicOptions} 
                                    defaultValue={this.state.clinicOptions[0]} 
                                    onChange = {this.handleClinicChange}
                                />
                            </div>
                            </div>
                        </Fragment>}

                             {this.state.success && <div class="valid-feedback d-block">Successfully added new administrator. </div>  }
                             {this.state.loading && <div> <p class="text-info">Loading... </p> </div>}
                        
                    </Form.Group>
                    </Form>
                </div>
            </div>
            </div>
        )
    }


}

export default NewAdminForm