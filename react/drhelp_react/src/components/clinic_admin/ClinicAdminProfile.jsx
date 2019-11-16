import React, { Component } from 'react';
import ClinicAdminChangeProfile from './ClinicAdminChangeProfile';

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
            birthday: "1999-03-01T23:00:00.000+0000",
            show: false
        }
    }

    componentDidMount() {
        fetch("http://localhost:8080/api/clinicAdmins/"+ this.state.id + "/profile", { method: "GET" }) //this.state.id
            .then(response => response.json())
            .then(json => {
                this.setState({
                    email: json.email,
                    firstName: json.firstName,
                    lastName: json.lastName,
                    address: json.address,
                    city: json.city,
                    state: json.state,
                    phoneNumber: json.phoneNumber,
                    birthday: json.birthday
                })
            })
    }

    ChangeProfile = () => {
        this.setState({show: !this.state.show}) 
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

                <div>
                    <button onClick={this.ChangeProfile}>change profile</button>
                </div>
                 
                {this.state.show && <ClinicAdminChangeProfile /> }
            </div>


         );
    }
}
 
export default ClinicAdminBlank;