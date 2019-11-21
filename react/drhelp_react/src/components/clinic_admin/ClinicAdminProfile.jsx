import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'
import {ClinicAdminContext} from '../../context/ClinicAdminContextProvider';


class ClinicAdminProfile extends Component {

    static contextType = ClinicAdminContext;

    render() { 
        return ( 
            
            <div>
                <div>
                <span>
                    <label>first name:</label>
                    <label>{this.context.admin.firstName}</label>
                </span>
                </div>
                <div>
                <span>
                    <label>last name:</label>
                    <label>{this.context.admin.lastName}</label>
                </span>
                </div>
                <div>
                <span>
                    <label>email:</label>
                    <label>{this.context.admin.email}</label>
                </span>
                </div>
                <div>
                <span>
                    <label>address:</label>
                    <label>{this.context.admin.address}</label>
                </span>
                </div>
                <div>
                <span>
                    <label>city:</label>
                    <label>{this.context.admin.city}</label>
                </span>
                </div>
                <div>
                <span>
                    <label>state:</label>
                    <label>{this.context.admin.state}</label>
                </span>
                </div>
                <div>
                <span>
                    <label>phoneNumber:</label>
                    <label>{this.context.admin.phoneNumber}</label>
                </span>
                </div>
                <div>
                <span>
                    <label>birthday:</label>
                    <label>{this.context.admin.birthday}</label>
                </span>
                </div>

                <div>
                    <NavLink to = '/clinic+administrator/profile/change'>
                        change profile
                    </NavLink>
                </div>
                <div>
                    <NavLink to = '/clinic+administrator/profile/change/password'>
                        change password
                    </NavLink>
                </div>
            </div>


         );
    }
}
 
export default ClinicAdminProfile;