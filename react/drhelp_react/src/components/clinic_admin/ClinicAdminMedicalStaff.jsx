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
            <div class='row d-flex justify-content-center'>
            <div class='col-md-8'>
                <br/>
                <br/>
                <h3>List of employees in {this.state.clinicName}</h3>
                <table class="table table-hover">
                    <tbody>
                        {this.state.medicalStuff.map(c => (
                                <MedicalStuffItem key={i++} value={c} />
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
         );
    }
}
 
export default ClinicAdminMedicalStaff;