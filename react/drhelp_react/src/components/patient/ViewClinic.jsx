import React, { Component } from 'react';
import Clinic from '../clinic/Clinic.jsx'
import StarRatingComponent from 'react-star-rating-component';
import { Button } from '@material-ui/core';
import Axios from 'axios';
import { UserContext } from '../../context/UserContextProvider'

class ViewClinic extends Component {

    state = {
        rating : "/", 
        myRating : 0, 
        haveInteracted : true
    }

    static contextType = UserContext;

    handleClick (nextValue) {
        // alert ("Star click: " + nextValue);
        this.setState ({
            myRating : nextValue
        }); 
        Axios.post ("http://localhost:8080/api/clinics/review/" + this.context.user.id + "/" + window.location.href.split('/')[4] + "/" + nextValue)
    }

    handleClear () {
        this.setState ({
            myRating : 0
        })
        Axios.post ("http://localhost:8080/api/clinics/review/" + this.context.user.id + "/" + window.location.href.split('/')[4] + "/" + 0)
    }

    render() { 
        let id = window.location.href.split('/')[4]
        return ( 
            <div>
                <Clinic clinicId={id}/> 
                <div hidden={!this.state.haveInteracted}>
                    <StarRatingComponent starCount={5} value={this.state.myRating} value={this.state.myRating} onStarClick={this.handleClick.bind(this)}/>
                </div>
                <div hidden={!this.state.haveInteracted}>
                    <Button class="badge-success text-right" onClick={() => this.handleClear()}>
                        Clear rating
                    </Button>
                </div>
            </div>
         );
    }
}
 
export default ViewClinic;