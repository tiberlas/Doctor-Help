import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Select from 'react-select'
import SelectInput from '@material-ui/core/Select/SelectInput';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
//import Option from 'react'

class PatientHistory extends Component {

	state = {
		reports : [], 
		filter : 'NONE', 
		isUpToDate : false, 
		sortDate : 'unsorted', 
		dateString : "", 
		dates : [], 
		clinics : [], 
		doctors : [], 
		types : [], 
		activeDateFilter : "unfiltered", 
		activeClinicFilter : "unfiltered",
		activeDoctorFilter : "unfiltered", 
		activeTypeFilter : "unfiltered",  
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
					reports: response.data.appointmentList, 
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
					reports : response.data.appointmentList,
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
		else if (this.props.filter === 'PREDEFINED') {
			//alert ("Listing predefined appointments")
			axios.get('http://localhost:8080/api/appointments/predefined/doctor=' + this.state.activeDoctorFilter + '/procedure_type=' + this.state.activeTypeFilter + '/clinic=' + this.state.activeClinicFilter + '/date=' + this.state.activeDateFilter)
			.then (response => {
				this.setState ({
					reports : response.data.appointmentList,
					isUpToDate : false, 
					dates : response.data.possibleDates, 
					doctors : response.data.possibleDoctors, 
					clinics : response.data.possibleClinics, 
					types : response.data.possibleTypes 
				})
			})
			.catch ( response => {
				this.setState ({
					reports : [],
					isUpToDate : false, 
					dates : response.data.possibleDates, 
					doctors : response.data.possibleDoctors, 
					clinics : response.data.possibleClinics, 
					types : response.data.possibleTypes 
				})
			});
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

	handleDateFilter = (option) => {
		//alert ("Date filter: Activate! " + option.value);
		axios.get('http://localhost:8080/api/appointments/predefined/doctor=' + this.state.activeDoctorFilter + '/procedure_type=' + this.state.activeTypeFilter + '/clinic=' + this.state.activeClinicFilter + '/date=' + option.value)
		.then (response => {
			this.setState ({
				reports : response.data.appointmentList,
				isUpToDate : false, 
				activeDateFilter : option.value
			})
		})
		.catch ( response => {
			this.setState ({
				reports : [],
				isUpToDate : false, 
				activeDateFilter : option.value
			})
		});
		
	}

	handleDoctorFilter = (option) => {
		//alert ("Date filter: Activate! " + option.value);
		axios.get('http://localhost:8080/api/appointments/predefined/doctor=' + option.value + '/procedure_type=' + this.state.activeTypeFilter + '/clinic=' + this.state.activeClinicFilter + '/date=' + this.state.activeDateFilter)
		.then (response => {
			this.setState ({
				reports : response.data.appointmentList,
				isUpToDate : false, 
				activeDoctorFilter : option.value
			})
		})
		.catch ( response => {
			this.setState ({
				reports : [],
				isUpToDate : false, 
				activeDoctorFilter : option.value
			})
		});
		
	}

	handleClinicFilter = (option) => {
		//alert ("Date filter: Activate! " + option.value);
		axios.get('http://localhost:8080/api/appointments/predefined/doctor=' + this.state.activeDoctorFilter + '/procedure_type=' + this.state.activeTypeFilter + '/clinic=' + option.value + '/date=' + this.state.activeDateFilter)
		.then (response => {
			this.setState ({
				reports : response.data.appointmentList,
				isUpToDate : false, 
				activeClinicFilter : option.value
			})
		})
		.catch ( response => {
			this.setState ({
				reports : [],
				isUpToDate : false, 
				activeClinicFilter : option.value
			})
		});
		
	}

	handleTypeFilter = (option) => {
		//alert ("Date filter: Activate! " + option.value);
		axios.get('http://localhost:8080/api/appointments/predefined/doctor=' + this.state.activeDoctorFilter + '/procedure_type=' + option.value + '/clinic=' + this.state.activeClinicFilter + '/date=' + this.state.activeDateFilter)
		.then (response => {
			this.setState ({
				reports : response.data.appointmentList,
				isUpToDate : false, 
				activeTypeFilter : option.value
			})
		})
		.catch ( response => {
			this.setState ({
				reports : [],
				isUpToDate : false, 
				activeTypeFilter : option.value
			})
		});
		
	}

	render () {

		// When viewing patient history, display a perscription Link;
		// When viewing a pending appointment, display the satus (requested or approved)

		const options = [
			// {[this.state.dates], [this.state.dates]}
		]

		return (
			<div>
				<div class='row d-flex justify-content-center'>
					<div class='col-md-11'>




						<div hidden={(this.props.filter === 'PREDEFINED') ? (false) : (true)}>
							<FormControl class='text-success'>
									<Select 
										style="width:500px"
										onChange = {this.handleDateFilter.bind(this)}
										options={this.state.dates.map(opt => ({ label: opt, value: opt }))}
									></Select>
								<FormHelperText class='text-success'>Date filter</FormHelperText>
							</FormControl>
							<FormControl class='text-success'>
									<Select 
										style="width:500px"
										onChange = {this.handleDoctorFilter.bind(this)}
										options={this.state.doctors.map(opt => ({ label: opt, value: opt }))}
									></Select>
								<FormHelperText class='text-success'>Doctor filter</FormHelperText>
							</FormControl>
							<FormControl class='text-success'>
									<Select 
										style="width:500px"
										onChange = {this.handleClinicFilter.bind(this)}
										options={this.state.clinics.map(opt => ({ label: opt, value: opt }))}
									></Select>
								<FormHelperText class='text-success'>Clinic filter</FormHelperText>
							</FormControl>
							<FormControl class='text-success'>
									<Select 
										style="width:500px"
										onChange = {this.handleTypeFilter.bind(this)}
										options={this.state.types.map(opt => ({ label: opt, value: opt }))}
									></Select>
								<FormHelperText class='text-success'>Appointment type filter</FormHelperText>
							</FormControl>
						</div>




						<Table>
							<TableHead>
								<TableRow>
									<TableCell><p class='text-success' onClick={() => this.onSortChange('date')}>Date{this.renderArrowDate()}</p></TableCell>
									<TableCell><p class='text-success' onClick={() => this.onSortChange('date')}>Time{this.renderArrowDate()}</p></TableCell>
									<TableCell><p class='text-success'>Procedure Type</p></TableCell>
									<TableCell><p class='text-success' hidden={(this.props.filter === 'PENDING') ? (false) : (true)}>Status</p></TableCell>
									<TableCell><p class='text-success'>Doctor</p></TableCell>
									<TableCell><p class='text-success'>Nurse</p></TableCell>
									<TableCell><p class='text-success' hidden={(this.props.filter === 'NONE') ? (false) : (true)}>Perscription</p></TableCell>
									<TableCell><p class='text-success'>Clinic</p></TableCell>
									<TableCell><p class='text-success' hidden={(this.props.filter === 'PENDING') ? (false) : (true)}>Cancel appointment</p></TableCell>
									<TableCell><p class='text-success' hidden={(this.props.filter === 'PREDEFINED') ? (false) : (true)}>Room</p></TableCell>
									<TableCell><p class='text-success' hidden={(this.props.filter === 'PREDEFINED') ? (false) : (true)}>Price</p></TableCell>
									<TableCell><p class='text-success' hidden={(this.props.filter === 'PREDEFINED') ? (false) : (true)}>Book</p></TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{this.state.reports.sort((a, b) => (this.state.sortDate === 'ascending') ? (a.date < b.date) : (a.date > b.date)).map (row => (
									<TableRow key={row.examinationReportId}>
										<TableCell><p class='text-white'>{row.date.split(' ')[0]}</p></TableCell>
										<TableCell><p class='text-white'>{row.date.split(' ')[1]}</p></TableCell>
										<TableCell><p class='text-white'>{row.procedureType}</p></TableCell>
										<TableCell><p class='text-white' hidden={(this.props.filter === 'PENDING') ? (false) : (true)}>{row.status}</p></TableCell>
										<TableCell><p class='text-white'><Link to={"/doctor/profile/" + row.doctorId}>{row.doctor}</Link></p></TableCell>
										<TableCell><p class='text-white'>{row.nurse}</p></TableCell>
										<TableCell><p class='text-white' hidden={(this.props.filter === 'NONE') ? (false) : (true)}>{(row.date === "") ? ("") : (<Link to={"/patient/perscription/" + row.examinationReportId}>Perscription</Link>)}</p></TableCell>
										<TableCell><p class='text-white'><Link to={"/clinic/" + row.clinicId}>{row.clinicName}</Link></p></TableCell>
										<TableCell><p class='text-white' hidden={(this.props.filter === 'PENDING') ? (false) : (true)}><Button hidden={row.canCancel} onClick={() => this.handleCancel(row.appointmentId, row.date)}>Cancel</Button></p></TableCell>
										<TableCell><p class='text-white' hidden={(this.props.filter === 'PREDEFINED') ? (false) : (true)}>{row.room}</p></TableCell>
								<TableCell><p class='text-white' hidden={(this.props.filter === 'PREDEFINED') ? (false) : (true)}>{row.price}</p></TableCell>
										<TableCell><p class='text-white' hidden={(this.props.filter === 'PREDEFINED') ? (false) : (true)}> <Button>Placeholder</Button> </p></TableCell>
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