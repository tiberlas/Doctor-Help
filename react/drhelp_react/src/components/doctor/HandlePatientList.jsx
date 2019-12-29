import React, { Component } from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PatientItem from './PatientItem';

class HandlePatientList extends Component {
    state = { 
        patients: []
    }

    componentDidMount () {
		axios.get ('http://localhost:8080/api/patients/all')
		.then (response => {
			this.setState ({
				patients: response.data
			})
        })
        
    }

    render() {
        const sortTypes = {
            up: {
                class: 'sort-up',
                fn: (a, b) => a.firstName - b.firstName
            },
            down: {
                class: 'sort-down',
                fn: (a, b) => b.firstName - a.firstName
            },
            default: {
                class: 'sort',
                fn: (a, b) => a
            }
        };


        let i = 0; 
        return (
            <div class='row d-flex justify-content-center'>
            <div class='col-md-7'>

                <br/>
                <br/>
                <Table class="table table-hover ">
                    <TableHead class="table-active">
                        <TableRow class="table-active">
                            <TableCell class='text-success'>first name</TableCell>
                            <TableCell class='text-success'>last name</TableCell>
                            <TableCell class='text-success'>email</TableCell>
                            <TableCell class='text-success'>insurance number</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.patients.map(patient => (
                            <TableRow className={(++i)%2? `table-dark`: ``}>
                                <PatientItem key={patient.id} id={patient.id} value={patient} />
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div>
            </div>
         );
    }
}
 
export default HandlePatientList;
