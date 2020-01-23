import React, { Component } from 'react';
import RoomList from '../requesting_appointment/RoomList.jsx';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class requestedOperation extends Component {
    state = {
        operationId: '',
        date: '',
        procedureName: '',
        procedureId: '',
        procedureDuration: '',
        dr0: '',
        dr1: '',
        dr2: '',
        patient: ''
    }

    componentDidMount() {
        let path_parts = window.location.pathname.split('operation/')
        axios.get('http://localhost:8080/api/operations/requests/id=' + path_parts[1])
            .then(responce => {
                this.setState({
                    operationId: responce.data.operationId,
                    date: responce.data.date,
                    procedureName: responce.data.procedureName,
                    procedureId: responce.data.procedureId,
                    procedureDuration: responce.data.procedureDuration,
                    dr0: responce.data.dr0,
                    dr1: responce.data.dr1,
                    dr2: responce.data.dr2,
                    patient: responce.data.patient
                })
            })
    }

    render() {
        return (
            <div>
                <div class='row d-flex justify-content-center'>
                <div class='col-md-7'> 
                <Table class="table table-hover ">
                    <TableHead class="table-active">
                        <TableRow class="table-active">
                            <TableCell colSpan='6' class='text text-success text-center' align='center'>Requested operations</TableCell>
                        </TableRow>
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
                        <TableCell class="text-white" >{this.state.date}</TableCell>
                        <TableCell class='text text-white'>{this.state.procedureName}&nbsp;{this.state.procedureDuration}&nbsp;H</TableCell>
                        <TableCell class='text text-white'>{this.state.dr0}</TableCell>
                        <TableCell class='text text-white'>{this.state.dr1}</TableCell>
                        <TableCell class='text text-white'>{this.state.dr2}</TableCell>
                        <TableCell class='text text-white'>{this.state.patient}</TableCell>
                    </TableBody>
                </Table>
            </div>
            </div>

                <RoomList operation={true} operationId={this.state.operationId} date={this.state.date} type={this.state.procedureId}/>

            </div>
        );
    }
}
 
export default requestedOperation;