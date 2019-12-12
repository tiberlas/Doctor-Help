import React, { Component } from 'react';
import axios from 'axios';
import MapContainer from './MapContainer.jsx';

class Clinic extends Component {
    state = { 
        name: "",
        address: "",
        city: "",
        state: "",
        description: "",
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
                city: response.data.city,
                state: response.data.state,
                description: response.data.description
            })
        })
     }

    render() {
        const divMapStyle = {
            'background-color': 'black',
            'height': '400px'
        }; 
        return ( 
            <div>
                <div>
                    <h1>{this.state.name}</h1>
                    <h3>location for healing: {this.state.address}, {this.state.city}, {this.state.state}</h3>
                </div>
                <div style={divMapStyle}>
                    <MapContainer name={this.state.name} address={this.state.address}  city={this.state.city} state={this.state.state}/>
                </div>
                <div>
                    <p>{this.state.description}</p>
                </div>
            </div>
         );
    }
}
 
export default Clinic;
