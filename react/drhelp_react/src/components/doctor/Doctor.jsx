import React, { Component } from 'react';
import DoctorHeader from './DoctorHeader.jsx'
import DoctorProfile from './DoctorProfile.jsx'

class Doctor extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <DoctorHeader />

                <DoctorProfile />
            </div>
         );
    }
}
 
export default Doctor;