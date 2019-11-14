import React, { Component } from 'react';

class ClinicAdminBlank extends Component {
    constructor(props) {
        super(props)

        this.state = { 
            id: this.props.id,
            email: "",
            firstName: "imenko",
            lastName: "prezimenic",
            address: "adresa",
            city: "Boston",
            state: "USA",
            phoneNumber: "023/555-555",
            birthday: "1999-03-01T23:00:00.000+0000"
        }
    }

    componentDidMount() {
        fetch("http://localhost:8080/api/clinicAdmins/"+this.state.id+"/profile", { method: "GET" })
            .then(response => response.json())
            .then(response => {
                this.setState({
                    email: response.email,
                    firstName: response.firstName,
                    lastName: response.lastName,
                    address: response.address,
                    city: response.city,
                    state: response.state,
                    phoneNumber: response.phoneNumber,
                    birthday: response.birthday
                })
            })
    }

    render() { 
        return ( 
            <div>
                <div>
                <span>
                    <label>first name:</label>
                    <label>{this.state.firstName}</label>
                </span>
                </div>
                <div>
                <span>
                    <label>last name:</label>
                    <label>{this.state.lastName}</label>
                </span>
                </div>
                <div>
                <span>
                    <label>email:</label>
                    <label>{this.state.email}</label>
                </span>
                </div>
                <div>
                <span>
                    <label>address:</label>
                    <label>{this.state.address}</label>
                </span>
                </div>
                <div>
                <span>
                    <label>city:</label>
                    <label>{this.state.city}</label>
                </span>
                </div>
                <div>
                <span>
                    <label>state:</label>
                    <label>{this.state.state}</label>
                </span>
                </div>
                <div>
                <span>
                    <label>phoneNumber:</label>
                    <label>{this.state.phoneNumber}</label>
                </span>
                </div>
                <div>
                <span>
                    <label>birthday:</label>
                    <label>{this.state.birthday}</label>
                </span>
                </div>
            </div>
         );
    }
}
 
export default ClinicAdminBlank;