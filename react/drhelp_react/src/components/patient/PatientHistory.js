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
		axios.get('http://localhost:8080/api/patients/history')
		.then (response => {
			this.setState ({
				reports: response.data
			})
		})
	}

	render () {
		return (
			<div>
				<div class='row d-flex justify-content-center'>
					<div class='col-md-11'>
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
								{this.state.reports.map (row => (
									<TableRow key={row.examinationReportId}>
										<TableCell><p class='text-black'>{row.date}</p></TableCell>
										<TableCell><p class='text-black'>{row.procedureType}</p></TableCell>
										<TableCell><p class='text-black'>{row.doctor}</p></TableCell>
										<TableCell><p class='text-black'>{row.nurse}</p></TableCell>
										<TableCell><p class='text-black'>{(row.date === "") ? ("") : (<Link to={"/patient/perscription/" + row.examinationReportId}>Perscription</Link>)}</p></TableCell>
										<TableCell><p class='text-black'>{row.clinicName}</p></TableCell>
									</TableRow>
								))}		
							</TableBody>
						</Table>
					</div>
				</div>
			</div>
		);
	}

}

export default PatientHistory;