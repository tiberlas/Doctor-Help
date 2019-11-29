import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {DoctorContext} from '../../context/DoctorContextProvider';

class DoctroProfile extends Component {
    static contextType = DoctorContext;

    render() { 
        return ( 
            <div>
                <div>
                <span>
                    <label>first name:</label>
                    <label>{this.context.doctor.firstName}</label>
                </span>
                </div>
                <div>
                <span>
                    <label>last name:</label>
                    <label>{this.context.doctor.lastName}</label>
                </span>
                </div>
                <div>
                <span>
                    <label>email:</label>
                    <label>{this.context.doctor.email}</label>
                </span>
                </div>
                <div>
                <span>
                    <label>address:</label>
                    <label>{this.context.doctor.address}</label>
                </span>
                </div>
                <div>
                <span>
                    <label>city:</label>
                    <label>{this.context.doctor.city}</label>
                </span>
                </div>
                <div>
                <span>
                    <label>state:</label>
                    <label>{this.context.doctor.state}</label>
                </span>
                </div>
                <div>
                <span>
                    <label>phoneNumber:</label>
                    <label>{this.context.doctor.phoneNumber}</label>
                </span>
                </div>
                <div>
                <span>
                    <label>birthday:</label>
                    <label>{this.context.doctor.birthday}</label>
                </span>
                </div>

                <div>
                    <NavLink to = '/doctor/profile/change'>
                        change profile
                    </NavLink>
                </div>
                <div>
                    <NavLink to = '/doctor/profile/change/password'>
                        change password
                    </NavLink>
                </div>
            </div>
         );
    }
}
 
export default DoctroProfile;