import React, { Component } from 'react';
import {ClinicAdminContext} from '../../context/ClinicAdminContextProvider';
import MedicalStuffItem from './MedicalStuffItem';

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
        fetch("http://localhost:8080/api/clinics/id="+ this.context.admin.clinicId, { method: "GET" })
            .then(response => response.json())
            .then(json => {
                this.setState({
                    clinicName: json.name        
                })
            })
    }

    handleMedicalStuff = () => {
        fetch("http://localhost:8080/api/medical+stuff/clinic="+ this.context.admin.clinicId + "/all", { method: "GET" })
            .then(response => response.json())
            .then(json => {
                this.setState({
                    medicalStuff: json        
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