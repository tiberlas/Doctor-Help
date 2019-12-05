import React, { Component } from 'react';

class ChangeProfile extends Component {
    state = { 
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName,
        state: this.props.user.state,
        city: this.props.user.city,
        address: this.props.user.address,
        phoneNumber: this.props.user.phoneNumber
    }

    handlerChange = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
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
 
export default ChangeProfile;
