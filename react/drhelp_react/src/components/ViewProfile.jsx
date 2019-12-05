import React, { Component } from 'react';

class ViewProfile extends Component {

    render() { 
        return ( 
            <div>
                <div>
                <span>
                    <label>first name:</label>
                    <label>{this.props.profile.firstName}</label>
                </span>
                </div>
                <div>
                <span>
                    <label>last name:</label>
                    <label>{this.props.profile.lastName}</label>
                </span>
                </div>
                <div>
                <span>
                    <label>email:</label>
                    <label>{this.props.profile.email}</label>
                </span>
                </div>
                <div>
                <span>
                    <label>address:</label>
                    <label>{this.props.profile.address}</label>
                </span>
                </div>
                <div>
                <span>
                    <label>city:</label>
                    <label>{this.props.profile.city}</label>
                </span>
                </div>
                <div>
                <span>
                    <label>state:</label>
                    <label>{this.props.profile.state}</label>
                </span>
                </div>
                <div>
                <span>
                    <label>phoneNumber:</label>
                    <label>{this.props.profile.phoneNumber}</label>
                </span>
                </div>
                <div>
                <span>
                    <label>birthday:</label>
                    <label>{this.props.profile.birthday}</label>
                </span>
                </div>
            </div>
         );
    }
}
 
export default ViewProfile;