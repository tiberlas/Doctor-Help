import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

class PatientHistory extends Component {

	state = {
		reports : [], 
		filter : 'NONE', 
		isUpToDate : false, 
		sortDate : 'unsorted', 
		dateString : ""
	}

	componentDidMount () {
		this.updateComponent ();
		this.setState ({
			isUpToDate : true
		})
		
	}
	
	// updateReports (data) {
	// 	this.setState ({
	// 		reports : data
	// 	})
	// }

	// _onChangeReports () {
	// 	alert ("New reports!");
	// }

	updateComponent () {
		if (this.state.isUpToDate) {
			return;
		}

		
		if (this.props.filter === 'NONE') {
			// this.setState ({
			// 	reports : []
			// })
			axios.get('http://localhost:8080/api/patients/history')
			.then (response => {
				//this.updateReports (response.data);
				this.setState ({
					reports: response.data, 
					isUpToDate : false
				})
			});
			//alert ("Unfiltered");
		}
		else if (this.props.filter === 'PENDING') {
			// this.setState ({
			// 	reports : []
			// })
			axios.get('http://localhost:8080/api/patients/pending')
			.then (response => {
				this.setState ({
					reports : response.data,
					isUpToDate : false
				})
			})
			.catch ( response => {
				this.setState ({
					reports : [],
					isUpToDate : false
				})
			}
				
			);
		}
		
	}

	renderArrowDate () {
		if (this.state.sortDate === 'ascending') {
			return '\u2191';
		}
		else if (this.state.sortDate === 'descending') {
			return '\u2193';
		}
		else {
			return '';
		}
	}

	onSortChange (arg) {
		if (this.state.sortDate === 'unsorted') {
			this.setState ({
				sortDate : 'ascending'
			})
		}
		else if (this.state.sortDate === 'ascending') {
			this.setState ({
				sortDate : 'descending'
			})
		} 
		else {
			this.setState ({
				sortDate : 'unsorted'
			})
		}
		this.renderArrowDate();
	}

	// sortByDate (arg) {
	// 	this.state.reports.sort((a > b) ?: (a:"date", b:"date") => number);
	// }

	handleCancel (appointmentId, appointmentDate) {
		this.canCancel(appointmentDate);
		//alert ("Canceling appointment " + appointmentId);
		axios.delete ("http://localhost:8080/api/appointments/delete", {
			data: {
				appointmentId : appointmentId
			}
		})
		.then (date => {
			this.updateComponent();
		});
	}

	canCancel (appointmentDate) {
		let newDate = new Date()
		let date = newDate.getDate();
		let month = newDate.getMonth() + 1;
		let year = newDate.getFullYear();
		let hour = newDate.getHours();
		let minutes = newDate.getMinutes()
		let dateString = date + "." + month + "." + year + ". " + hour + ":" + minutes;

		let parts = appointmentDate.split(' ');
		let appDate = parts[0].split('.')[0];
		let appMonth = parts[0].split('.')[1];
		let appYear = parts[0].split('.')[2];
		let appHour = parts[1].split(':')[0];
		let appMinutes = parts[1].split(':')[1];

		if (year === appYear) {
			if (month === appMonth) {
				if (date === appDate) {
					return false;
				}
				// Ako je dan ranije, proveri sate
				if (date === appDate - 1) {
					if (hour > appHour) {
						return false;
					}
					if (hour === appHour) {
						if (minutes >= appMinutes) {
							return false;
						}
					}
				}
			}
			if (month === appMonth - 1) {
				
			}
		}

		return true();
		alert ("Extracted time: " + appHour + ":" + appMinutes);
	}

	render () {

		// When viewing patient history, display a perscription Link;
		// When viewing a pending appointment, display the satus (requested or approved)

		return (
			<div>
				<div class='row d-flex justify-content-center'>
					<div class='col-md-11'>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell><p class='text-success' onClick={() => this.onSortChange('date')}>Time{this.renderArrowDate()}</p></TableCell>
									<TableCell><p class='text-success'>Procedure Type</p></TableCell>
									<TableCell><p class='text-success' hidden={(this.props.filter === 'NONE') ? (true) : (false)}>Status</p></TableCell>
									<TableCell><p class='text-success'>Doctor</p></TableCell>
									<TableCell><p class='text-success'>Nurse</p></TableCell>
									<TableCell><p class='text-success' hidden={(this.props.filter === 'NONE') ? (false) : (true)}>Perscription</p></TableCell>
									<TableCell><p class='text-success'>Clinic</p></TableCell>
									<TableCell><p class='text-success' hidden={(this.props.filter === 'NONE') ? (true) : (false)}>Cancel appointment</p></TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{this.state.reports.sort((a, b) => (this.state.sortDate === 'ascending') ? (a.date < b.date) : (a.date > b.date)).map (row => (
									<TableRow key={row.examinationReportId}>
										<TableCell><p class='text-white'>{row.date}</p></TableCell>
										<TableCell><p class='text-white'>{row.procedureType}</p></TableCell>
										<TableCell><p class='text-white' hidden={(this.props.filter === 'NONE') ? (true) : (false)}>{row.status}</p></TableCell>
										<TableCell><p class='text-white'><Link to={"/doctor/profile/" + row.doctorId}>{row.doctor}</Link></p></TableCell>
										<TableCell><p class='text-white'>{row.nurse}</p></TableCell>
										<TableCell><p class='text-white' hidden={(this.props.filter === 'NONE') ? (false) : (true)}>{(row.date === "") ? ("") : (<Link to={"/patient/perscription/" + row.examinationReportId}>Perscription</Link>)}</p></TableCell>
										<TableCell><p class='text-white'><Link to={"/clinic/" + row.clinicId}>{row.clinicName}</Link></p></TableCell>
										<TableCell><p class='text-white' hidden={(this.props.filter === 'NONE') ? (true) : (false)}><Button onClick={() => this.handleCancel(row.appointmentId, row.date)}>Cancel</Button></p></TableCell>
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