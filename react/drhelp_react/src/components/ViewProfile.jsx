import React, { Component } from 'react';

class ViewProfile extends Component {

    render() { 
        return ( 
                <div class="row d-flex justify-content-center">
                <div class='col-md-3'>
                <div >
                    <label class="badge badge-success text-right">First Name:</label>&nbsp;&nbsp;&nbsp;
                    <label >{this.props.profile.firstName}</label>
                </div>
                
                <div>
                    <label class="badge badge-success text-right">Last Name:</label>&nbsp;&nbsp;&nbsp;
                    <label>{this.props.profile.lastName}</label>
                </div>
                
                <div >
                    <label class="badge badge-success text-right">Email:</label>&nbsp;&nbsp;&nbsp;
                    <label>{this.props.profile.email}</label>
                </div>
               
                <div>
                    <label class="badge badge-success text-right">Address:</label>&nbsp;&nbsp;&nbsp;
                    <label>{this.props.profile.address}</label>
                </div>
               
                <div >
                    <label class="badge badge-success text-right">City:</label>&nbsp;&nbsp;&nbsp;
                    <label>{this.props.profile.city}</label>
                </div>
                
                <div >
                    <label class="badge badge-success text-right">State:</label>&nbsp;&nbsp;&nbsp;
                    <label>{this.props.profile.state}</label>
                </div>
                
                <div >
                    <label class="badge badge-success text-right">Phone Number:</label>&nbsp;&nbsp;&nbsp;
                    <label>{this.props.profile.phoneNumber}</label>
                </div>
                
                <div >
                    <label class="badge badge-success text-right">Birthday:</label>&nbsp;&nbsp;&nbsp;
                    <label>{this.props.profile.birthday}</label>
                </div>
                </div>
                
            </div>
         );
    }
}
 
export default ViewProfile;