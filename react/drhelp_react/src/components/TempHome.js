
import React from 'react'
import Footer from './footer.jsx';
import ClinicAdministrator from './clinic_admin/ClinicAdministrator';
import {UserContext} from '../context/UserContextProvider'
import CenterAdministrator from './centre_admin/CentreAdministrator.js';
import Doctor from './doctor/Doctor.jsx'

class TempHome extends React.Component {

    static contextType = UserContext

    render() {
        if(this.props.role === 'centreAdmin')
            return(
                <CenterAdministrator />)
        else if(this.props.role === 'clinicAdmin')
            return(<ClinicAdministrator />)
        else if(this.props.role === 'doctor')
            return(<Doctor />)
        else
            return(
                <div><h1>THIS SHOULD NOT BE SHOWN</h1></div>
            )

        return( <Footer />)
    };
}



export default TempHome