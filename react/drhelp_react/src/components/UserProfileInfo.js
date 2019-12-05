import React, { Component } from 'react';

class UserProfileInfo extends Component {

    render() { 
        return ( 
            <div>
                <div>
                <span>
                    <label>first name:</label>
                    <label>{this.props.user.firstName}</label>
                </span>
                </div>
                <div>
                <span>
                    <label>last name:</label>
                    <label>{this.props.user.lastName}</label>
                </span>
                </div>
                <div>
                <span>
                    <label>email:</label>
                    <label>{this.props.user.email}</label>
                </span>
                </div>
                <div>
                <span>
                    <label>address:</label>
                    <label>{this.props.user.address}</label>
                </span>
                </div>
                <div>
                <span>
                    <label>city:</label>
                    <label>{this.props.user.city}</label>
                </span>
                </div>
                <div>
                <span>
                    <label>state:</label>
                    <label>{this.props.user.state}</label>
                </span>
                </div>
                <div>
                <span>
                    <label>phoneNumber:</label>
                    <label>{this.props.user.phoneNumber}</label>
                </span>
                </div>
                <div>
                <span>
                    <label>birthday:</label>
                    <label>{this.props.user.birthday}</label>
                </span>
                </div>
            </div>


         );
    }
}
 
export default UserProfileInfo;