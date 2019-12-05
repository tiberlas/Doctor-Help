import React, { Component } from 'react';
import {ClinicAdminContext} from '../../context/ClinicAdminContextProvider';
import { Redirect } from 'react-router-dom'
import axios from 'axios';

class ClinicAdminChangeProfile extends Component {
    
    static contextType = ClinicAdminContext
    state = {
        go_profile: false,
        errorBack: false,
        id: this.context.admin.id,
        firstName: this.context.admin.firstName,
        lastName: this.context.admin.lastName,
        address: this.context.admin.address,
        city: this.context.admin.city,
        state: this.context.admin.state,
        phoneNumber: this.context.admin.phoneNumber,
        birthday: this.context.admin.birthday
    }


    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({go_profile: false})
        this.setState({errorBack: false})

        axios.put('http://localhost:8080/api/clinicAdmins/change', {
                    id: this.state.id,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    city: this.state.city,
                    state: this.state.state,
                    phoneNumber: this.state.phoneNumber
        }).then( (response) => {
            this.props.handleUpdate()
            this.setState({go_profile: true})
        }).catch((error) => {
            this.setState({errorBack: true})
        });
    }

    handlerChange = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
  }

    render() { 
        if(this.state.go_profile == true)
            return (<Redirect to='/clinic+administrator/'></Redirect>);
        return (  
            <form onSubmit={this.handleSubmit}>
                <div>
                    <p>Enter your first name:</p>
                    <input type='text'name='firstName' value={this.state.firstName} onChange={this.handlerChange} />
                </div>
                <div>
                    <p>Enter your last name:</p>
                    <input type='text'name='lastName' value={this.state.lastName} onChange={this.handlerChange} />
                </div>
                <div>
                    <p>Enter your state:</p>
                    <input type='text'name='state' value={this.state.state} onChange={this.handlerChange} />
                </div>
                <div>
                    <p>Enter your city:</p>
                    <input type='text'name='city' value={this.state.city} onChange={this.handlerChange} />
                </div>
                <div>
                    <p>Enter your address:</p>
                    <input type='text'name='address' value={this.state.address} onChange={this.handlerChange} />
                </div>
                <div>
                    <p>Enter your phoneNumber:</p>
                    <input type='text'name='phoneNumber' value={this.state.phoneNumber} onChange={this.handlerChange} />
                </div>
                <div>
                    <input type='submit' value='submit'/>
                </div>
                <div>
                    {this.state.errorBack && <p>some fiealds are in valid</p>}
                </div>
            </form>
        );
    }
}
 
export default ClinicAdminChangeProfile;