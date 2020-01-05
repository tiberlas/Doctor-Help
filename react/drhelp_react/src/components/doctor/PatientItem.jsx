import React, { Component, Fragment } from 'react';
import TableCell from '@material-ui/core/TableCell';

class PatientItem extends Component {

    render() { 
        return (
            <Fragment>
                <TableCell class='text-white'>{this.props.value.firstName}</TableCell>
                <TableCell class='text-white'>{this.props.value.lastName}</TableCell>
                <TableCell class='text-white'>{this.props.value.email}</TableCell>
                <TableCell class='text-white'>{this.props.value.insuranceNumber}</TableCell>
            </Fragment>
         );
    }
}
 
export default PatientItem;