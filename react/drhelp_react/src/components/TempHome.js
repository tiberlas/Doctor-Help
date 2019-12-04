
import React from 'react'
import Footer from './footer.jsx';
import ClinicAdministrator from './clinic_admin/ClinicAdministrator';
import {UserContext} from '../context/UserContextProvider'
import CenterAdministrator from './centre_admin/CentreAdministrator.js';
import Doctor from './doctor/Doctor.jsx'
import Patient from './patient/Patient'
import LoginPage from '../LoginPage.js';


class TempHome extends React.Component {

    static contextType = UserContext

    handleLogout () {
        
    }

    render() {
        if(this.props.role === 'centreAdmin')
            return(
                <CenterAdministrator />)
        else if(this.props.role === 'clinicAdmin')
            return(<ClinicAdministrator />)
        else if(this.props.role === 'doctor')
            return(<Doctor />)
        else if(this.props.role === 'patient')
            return(<Patient logout={() => this.props.logout ()}/>)
        else
            return(
                <div><LoginPage /></div>
            )

        return( <Footer />)
    };
}



export default TempHome