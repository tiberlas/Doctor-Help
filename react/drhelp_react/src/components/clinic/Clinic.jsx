import React, { Component } from 'react';
import axios from 'axios';
import MapContainer from './MapContainer.jsx';
import StarRatingComponent from 'react-star-rating-component';
import { Button } from 'reactstrap';
import { UserContext } from '../../context/UserContextProvider'
import Axios from 'axios';

class Clinic extends Component {

    static contextType = UserContext;

    state = { 
        name: "",
        address: "",
        city: "",
        state: "",
        description: "",
        haveInteracted : false, 
        myRating : 0, 
        rating : "/"
     }

     componentDidMount() {
        this.handleUpdate()
     }

     handleUpdate () {
        axios.get('http://localhost:8080/api/clinics/id='+this.props.clinicId)
        .then(response => {
            this.setState({
                name: response.data.name,
                address: response.data.address,
                city: response.data.city,
                state: response.data.state,
                description: response.data.description, 
                rating : response.data.rating
            });
        })
        if (this.context.user.role === "PATIENT") {
            Axios.get ("http://localhost:8080/api/clinics/review/" + this.context.user.id + "/" + window.location.href.split('/')[4])
            .then (response => {
                this.setState ({
                    haveInteracted : response.data.haveInteracted, 
                    myRating : response.data.myRating
                });
            })
        }
        let a = 0;
     }

     
    handleClick (nextValue) {
        this.setState ({
            myRating : nextValue
        }); 
        Axios.post ("http://localhost:8080/api/clinics/review/" + this.context.user.id + "/" + window.location.href.split('/')[4] + "/" + nextValue)
        .then (data => {
            this.handleUpdate();
        })
    }

    handleClear () {
        this.setState ({
            myRating : 0
        })
        Axios.post ("http://localhost:8080/api/clinics/review/" + this.context.user.id + "/" + window.location.href.split('/')[4] + "/" + 0)
        .then (data => {
            this.handleUpdate();
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
                            <p class="card-text">Average rating: {this.state.rating}</p>
                            
                            <div hidden={!this.state.haveInteracted}>
                                <StarRatingComponent starCount={5} value={this.state.myRating} value={this.state.myRating} onStarClick={this.handleClick.bind(this)}/>
                            </div>

                            <div hidden={!this.state.haveInteracted}>
                                <Button  onClick={() => this.handleClear()} disabled={false}>
                                    Clear rating
                                </Button>
                            </div>


                            <div style={divMapStyle}>
                                <MapContainer name={this.state.name} address={this.state.address}  city={this.state.city} state={this.state.state}/>
                            </div>

                            
                            {/* <div hidden={!this.state.haveInteracted}>
                            <div>
                                <StarRatingComponent starCount={5} value={this.state.myRating} value={this.state.myRating} onStarClick={this.handleClick.bind(this)}/>
                            </div>

                            {/* <div hidden={!this.state.haveInteracted}> */}
                            {/* <div>
                                <Button  onClick={() => this.handleClear.bind(this)} disabled={false}>
                                    Clear rating
                                </Button>
                            </div>
                            <a class="btn btn-primary" onClick={() => this.handleClick()} disabled={false}>
                                Klik
                            </a> */} 



                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Clinic;
