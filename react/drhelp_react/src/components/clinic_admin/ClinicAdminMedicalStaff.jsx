import React, { Component } from 'react';
import {ClinicAdminContext} from '../../context/ClinicAdminContextProvider';
import MedicalStuffItem from './MedicalStuffItem';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from 'react-bootstrap/Button';

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
        let i = 0;
        return ( 
            <div class='row d-flex justify-content-center'>
            <div class='col-md-8'>
                <br/>
                <br/>
                <h3>List of employees in {this.state.clinicName}</h3>
                <Table class="table table-hover">
                    <TableHead class="table-active">
                        <TableRow class="table-active">
                            <TableCell class="text-success">first name</TableCell>
                            <TableCell class="text-success">last name</TableCell>
                            <TableCell class="text-success">role</TableCell>
                            <TableCell class="text-success"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.medicalStuff.map(c => (
                            <TableRow className={(++i)%2? `table-dark` : ``} >
                                <MedicalStuffItem key={i++} value={c} />
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            </div>
         );
    }
}
 
export default ClinicAdminMedicalStaff;