import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Link} from 'react-router-dom';
import axios from 'axios';

class PatientHistory extends Component {

	state = {
		reports: []
	}

	componentDidMount () {
		axios.get('')
	}

	render () {
		return (
			<div>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell><p class='text-success'>Date</p></TableCell>
							<TableCell><p class='text-success'>Procedure Type</p></TableCell>
							<TableCell><p class='text-success'>Doctor</p></TableCell>
							<TableCell><p class='text-success'>Nurse</p></TableCell>
							<TableCell><p class='text-success'>Perscription</p></TableCell>
							<TableCell><p class='text-success'>Clinic</p></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell>PLACEHOLDER</TableCell>
							<TableCell>PLACEHOLDER</TableCell>
							<TableCell>PLACEHOLDER</TableCell>
							<TableCell>PLACEHOLDER</TableCell>
							<TableCell><Link to='/patient/perscription'>Perscription</Link></TableCell>
							<TableCell>PLACEHOLDER</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</div>
		);
	}

}

export default PatientHistory;