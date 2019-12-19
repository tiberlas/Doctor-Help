import React, { Component } from 'react';
import {ClinicAdminContext} from '../../context/ClinicAdminContextProvider';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PredefinedAppointmentItem from '../predefined_appointments/PredefinedAppointmentItem';

class HandleingPredefinedAppointments extends Component {
    state = {
        predefined: [],
        name: ''
    }

    static contextType = ClinicAdminContext

    componentDidMount() {
        axios.get('http://localhost:8080/api/predefined+appointments/clinic='+this.context.admin.clinicId+'/all')
        .then(response => {
            this.setState({
                predefined: response.data
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
        const items = this.state.predefined.filter(item => item.id !== key);
        this.setState({ predefined: items});
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
                            <TableCell class="text-success">procedure</TableCell>
                            <TableCell class="text-success">doctor</TableCell>
                            <TableCell class="text-success">room</TableCell>
                            <TableCell class="text-success">date and timer</TableCell>
                            <TableCell class="text-success">price with disscount</TableCell>
                            <TableCell class="text-success">disscount</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.predefined.map (c => (
                            <TableRow className={(++i)%2? `table-dark` : ``} >
                                <PredefinedAppointmentItem key={c.id} id={c.id} value={c} handleUpdate={this.handleUpdate} />
                            </TableRow>
                        ))  }

                    </TableBody>
                </Table>
            </div>
            </div>
         );
    }
}
 
export default HandleingPredefinedAppointments;