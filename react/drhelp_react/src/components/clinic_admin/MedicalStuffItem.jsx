import React, { Component, Fragment } from 'react';
import TableCell from '@material-ui/core/TableCell';
import Button from 'react-bootstrap/Button';

class MedicalStuffItem extends Component {
    render() { 
        return ( 
            <Fragment>
                <TableCell class="text-white">{this.props.value.firstName}</TableCell>
                <TableCell class="text-white">{this.props.value.lastName}</TableCell>
                <TableCell class="text-white">{this.props.value.role}</TableCell>
                <TableCell>
                    <Button variant="danger">
                        delete
                    </Button>
                </TableCell>
            </Fragment>
         );
    }
}
 
export default MedicalStuffItem;