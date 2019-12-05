
import React from 'react'
import Footer from './footer.jsx';
import ClinicAdministrator from './clinic_admin/ClinicAdministrator';
import {UserContext} from '../context/UserContextProvider'
import CenterAdministrator from './centre_admin/CentreAdministrator.js';
import Doctor from './doctor/Doctor.jsx'
import Patient from './patient/Patient'
import LoginPage from '../LoginPage.js';
import Nurse from './nurse/Nurse.jsx';
import Header from './Header.jsx';


class TempHome extends React.Component {

    static contextType = UserContext

    render() {
        return(
            <div>
                <Header />

                {this.props.role === 'CENTER_ADMINISTRATOR' && <CenterAdministrator />}
                {this.props.role === 'clinicAdmin' && <ClinicAdministrator />}
                {this.props.role === 'DOCTOR' && <Doctor />}

               <Footer />
            </div>

        )


        // if(this.props.role === 'centreAdmin')
        //     return(
        //         <CenterAdministrator />)
        // else if(this.props.role === 'clinicAdmin')
        //     return(<ClinicAdministrator />)
        // else if(this.props.role === 'doctor')
        //     return(<Doctor />)
        // else if(this.props.role === 'patient')
        //     return(<Patient />)
        // else if(this.props.role === 'nurse')
        //     return(<Nurse />)
        // else
        //     return(
        //         <div><LoginPage /></div>
        //     )

    };
}

export default TempHome