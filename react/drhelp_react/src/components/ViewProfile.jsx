import React, { Component } from 'react';

class ViewProfile extends Component {

    render() { 
        return ( 
                <div class="row d-flex justify-content-center">
                <div class='col-md-7'>
                <div >
                    <br/>
                    <br/>
                    <h1 >{this.props.profile.firstName}&nbsp;{this.props.profile.lastName}</h1>
                </div>
                
                <div >
                    <label class="badge badge-success text-right">email:</label>&nbsp;&nbsp;&nbsp;
                    <label>{this.props.profile.email}</label>
                </div>
               
                <div>
                    <label class="badge badge-success text-right">address:</label>&nbsp;&nbsp;&nbsp;
                    <label>{this.props.profile.address}</label>
                </div>
               
                <div >
                    <label class="badge badge-success text-right">city:</label>&nbsp;&nbsp;&nbsp;
                    <label>{this.props.profile.city}</label>
                </div>
                
                <div >
                    <label class="badge badge-success text-right">state:</label>&nbsp;&nbsp;&nbsp;
                    <label>{this.props.profile.state}</label>
                </div>
                
                <div >
                    <label class="badge badge-success text-right">phoneNumber:</label>&nbsp;&nbsp;&nbsp;
                    <label>{this.props.profile.phoneNumber}</label>
                </div>
                
                <div >
                    <label class="badge badge-success text-right">birthday:</label>&nbsp;&nbsp;&nbsp;
                    <label>{this.props.profile.birthday}</label>
                </div>
                </div>
                
            </div>
         );
    }
}
 
export default ViewProfile;