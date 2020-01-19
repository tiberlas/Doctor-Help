import React, { Component } from 'react';
import {ClinicAdminContext} from '../../context/ClinicAdminContextProvider';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import RequestedOperationItem from '../requesting_operations/RequestedOperationItem.jsx';

class ClinicAdminOperationRequest extends Component {
    state = {  
        name: '',
        operations: []
    }

    static contextType = ClinicAdminContext;

    componentDidMount() {
        this.getAllOperations();
        this.handleClinicName();
    }

    getAllOperations = () => {
        axios.get('http://localhost:8080/api/operations/requested/all')
        .then(response => {
            this.setState({
                operations: response.data
            })
        })
    }

    handleClinicName = () => {
        axios.get('http://localhost:8080/api/clinics/id='+this.context.admin.clinicId)
        .then(response => {
            this.setState({
                name: response.data.name
            })
        })
    }

    handleUpdate = () => {

    }

    render() { 
        let i=0;
        return ( 
            <div class='row d-flex justify-content-center'>
            <div class='col-md-7'> 
                <br/>
                <h3>Clinic {this.state.name}</h3>
                <h4>List of requested operations</h4>
                <br/>
                <Table class="table table-hover ">
                    <TableHead class="table-active">
                        <TableRow class="table-active">
                            <TableCell class="text-success cursor-pointer" >date and time</TableCell>
                            <TableCell class="text-success cursor-pointer" >procedure</TableCell>
                            <TableCell class="text-success cursor-pointer" >first doctor</TableCell>
                            <TableCell class="text-success cursor-pointer" >second doctor</TableCell>
                            <TableCell class="text-success cursor-pointer" >third doctor</TableCell>
                            <TableCell class="text-success cursor-pointer" >patient</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.operations.map (c => (
                            <TableRow className={(++i)%2? `table-dark` : ``} >
                                <RequestedOperationItem key={c.id} id={c.id} value={c} handleUpdate={this.handleUpdate} />
                            </TableRow>
                        ))  }

                    </TableBody>
                </Table>
            </div>
            </div>
        );
    }
}
 
export default ClinicAdminOperationRequest;