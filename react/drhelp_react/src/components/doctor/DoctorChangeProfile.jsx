import React, { Component } from 'react';
import {DoctorContext} from '../../context/DoctorContextProvider';
import { Redirect } from 'react-router-dom'
import axios from 'axios';

class DoctorChangeProfile extends Component {
    static contextType = DoctorContext;
    state = { 
        goto_profile: false,
        email: this.context.doctor.email,
        firstName: this.context.doctor.firstName,
        lastName: this.context.doctor.lastName,
        address: this.context.doctor.address,
        city: this.context.doctor.city,
        state: this.context.doctor.state,
        phoneNumber: this.context.doctor.phoneNumber,
        birthday: this.context.doctor.birthday,
        error: false
     }

    handleSubmit = (event) => {
        event.preventDefault();

        axios.put('http://localhost:8080/api/doctors/change', {
                    id: 100,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    city: this.state.city,
                    state: this.state.state,
                    phoneNumber: this.state.phoneNumber
        }).then(
            this.props.handleUpdate,
            this.setState({goto_profile: true})
      ).catch(error =>{
          alert('ERROR')
            this.setState({error: true})
      });
    }

    handlerChange = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
  }

    render() { 
        if(this.state.goto_profile==true) {
            return (
                <Redirect to='/doctor/' ></Redirect>
            );
        }
        return ( 
            <form onSubmit={this.handleSubmit}>
                {this.state.error && <p>Some fields are not valid</p>}
                
                <div>
                    <p>Enter your first name:</p>
                    <input type='text'name='firstName' value={this.state.firstName} onChange={this.handlerChange} />
                </div>
                <div>
                    <p>Enter your last name:</p>
                    <input type='text'name='lastName' value={this.state.lastName} onChange={this.handlerChange} />
                </div>
                <div>
                    <p>Enter your email:</p>
                    <input type='text'name='email' value={this.state.email} onChange={this.handlerChange} />
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
            </form>
         );
    }
}
 
export default DoctorChangeProfile;