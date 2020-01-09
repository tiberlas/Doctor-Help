import React, { Component } from 'react';
import axios from 'axios';
import MapContainer from './MapContainer.jsx';
import StarRatingComponent from 'react-star-rating-component';
import { Button } from '@material-ui/core';

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
            'height': '400px',
            'margin': 'auto'
        }; 
        return ( 
            <div class="row d-flex justify-content-center">
                <div class='col-md-10'>
                    <br/>
                    <br/>

                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">{this.state.name}</h4>
                            <h6 class="card-subtitle mb-2 text-muted">location for healing: {this.state.address}, {this.state.city}, {this.state.state}</h6>
                            <p class="card-text">{this.state.description}</p>
                            
                            <div style={divMapStyle}>
                                <MapContainer name={this.state.name} address={this.state.address}  city={this.state.city} state={this.state.state}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Clinic;
