import React, { Component, Fragment } from 'react';

class ViewProfile extends Component {

    render() { 
        return ( 
                <Fragment>
                <div >

                    <h1 >{this.props.profile.firstName}&nbsp;{this.props.profile.lastName}</h1>

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
                </Fragment>
         );
    }
}
 
export default ViewProfile;