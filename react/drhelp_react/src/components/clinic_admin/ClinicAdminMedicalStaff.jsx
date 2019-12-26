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
        clinicName: '',
        filterString: '',
        isFilterRoleActive: false,
        checkedMedicalStaff: 'NURSES',
        filterRoleEnum: 'DISABLED'
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

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleUpdate = (key, role) => {
        const items = this.state.medicalStuff.filter(item => (item.id !== key || item.role !== role));
        this.setState({ medicalStuff: items});
    }

    handleFilterRole = () => {
        if(this.state.isFilterRoleActive === true) {
            this.setState({filterRoleEnum: this.state.checkedMedicalStaff})
        } else {
            this.setState({filterRoleEnum: 'DISABLED'})
        }
    }

    handleActivateFilter = () => {
        this.setState({isFilterRoleActive: !this.state.isFilterRoleActive},
            () => {
                this.handleFilterRole()
            })
    }

    handleOptionChange = (changeEvent) => {
        this.setState({
          checkedMedicalStaff: changeEvent.target.value
        }, () => {
            this.handleFilterRole()
        });
    }

    handleFilter = () => {
        axios.post('http://localhost:8080/api/medical+stuff/filter', 
            {
                string: this.state.filterString,
                role: this.state.filterRoleEnum
            }).then(response => {
                this.setState({medicalStuff: response.data});
            }).catch(error => {
                console.log('error in filter of procedure types')
            })
    }

    render() { 
        let i = 0;
        return ( 
            <div class='row d-flex justify-content-center'>
            <div class='col-md-8'>
                <h3>List of employees in {this.state.clinicName}</h3>
                <br/>
                <br/>
                <Table class="table table-hover">
                    <TableHead class="table-active">
                        <TableRow class="table-active">
                            <TableCell>
                                <span class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" id="filterRole" onChange={this.handleActivateFilter} checked={this.state.isFilterRoleActive}/>
                                    <label class="custom-control-label text-white" for="filterRole">filter by role:</label>
                                </span>
                            </TableCell>
                            <TableCell>
                                <div class="custom-control custom-radio">
                                    <input type="radio" id="customRadio1" name="customRadio" class="custom-control-input" value="NURSES" checked={this.state.checkedMedicalStaff === 'NURSES'} onChange={this.handleOptionChange} disabled={!this.state.isFilterRoleActive} />
                                    <label className={`custom-control-label ${this.state.isFilterRoleActive? 'text-white': 'text-muted'} `} for="customRadio1">nurses</label>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div class="custom-control custom-radio">
                                    <input type="radio" id="customRadio2" name="customRadio" class="custom-control-input" value="DOCTORS" checked={this.state.checkedMedicalStaff === 'DOCTORS'} onChange={this.handleOptionChange} disabled={!this.state.isFilterRoleActive}/>
                                    <label className={`custom-control-label ${this.state.isFilterRoleActive? 'text-white': 'text-muted'} `} for="customRadio2">doctors</label>
                                </div>
                            </TableCell>
                            <TableCell>
                                <input type = "text" placeholder="Filter..." name = "filterString" onChange = {this.handleChange}/>
                            </TableCell>
                            <TableCell>
                                <Button class="btn btn-success" onClick = {this.handleFilter}>Search</Button> 
                            </TableCell>
                        </TableRow>
                        <TableRow class="table-active">
                            <TableCell class="text-success">first name</TableCell>
                            <TableCell class="text-success">last name</TableCell>
                            <TableCell class="text-success">email</TableCell>
                            <TableCell class="text-success">role</TableCell>
                            <TableCell class="text-success"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.medicalStuff.map(c => (
                            <TableRow className={(++i)%2? `table-dark` : ``} >
                                <MedicalStuffItem key={i} value={c} handleUpdate={this.handleUpdate}/>
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