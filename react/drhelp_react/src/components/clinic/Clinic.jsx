import React, { Component } from 'react';
import axios from 'axios';

class Clinic extends Component {
    state = { 
        name: "",
        address: "",
        description: ""
     }

     componentDidMount() {
         this.handelUpdate()
     }

     handelUpdate = () => {
        axios.get('http://localhost:8080/api/clinics/id='+this.props.clinicId)
        .then(response => {
            this.setState({
                name: response.data.name,
                address: response.data.address,
                description: response.data.description
            })
        })
     }

    render() { 
        return ( 
            <div>
                <h1>{this.state.name}</h1>
                <h3>location for healing: {this.state.address}</h3>
                <p>{this.state.description}</p>
            </div>
         );
    }
}
 
export default Clinic;
