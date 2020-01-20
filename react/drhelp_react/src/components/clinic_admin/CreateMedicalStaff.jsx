import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import ModalMessage from '../ModalMessage';

class CreateMedicalStaff extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        birthday: '',
        procedures: {},
        procedureID: '',
        monday: 'NONE',
        tuesday: 'NONE',
        wednesday: 'NONE',
        thursday: 'NONE',
        friday: 'NONE',
        saturday: 'NONE',
        sunday: 'NONE',

        messageShow: false,

        errorFirstName: true,
        errorLastName: true,
        errorEmail: true,
        errorBirthday: true,
        errorShift: true,
        errorProcedure: true,
        errorSpecialization: true,

        typeDoctor: true,
        go_profile: false
    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/procedure+types/all')
            .then(response => {
                this.setState({procedures: response.data})
            })
    }

    handleValidation = () => {
        if(this.state.firstName !== null && this.state.firstName !== '' && this.state.firstName.length > 2) {
            this.setState({errorFirstName: false})
        } else {
            this.setState({errorFirstName: true})
        }

        if(this.state.lastName !== null && this.state.lastName !== '' && this.state.lastName.length > 2) {
            this.setState({errorLastName: false})
        } else {
            this.setState({errorLastName: true})
        }

        if(this.state.email !== null && this.state.email !== '' && this.state.email.length > 2) {
            this.setState({errorEmail: false})
        } else {
            this.setState({errorEmail: true})
        }

        if(this.state.birthday !== null && this.state.birthday !== '') {
            this.setState({errorBirthday: false})
        } else {
            this.setState({errorBirthday: true})
        }

        let workingDays = 0
        if(this.state.monday !== 'NONE') { ++workingDays}
        if(this.state.tuesday !== 'NONE') { ++workingDays}
        if(this.state.wednesday !== 'NONE') { ++workingDays}
        if(this.state.thursday !== 'NONE') { ++workingDays}
        if(this.state.friday !== 'NONE') { ++workingDays}
        if(this.state.saturday !== 'NONE') { ++workingDays}
        if(this.state.sunday !== 'NONE') { ++workingDays}
        if(workingDays < 3) {
            this.setState({errorShift: true})
        } else {
            this.setState({errorShift: false})
        }

    }

    handlerChange = (event) => {
        let nam = event.target.name
        let val = event.target.value
        this.setState({[nam]: val}, () => { this.handleValidation()})
    }

    handleChangeType = () => {
        this.setState({typeDoctor: !this.state.typeDoctor}, () => {this.handleSpecialization()})
    }

    handleSpecialization = () => {
        if(this.state.typeDoctor === false) {
            this.setState({errorSpecialization: false, errorProcedure: true, procedureID: ''})
        } else {
            this.setState({errorSpecialization: true, errorProcedure: true, procedureID: ''})
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let url = ''
        if(this.state.typeDoctor === true) {
            url = 'http://localhost:8080/api/doctors/new+doctor'
        } else {
            url = 'http://localhost:8080/api/nurses/new+nurse'
        }
        let id = ''
        if(this.state.procedureID !== "") {
            id = this.state.procedureID
        }
        axios.post(url, {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    email: this.state.email,
                    procedureId: id,
                    birthday: this.state.birthday,
                    monday: this.state.monday,
                    tuesday: this.state.tuesday,
                    wednesday: this.state.wednesday,
                    thursday: this.state.thursday,
                    friday: this.state.friday,
                    saturday: this.state.saturday,
                    sunday: this.state.sunday
        }).then( (response) => {
            this.setState({go_profile: true})
        }).catch((error) => {
            this.setState({ 
                messageShow: true
            })
        });
    }

    handleCancel = () => {
        this.setState({go_profile: true})
    }

    setMessageHide= () => {
        this.setState({messageShow: false})
    }

    createShift() {
        let items = []; 
        items.push(<option key='1' value="NONE" selected="selected" class='text-muted'> free day </option>);
        items.push(<option key='2' value="FIRST" > first shift </option>);
        items.push(<option key='3' value="SECOND" > second shift </option>);
        items.push(<option key='4' value="THIRD" > third shift </option>);
 
        return items;
    }

    handlerChangeProcedureType = (event) => {
        let val = event.target.value
        if(val === "" || val === null) {
            this.setState({errorSpecialization: true, errorProcedure: true})
        } else {
            this.setState({procedureID: val, errorSpecialization: false, errorProcedure: false})
        }

    }

    createProcedure = () => {
        let items = [];
        var size = Object.keys(this.state.procedures).length;
        items.push(<option key={size} name='procedureID' value="" selected="selected"> ---- </option>);
        for(var i = 0; i<size; ++i) {
            items.push()
            items.push(<option key={i} name='procedureID' value={this.state.procedures[i].id} >{this.state.procedures[i].name}</option>);
        }

        return items;
    }

    render() { 
        if(this.state.go_profile === true)
            return(<Redirect to='/clinic-administrator/medical-staff'></Redirect> ); 
        return ( 
            <div class='row d-flex justify-content-center'>
            <div class='col-md-7'> 
                <div>
                    { this.state.typeDoctor? 
                        <h2>Create a new Doctor</h2>:
                        <h2>Create a new Nurse</h2>
                    }    
                </div>
                <div class="custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" id="customSwitch1" onChange={this.handleChangeType} checked={this.state.typeDoctor} />
                    <label class="custom-control-label" for="customSwitch1">change role </label>
                </div>
                <br/>
                <br/>

                <form onSubmit={this.handleSubmit}> 
                
                    <div className={`form-group ${this.state.errorFirstName? 'has-danger': ''}`}>
                        <label class="form-control-label" for="firstName">First name:</label>
                        <input type='text' name='firstName' id='firstName' className={`form-control ${this.state.errorFirstName? 'is-invalid': 'is-valid'}`} value={this.state.firstName} onChange={this.handlerChange} />
                    </div>

                    <div className={`form-group ${this.state.errorLastName? 'has-danger': ''}`}>
                        <label class="form-control-label" for="lastName">Last name:</label>
                        <input type='text' name='lastName' id='lastName' className={`form-control ${this.state.errorLastName? 'is-invalid': 'is-valid'}`} value={this.state.lastName} onChange={this.handlerChange} />
                    </div>

                    <div class='form-group'>
                        <label class="form-control-label" for="email">Email:</label>
                        <input type='email' name='email' id='email' className={`form-control ${this.state.errorEmail? 'is-invalid': 'is-valid'}`} value={this.state.email} onChange={this.handlerChange} />
                    </div>

                    <div class='form-group'>
                        <label class="form-control-label" for="birthday">Birthday:</label>
                        <input type='date' name='birthday' id='birthday' className={`form-control ${this.state.errorBirthday? 'is-invalid': 'is-valid'}`} value={this.state.birthday} onChange={this.handlerChange} />
                    </div>

                    {
                        this.state.typeDoctor &&
                        <div class='form-group'>
                            <label class="form-control-label" for="procedure">Specialization</label>
                            <select multiple="" className={`form-control ${this.state.errorProcedure? 'is-invalid': 'is-valid'}`} id="procedure" name='procedureID' onChange={this.handlerChangeProcedureType} >
                                {this.createProcedure()}
                            </select>
                        </div>
                    }

                    <br/>
                    <h5>Work shift</h5>
                    <br/>

                    <table>
                        <thead>
                            <th for="monday">Monday</th>
                            <th for="tuesday">Tuesday</th>
                            <th for="wednesday">Wednesday</th>
                            <th for="thursday">Thursday</th>
                            <th for="friday">Friday</th>
                            <th for="saturday">Saturday</th>
                            <th for="sunday">Sunday</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                <div class='form-group'>
                                    <select multiple="" class="form-control" id="monday" name='monday' onChange={this.handlerChange} >
                                        {this.createShift()}
                                    </select>
                                </div>
                                </td>
                            
                                <td>
                                <div class='form-group'>
                                    <select multiple="" class="form-control" id="tuesday" name='tuesday' onChange={this.handlerChange}>
                                        {this.createShift()}
                                    </select>
                                </div>
                                </td>

                                <td>
                                <div class='form-group'>
                                    <select multiple="" class="form-control" id="wednesday" name='wednesday' onChange={this.handlerChange}>
                                        {this.createShift()}
                                    </select>
                                </div>
                                </td>

                                <td>
                                <div class='form-group'>
                                    <select multiple="" class="form-control" id="thursday" name='thursday' onChange={this.handlerChange}>
                                        {this.createShift()}
                                    </select>
                                </div>
                                </td>

                                <td>
                                <div class='form-group'>
                                    <select multiple="" class="form-control" id="friday" name='friday' onChange={this.handlerChange}>
                                        {this.createShift()}
                                    </select>
                                </div>
                                </td>

                                <td>
                                <div class='form-group'>
                                    <select multiple="" class="form-control" id="saturday" name='saturday' onChange={this.handlerChange}>
                                        {this.createShift()}
                                    </select>
                                </div>
                                </td>

                                <td>
                                <div class='form-group'>
                                    <select multiple="" class="form-control" id="sunday" name='sunday' onChange={this.handlerChange}>
                                        {this.createShift()}
                                    </select>
                                </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div hidden={!this.state.errorShift}>
                        <p class='text-danger'>must dafined a minimum of three working days</p>
                    </div>

                    <div class="form-group row">
                        <div class='col-md text-left'>
                            <input type="submit" class="btn btn-success" disabled={ this.state.errorFirstName || this.state.errorLastName || this.state.errorEmail || this.state.errorBirthday || this.state.errorShift || this.state.errorSpecialization} value="submit"/>
                        </div>
                        <div class='col-md text-right'>
                            <button type="button" class="btn btn-danger" onClick={this.handleCancel}>Cancel</button>
                        </div>
                    </div>

                </form>

                <ModalMessage
                        title='Can not create a new medical staff!'
                        message='Email already exists! Please change email and check if all the fields are valid' 
                        show={this.state.messageShow}
                        onHide={this.setMessageHide}/>

            </div>
            </div> );
    }
}
 
export default CreateMedicalStaff;