import React, { Component } from 'react';
import {ClinicAdminContext} from '../../context/ClinicAdminContextProvider';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class ClinicAdminChangePassword extends Component {
    static contextType = ClinicAdminContext

    state = {
        oldPassword: '',
        newPassword: '',
        newPassword1: '',
        go_profile: false,
        error: false,
        errorBack: false
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({errorBack: false, errorBack: false})

        if(this.state.newPassword !== this.state.newPassword1) {
            this.setState({error: true})
            return;
        }
        axios.put('http://localhost:8080/api/clinicAdmins/change/password', {
                    oldPassword: this.state.oldPassword,
                    newPassword: this.state.newPassword
        }).then((responce) => {
            this.setState({go_profile: true})
        }).catch((error)=> {
            this.setState({errorBack: true})
        });
    }

    handlerChange = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }

    render() {
        if(this.state.go_profile === true)
            return(<Redirect to='/clinic+administrator/'></Redirect> );
        
        return ( 
            <div>
                <form onSubmit={this.handleSubmit}>
                <div>
                    <p>Enter your old password: </p>
                    <input type='password'name='oldPassword' onChange={this.handlerChange} />
                </div>
                {this.state.errorBack && <div>
                    <h3>PASSWORD DID NOT MATCH</h3>
                </div>}
                <div>
                    <p>Enter your new password: </p>
                    <input type='password'name='newPassword' onChange={this.handlerChange} />
                </div>
                <div>
                    <p>Re-enter your new password: </p>
                    <input type='password'name='newPassword1' onChange={this.handlerChange} />
                </div>
                {this.state.error && <div>
                    <h3>PASSWORDS MUST MATCH</h3>
                </div>}
                <div>
                    <input type='submit' value='submit'/>
                </div>
                </form>
            </div>
         );
    }
}
 
export default ClinicAdminChangePassword;

