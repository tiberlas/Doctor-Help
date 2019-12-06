import React, { Component } from 'react';
import {ClinicAdminContext} from '../../context/ClinicAdminContextProvider';
import MedicalStuffItem from './MedicalStuffItem';
import axios from 'axios';

class ClinicAdminMedicalStaff extends Component {
    static contextType = ClinicAdminContext

    state = { 
        medicalStuff: [],
        clinicName: ''
    }
    
    componentDidMount() {
        this.handleMedicalStuff();  
        this.handleCLinicName();  
    }

    handleCLinicName = () => {
        axios.get("http://localhost:8080/api/clinics/id="+ this.context.admin.clinicId)
            .then(response => {
                this.setState({
                    clinicName: response.data.name        
                })
            })
    }

    handleMedicalStuff = () => {
        axios.get("http://localhost:8080/api/medical+stuff/clinic="+ this.context.admin.clinicId + "/all")
            .then(response => {
                this.setState({
                    medicalStuff: response.data        
                })
            })
    }

    render() { 
        var i = 0;
        return ( 
            <div>
                <h3>list of emploies in {this.state.clinicName}</h3>
                <ol>
                    {this.state.medicalStuff.map(c => (
                        <li>
                            <MedicalStuffItem key={i++} value={c} />
                        </li>
                    ))}
                </ol>
                
            </div>
         );
    }
}
 
export default ClinicAdminMedicalStaff;