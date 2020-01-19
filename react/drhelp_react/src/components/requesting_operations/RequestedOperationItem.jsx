import React, { Component, Fragment } from 'react';
import TableCell from '@material-ui/core/TableCell';
import {Link} from 'react-router-dom';

class RequestedOperationItem extends Component {
    state = {
        operationId: this.props.value.operationId,
        date: this.props.value.date,
        procedureName: this.props.value.procedureName,
        procedureId: this.props.value.procedureId,
        dr0: this.props.value.dr0,
        dr1: this.props.value.dr1,
        dr2: this.props.value.dr2,
        patient: this.props.value.patient
    }

    render() { 
        return (
            <Fragment>
                <TableCell class='text text-success'>
                    <Link to={`/request/operation/${this.state.operationId}`}>
                        {this.state.date}
                    </Link>
                </TableCell>
                <TableCell class='text text-white'>{this.state.procedureName}</TableCell>
                <TableCell class='text text-white'>{this.state.dr0}</TableCell>
                <TableCell class='text text-white'>{this.state.dr1}</TableCell>
                <TableCell class='text text-white'>{this.state.dr2}</TableCell>
                <TableCell class='text text-white'>{this.state.patient}</TableCell>
            </Fragment>
        );
    }
}
 
export default RequestedOperationItem;