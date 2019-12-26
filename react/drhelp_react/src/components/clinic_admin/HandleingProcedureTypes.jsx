import React, { Component } from 'react';
import ProcedureTypeItem from '../procedureType/ProcedureTypeItem';
import {ClinicAdminContext} from '../../context/ClinicAdminContextProvider';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from 'react-bootstrap/Button';
import Checkbox from '@material-ui/core/Checkbox';

class HandleingProcedureTypes extends Component {
    state = {
        procedures: [],
        name: '',
        refresh: false,
        filterString: '',
        isFilterOperationActive: false,
        checkFilter: "NOT_OPERATION",
        filterOperationDTO: 'NOT_DEFINED'
    }

    static contextType = ClinicAdminContext

    componentDidMount() {
        axios.get('http://localhost:8080/api/procedure+types/all')
        .then(response => {
            this.setState({
                procedures: response.data,
                refresh: false
            })
        })

        axios.get('http://localhost:8080/api/clinics/id='+this.context.admin.clinicId)
        .then(response => {
            this.setState({
                name: response.data.name
            })
        })
    }

    handleUpdate = (key) => {
        const items = this.state.procedures.filter(item => item.id !== key);
        this.setState({ procedures: items, refresh: true });
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleFilterRole = () => {
        if(this.state.isFilterOperationActive === true) {
            this.setState({filterOperationDTO: this.state.checkFilter})
        } else {
            this.setState({filterOperationDTO: 'NOT_DEFINED'})
        }
    }

    handleActivateFilter = () => {
        this.setState({isFilterOperationActive: !this.state.isFilterOperationActive},
            () => {
                this.handleFilterRole()
            })
    }

    handleOptionChange = (changeEvent) => {
        this.setState({
            checkFilter: changeEvent.target.value
        }, () => {
            this.handleFilterRole()
        });
    }

    handleFilter = () => {
        axios.post('http://localhost:8080/api/procedure+types/filter', 
            {
                string: this.state.filterString,
                operation: this.state.filterOperationDTO
            }).then(response => {
                this.setState({procedures: response.data});
            }).catch(error => {
                console.log('error in filter of procedure types')
            })
        
    }
    
    render() {
        let i = 0;
        return ( 
            <div class='row d-flex justify-content-center'>
            <div class='col-md-7'> 
                <h2>Clinic {this.state.name}</h2>
                <br/>
                <Table class="table table-hover ">
                    <TableHead class="table-active">
                    <TableRow class="table-active">
                            <TableCell colSpan='2'>
                                <span class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" id="filterRole" onChange={this.handleActivateFilter} checked={this.state.isFilterOperationActive}/>
                                    <label class="custom-control-label text-white" for="filterRole">filter by examination:</label>
                                </span>
                            </TableCell>
                            <TableCell>
                                <div class="custom-control custom-radio">
                                    <input type="radio" id="customRadio1" name="customRadio" class="custom-control-input" value="NOT_OPERATION" checked={this.state.checkFilter === 'NOT_OPERATION'} onChange={this.handleOptionChange} disabled={!this.state.isFilterOperationActive} />
                                    <label className={`custom-control-label ${this.state.isFilterOperationActive? 'text-white': 'text-muted'} `} for="customRadio1">appointment</label>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div class="custom-control custom-radio">
                                    <input type="radio" id="customRadio2" name="customRadio" class="custom-control-input" value="OPERATION" checked={this.state.checkFilter === 'OPERATION'} onChange={this.handleOptionChange} disabled={!this.state.isFilterOperationActive}/>
                                    <label className={`custom-control-label ${this.state.isFilterOperationActive? 'text-white': 'text-muted'} `} for="customRadio2">operation</label>
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
                            <TableCell class="text-success">name</TableCell>
                            <TableCell class="text-success">duration</TableCell>
                            <TableCell class="text-success">is operation</TableCell>
                            <TableCell class="text-success">price</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.procedures.map (c => (
                            <TableRow className={(++i)%2? `table-dark` : ``} >
                                <ProcedureTypeItem key={c.id} id={c.id} value={c} handleUpdate={this.handleUpdate} />
                            </TableRow>
                        )) }    
                    </TableBody>
                </Table>
            </div>
            </div>
         );
    }
}
 
export default HandleingProcedureTypes;