import React, { Component, Fragment } from 'react';
import TableCell from '@material-ui/core/TableCell';
import {Link} from 'react-router-dom';

class RequestedAppointmentItem extends Component {
    state = {  
        id: this.props.value.id,
        date: this.props.value.date,
        procedure: this.props.value.type,
        doctor: this.props.value.doctor,
        nurse: this.props.value.nurse,
        patient: this.props.value.patient
    }

    render() { 
        return (
            <Fragment>
                <TableCell class='text text-success'>
                    <Link to={`/request/appointment/${this.state.id}`}>
                        {this.state.date}
                    </Link>
                </TableCell>
                <TableCell class='text text-white'>{this.state.procedure}</TableCell>
                <TableCell class='text text-white'>{this.state.doctor}</TableCell>
                <TableCell class='text text-white'>{this.state.nurse}</TableCell>
                <TableCell class='text text-white'>{this.state.patient}</TableCell>
            </Fragment>
        );
    }
}
 
export default RequestedAppointmentItem;