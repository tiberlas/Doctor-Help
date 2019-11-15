import React, { Component } from 'react';

class ClinicAdminChangeProfile extends Component {
    state = {
            id: 1, 
            email: "",
            firstName: "paolo",
            lastName: "",
            address: "",
            city: "",
            state: "",
            phoneNumber: "",
            birthday: ""
     }
    
    handleSubmit = (event) => {
        event.preventDefault();
        alert("SUBMIT")

        fetch('http://localhost:8080/api/clinicAdmins/change', {
            method: "PUT",
            headers: {
              'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    id: this.state.id,
                    email: this.state.email,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    city: this.state.city,
                    state: this.state.state,
                    phoneNumber: this.state.phoneNumber,
                    birthday: this.state.birthday
                })
      }).then(
        alert("done")
      );
    }

    handlerChange = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
  }

    render() { 
        return (  
            <form onSubmit={this.handleSubmit}>
                <div>
                    <p>Enter your first name:</p>
                    <input type='text'name='firstName' value={this.firstName} onChange={this.handlerChange} />
                </div>
                <div>
                    <p>Enter your last name:</p>
                    <input type='text'name='lastName' onChange={this.handlerChange} />
                </div>
                <div>
                    <p>Enter your email:</p>
                    <input type='text'name='email' onChange={this.handlerChange} />
                </div>
                <div>
                    <p>Enter your state:</p>
                    <input type='text'name='state' onChange={this.handlerChange} />
                </div>
                <div>
                    <p>Enter your city:</p>
                    <input type='text'name='city' onChange={this.handlerChange} />
                </div>
                <div>
                    <p>Enter your address:</p>
                    <input type='text'name='address' onChange={this.handlerChange} />
                </div>
                <div>
                    <p>Enter your phoneNumber:</p>
                    <input type='text'name='phoneNumber' onChange={this.handlerChange} />
                </div>
                <div>
                    <input type='submit' value='submit'/>
                </div>
            </form>
        );
    }
}
 
export default ClinicAdminChangeProfile;