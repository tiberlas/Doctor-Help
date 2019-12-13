import React, { Component } from 'react';
import Clinic from '../clinic/Clinic.jsx'

class ViewClinic extends Component {

    render() { 
        let id = window.location.href.split('clinic/')[1]
        return ( 
            <Clinic clinicId={id}/> 
         );
    }
}
 
export default ViewClinic;