import React, { Component, Fragment } from 'react';
import TableCell from '@material-ui/core/TableCell';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

class MedicalStuffItem extends Component {
    
    onDelite = () => {
        let url = ''
        if(this.props.value.role === 'DOCTOR') {
            url = "http://localhost:8080/api/doctors/delete/id="+this.props.value.id
        } else {
            url = "http://localhost:8080/api/nurses/delete/id="+this.props.value.id
        }

        axios.delete(url)
        .then(response => {
            this.props.handleUpdate(this.props.value.id, this.props.value.role);
        }).catch(error => {
            this.setState({
                messageShow: true,
                message: 'Could not delete a medical staff. Please reload the page and try again!',
                title: 'Some error has occured'
            })
        })
    };
    
    render() { 
        return ( 
            <Fragment>
                <TableCell class="text-white">{this.props.value.firstName}</TableCell>
                <TableCell class="text-white">{this.props.value.lastName}</TableCell>
                <TableCell class="text-white">{this.props.value.email}</TableCell>
                <TableCell class="text-white">{this.props.value.role}</TableCell>
                <TableCell>
                    <Button variant="danger" onClick={this.onDelite}>
                        delete
                    </Button>
                </TableCell>
            </Fragment>
         );
    }
}
 
export default MedicalStuffItem;