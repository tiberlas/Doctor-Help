import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'
import UserProfileInfo from '../UserProfileInfo';
import {CentreAdminContext} from '../../context/CentreAdminContextProvider';

class CentreAdminProfile extends Component {

    static contextType = CentreAdminContext

    render() { 
        return ( 
        <div>
            <UserProfileInfo user = {this.context.admin}/>
                <div>
                    <NavLink to = '/centreAdministrator/profile/change'>
                        change profile
                    </NavLink>
                </div>
                <div>
                    <NavLink to = '/centreAdministrator/profile/change/password'>
                        change password
                    </NavLink>
                </div>
            </div>


         );
    }
}
 
export default CentreAdminProfile;