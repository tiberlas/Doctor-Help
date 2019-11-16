import React from 'react';
import { UserContext } from '../context/UserContextProvider';
import CentreAdminHeader from './centre_admin/CentreAdminHeader';
import ClinicAdminHeader from './clinic_admin/ClinicAdminHeader';

class Header extends React.Component {
    static contextType = UserContext
    render() {
        console.log("context is " + this.context.user.role)
        
        if(this.context.user.role === 'centreAdmin')
            return(<CentreAdminHeader id={this.context.user.id}></CentreAdminHeader>);
        else if(this.context.user.role === 'clinicAdmin')
            return(<ClinicAdminHeader id={this.context.user.id}></ClinicAdminHeader>)
        else
            return(
                <div><h1>THIS SHOULD NOT BE SHOWN</h1></div>
            )
    };

} export default Header