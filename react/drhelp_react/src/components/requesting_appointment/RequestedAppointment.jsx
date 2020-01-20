import React, { Component } from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import RoomList from './RoomList';

class RequestedAppointment extends Component {
    state = {  
        id: '',
        date: '',
        procedure: '',
        typeId: 0,
        doctor: '',
        nurse: '',
        patient: ''
    }

    componentDidMount() {
        let path_parts = window.location.pathname.split('appointment/')
        axios.get('http://localhost:8080/api/appointments/requests/id=' + path_parts[1])
            .then(responce => {
                this.setState({
                    id: responce.data.id,
                    date: responce.data.date,
                    procedure: responce.data.type,
                    doctor: responce.data.doctor,
                    nurse: responce.data.nurse,
                    patient: responce.data.patient,
                    typeId: responce.data.typeId
                })
            })
    }

    render() {
        return (
            <div>
            <div class='row d-flex justify-content-center'>
            <div class='col-md-7'> 
                <br/>
                <Table class="table table-hover ">
                    <TableHead class="table-active">
                        <TableRow class="table-active">
                            <TableCell colSpan='5' class='text text-success text-center' align='center'>Requested appointment</TableCell>
                        </TableRow>
                        <TableRow class="table-active">
                            <TableCell class="text-success cursor-pointer" >date and time</TableCell>
                            <TableCell class="text-success cursor-pointer" >procedure</TableCell>
                            <TableCell class="text-success cursor-pointer" >doctor</TableCell>
                            <TableCell class="text-success cursor-pointer" >nurse</TableCell>
                            <TableCell class="text-success cursor-pointer" >patient</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableCell class='text text-white'>{this.state.date}</TableCell>
                        <TableCell class='text text-white'>{this.state.procedure}</TableCell>
                        <TableCell class='text text-white'>{this.state.doctor}</TableCell>
                        <TableCell class='text text-white'>{this.state.nurse}</TableCell>
                        <TableCell class='text text-white'>{this.state.patient}</TableCell>
                    </TableBody>
                </Table>
            </div>
            </div>

                <RoomList date={this.state.date} type={this.state.typeId}></RoomList>

            </div>
        );
    }
}
 
export default RequestedAppointment;