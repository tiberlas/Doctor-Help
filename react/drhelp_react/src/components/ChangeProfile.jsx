import React, { Component } from 'react';

class ChangeProfile extends Component {
    state = { 
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName,
        state: this.props.user.state,
        city: this.props.user.city,
        address: this.props.user.address,
        phoneNumber: this.props.user.phoneNumber,
        errorName: false,
        errorLast: false,
        errorState: false,
        errorCity: false,
        errorAddress: false,
        errorPhone: false
    }

    handlerChange = (event) => {
        let nam = event.target.name
        let val = event.target.value
        this.setState({[nam]: val}, () => { this.handleValidation()})
    }

    handleValidation = () => {
        this.setState({errorName: false, errorLast: false, errorState: false, errorCity: false, errorAddress: false})

        if(!this.state.firstName.trim() || this.state.firstName.length < 3) {
            this.setState({errorName: true})
        }
    }


    handleSubmit = (event) => {
        event.preventDefault();
        var user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            state: this.state.state,
            city: this.state.city,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber
        }
        this.props.handleSubmit(user);
    }

    render() { 
        return (
            <div class='row d-flex justify-content-center'>
            <div class='col-md-3'> 
            <form onSubmit={this.handleSubmit}>
                <div className={`form-group ${this.state.errorName? 'has-danger': ''}`}>
                <label class="form-control-label" for="firstName">Enter your first name:</label>
                    <input type='text'name='firstName' id='firstName' className={`form-control ${this.state.errorName? 'is-invalid': ''}`} value={this.state.firstName} onChange={this.handlerChange} />
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
                    <input type='submit' value='submit' class="btn btn-success"/>
                </div>
                <div>
                    {this.state.errorBack && <p>some fiealds are in valid</p>}
                </div>
            </form>
            </div>
            </div> 
        );
    }
}
 
export default ChangeProfile;
