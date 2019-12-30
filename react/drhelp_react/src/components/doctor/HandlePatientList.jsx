import React, { Component } from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PatientItem from './PatientItem';
import '../../index.css';

const sortTypes = {
    insurance_up: {
        fn: (a, b) => a.insuranceNumber - b.insuranceNumber
    },
    insurance_down: {
        fn: (a, b) => b.insuranceNumber - a.insuranceNumber
    },
    first_up: {
        fn: (a, b) => b.firstName.localeCompare(a.firstName)
    },
    first_down: {
        fn: (a, b) => a.firstName.localeCompare(b.firstName)
    },
    last_up: {
        fn: (a, b) => b.lastName.localeCompare(a.lastName)
    },
    last_down: {
        fn: (a, b) => a.lastName.localeCompare(b.lastName)
    },
    email_up: {
        fn: (a, b) => b.email.localeCompare(a.email)
    },
    email_down: {
        fn: (a, b) => a.email.localeCompare(b.email)
    },
    default: {
        fn: (a, b) => a
    }
};

class HandlePatientList extends Component {
    state = { 
        patients: [],
        currentSort: 'default'
    }

    componentDidMount () {
		axios.get ('http://localhost:8080/api/patients/all')
		.then (response => {
			this.setState ({
				patients: response.data
			})
        })
        
    }

    onSortChange = (name) => {
		const { currentSort } = this.state;
        let nextSort;

        if(name === 'insurance') {
            if (currentSort === 'insurance_down') nextSort = 'insurance_up';
            else if (currentSort === 'insurance_up') nextSort = 'default';
            else nextSort = 'insurance_down';
        } else if(name === 'firstName') {
            if (currentSort === 'first_down') nextSort = 'first_up';
            else if (currentSort === 'first_up') nextSort = 'default';
            else nextSort = 'first_down';
        } else if(name === 'lastName') {
            if (currentSort === 'last_down') nextSort = 'last_up';
            else if (currentSort === 'last_up') nextSort = 'default';
            else nextSort = 'last_down';
        } else {
            if (currentSort === 'email_down') nextSort = 'email_up';
            else if (currentSort === 'email_up') nextSort = 'default';
            else nextSort = 'email_down';
        }

		this.setState({
			currentSort: nextSort
		}, () => {
            this.renderArrowFirst()
            this.renderArrowLast()
            this.renderArrowEmail()
            this.renderArrowInsurance()
        });
	};

    renderArrowInsurance = () => {
        if(this.state.currentSort === 'insurance_up') {
            return '\u2191'
        } else if(this.state.currentSort === 'insurance_down') {
            return '\u2193'
        } else {
            return ''
        }
    }

    renderArrowFirst = () => {
        if(this.state.currentSort === 'first_up') {
            return '\u2191'
        } else if(this.state.currentSort === 'first_down') {
            return '\u2193'
        } else {
            return ''
        }
    }

    renderArrowLast = () => {
        if(this.state.currentSort === 'last_up') {
            return '\u2191'
        } else if(this.state.currentSort === 'last_down') {
            return '\u2193'
        } else {
            return ''
        }
    }

    renderArrowEmail = () => {
        if(this.state.currentSort === 'email_up') {
            return '\u2191'
        } else if(this.state.currentSort === 'email_down') {
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
                <br/>
                <Table class="table table-hover ">
                    <TableHead class="table-active">
                        <TableRow class="table-active">
                            <TableCell class='text-success cursor-pointer' onClick={() => this.onSortChange('firstName')}>first name{this.renderArrowFirst()}</TableCell>
                            <TableCell class='text-success cursor-pointer' onClick={() => this.onSortChange('lastName')}>last name{this.renderArrowLast()}</TableCell>
                            <TableCell class='text-success cursor-pointer' onClick={() => this.onSortChange('email')}>email{this.renderArrowEmail()}</TableCell>
                            <TableCell class='text-success cursor-pointer' onClick={() => this.onSortChange('insurance')}>insurance number{this.renderArrowInsurance()}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {[...this.state.patients].sort(sortTypes[this.state.currentSort].fn).map(patient => (
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
