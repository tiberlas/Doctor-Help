import React, {Component, Fragment}  from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button'

class PatientList extends Component {

	state = {
        patients: [],
        filter: ""
	}

	componentDidMount () {
		axios.get ('http://localhost:8080/api/nurses/patientList')
		.then (response => {
			this.setState ({
				patients: response.data
			})
		})
    }

    handleChange = (event) => {
        this.setState( {
            [event.target.name]: event.target.value
        })

        console.log("filter: " + this.state.filter)
    }

    filterSubmit = (event) => {
        event.preventDefault()

        axios.post('http://localhost:8080/api/nurses/filterPatients', {
            filterResults: this.state.filter
        }).then(response => {
            this.setState({
                patients: response.data
            })
        })
    }


    

    generatePatientRows(row) {
        // let items = []
        // items.push(<TableCell><Link>{row.insuranceNumber}</Link></TableCell>)
        // items.push(<TableCell><p class='text-white'>{row.firstName}</p></TableCell>)
        // items.push(<TableCell><p class='text-white'>{row.lastName}</p></TableCell>)
        // items.push(<TableCell><p class='text-white'>{row.email}</p></TableCell>)
        // items.push(<TableCell></TableCell>)
        // return items
        return (
            <Fragment>
                <TableCell><Link>{row.insuranceNumber}</Link></TableCell>
                <TableCell><p class='text-white'>{row.firstName}</p></TableCell>
                <TableCell><p class='text-white'>{row.lastName}</p></TableCell>
                <TableCell><p class='text-white'>{row.email}</p></TableCell>
                <TableCell></TableCell>
             </Fragment>
        )
    }

	render () {
		return (
			<div>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell><p class='text-success'>Insurance number</p></TableCell>
							<TableCell><p class='text-success'>First name</p></TableCell>
							<TableCell><p class='text-success'>Last name</p></TableCell>
                            <TableCell><p class='text-success'>Mail</p></TableCell>
                            <TableCell> <input type = "text" placeholder="Search by ..." name = "filter" onChange = {this.handleChange}/> <Button className="btn btn-success" onClick = {this.filterSubmit}>Search</Button></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{this.state.patients.map (row => (
                             <TableRow key={row.id}>
                                 {this.generatePatientRows(row)}
                            </TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		);
	}

}

export default PatientList;