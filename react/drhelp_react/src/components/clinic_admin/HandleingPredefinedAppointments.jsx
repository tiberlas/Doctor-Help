import React, { Component } from 'react';
import {ClinicAdminContext} from '../../context/ClinicAdminContextProvider';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PredefinedAppointmentItem from '../predefined_appointments/PredefinedAppointmentItem';

const sortTypes = {
    date_up: {
        fn: (a, b) => b.dateAndTime.localeCompare(a.dateAndTime)
    },
    date_down: {
        fn: (a, b) => a.dateAndTime.localeCompare(b.dateAndTime)
    },
    price_up: {
        fn: (a, b) => a.price - b.price
    },
    price_down: {
        fn: (a, b) => b.price - a.price
    },
    diss_up: {
        fn: (a, b) => a.disscount - b.disscount
    },
    diss_down: {
        fn: (a, b) => b.disscount - a.disscount
    },
    default: {
        fn: (a, b) => a
    }
}

class HandleingPredefinedAppointments extends Component {
    state = {
        predefined: [],
        currentSort: 'default',
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

    onSortChange = (name) => {
		const { currentSort } = this.state;
        let nextSort;

        if(name === 'date') {
            if (currentSort === 'date_down') nextSort = 'date_up';
            else if (currentSort === 'date_up') nextSort = 'default';
            else nextSort = 'date_down';
        } else if(name === 'diss') {
            if (currentSort === 'diss_down') nextSort = 'diss_up';
            else if (currentSort === 'diss_up') nextSort = 'default';
            else nextSort = 'diss_down';
        } else {
            if (currentSort === 'price_down') nextSort = 'price_up';
            else if (currentSort === 'price_up') nextSort = 'default';
            else nextSort = 'price_down';
        }

		this.setState({
			currentSort: nextSort
		}, () => {
            this.renderArrowDate()
            this.renderArrowDiss()
            this.renderArrowPrice()
        });
    };

    renderArrowDate = () => {
        if(this.state.currentSort === 'date_up') {
            return '\u2191'
        } else if(this.state.currentSort === 'date_down') {
            return '\u2193'
        } else {
            return ''
        }
    }

    renderArrowDiss = () => {
        if(this.state.currentSort === 'diss_up') {
            return '\u2191'
        } else if(this.state.currentSort === 'diss_down') {
            return '\u2193'
        } else {
            return ''
        }
    }

    renderArrowPrice = () => {
        if(this.state.currentSort === 'price_up') {
            return '\u2191'
        } else if(this.state.currentSort === 'price_down') {
            return '\u2193'
        } else {
            return ''
        }
    }

    render() {
        let i = 0;
        return ( 
            <div class='row d-flex justify-content-center'>
            <div class='col-md-7'> 
                <br/>
                <h3>Clinic {this.state.name}</h3>
                <h4>List of predefined appointments</h4>
                <br/>
                <Table class="table table-hover ">
                    <TableHead class="table-active">
                        <TableRow class="table-active">
                            <TableCell class="text-success">procedure</TableCell>
                            <TableCell class="text-success">doctor</TableCell>
                            <TableCell class="text-success">nurse</TableCell>
                            <TableCell class="text-success">room</TableCell>
                            <TableCell class="text-success cursor-pointer" onClick={() => this.onSortChange('date')}>date and timer{this.renderArrowDate()}</TableCell>
                            <TableCell class="text-success cursor-pointer" onClick={() => this.onSortChange('price')}>price with disscount{this.renderArrowPrice()}</TableCell>
                            <TableCell class="text-success cursor-pointer" onClick={() => this.onSortChange('diss')}>disscount{this.renderArrowDiss()}</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.predefined.sort(sortTypes[this.state.currentSort].fn).map (c => (
                            <TableRow className={(++i)%2? `table-dark` : ``} >
                                <PredefinedAppointmentItem key={c.id} id={c.id} value={c} handleUpdate={this.handleUpdate}/>
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