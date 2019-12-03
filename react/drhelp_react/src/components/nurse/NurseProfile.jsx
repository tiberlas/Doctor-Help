import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {NurseContext} from '../../context/NurseContextProvider';

class NurseProfile extends Component {
    static contextType = NurseContext;

    render() { 
        return ( 
            <div>
                <div>
                <span>
                    <label>first name:</label>
                    <label>{this.context.nurse.firstName}</label>
                </span>
                </div>
                <div>
                <span>
                    <label>last name:</label>
                    <label>{this.context.nurse.lastName}</label>
                </span>
                </div>
                <div>
                <span>
                    <label>email:</label>
                    <label>{this.context.nurse.email}</label>
                </span>
                </div>
                <div>
                <span>
                    <label>address:</label>
                    <label>{this.context.nurse.address}</label>
                </span>
                </div>
                <div>
                <span>
                    <label>city:</label>
                    <label>{this.context.nurse.city}</label>
                </span>
                </div>
                <div>
                <span>
                    <label>state:</label>
                    <label>{this.context.nurse.state}</label>
                </span>
                </div>
                <div>
                <span>
                    <label>phoneNumber:</label>
                    <label>{this.context.nurse.phoneNumber}</label>
                </span>
                </div>
                <div>
                <span>
                    <label>birthday:</label>
                    <label>{this.context.nurse.birthday}</label>
                </span>
                </div>

                <div>
                    <NavLink to = '/nurse/profile/change'>
                        change profile
                    </NavLink>
                </div>
                <div>
                    <NavLink to = '/nurse/profile/change/password'>
                        change password
                    </NavLink>
                </div>
            </div>
         );
    }
}
 
export default NurseProfile;