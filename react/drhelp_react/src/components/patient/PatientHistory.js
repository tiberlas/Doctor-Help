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
import { UserContext } from '../../context/UserContextProvider.js';
import { Modal } from 'react-bootstrap';


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
		show : false, 
		reservationMessage : "", 
		modalTitle : "", 
		waiting : false, 
		reservedAppointment : []
	}

    static contextType = UserContext

	componentDidMount () {
		this.updateComponent ();
		this.setState ({
			isUpToDate : true
		})
		
	}

	updateComponent () {
		if (this.state.isUpToDate) {
			return;
		}

		
		if (this.props.filter === 'NONE') {
			axios.get('http://localhost:8080/api/patients/history')
			.then (response => {
				this.setState ({
					reports: response.data.appointmentList, 
					isUpToDate : false
				})
			});
		}
		else if (this.props.filter === 'PENDING') {
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

	handleCancel (appointmentId, appointmentDate) {
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

	handleReservationClick (row) {
		this.setState ({
			waiting : true
		})
		axios.post ('http://localhost:8080/api/appointments/predefined/reserve', {
			appointmentId : row.appointmentId,
			patientId : this.context.user.id
		})
		.then (response =>{
			if (response.data === true) {
				this.setState ({
					show : true, 
					reservationMessage : "Appoinment was successfully reserved", 
					modalTitle : "Success!", 
					waiting : false, 
					reservedAppointment : row
				})
			}
			else {
				this.setState ({
					show : true, 
					reservationMessage : "We have made an error; please try again", 
					modalTitle : "Error!",
					waiting : false
				})
			}
			this.updateComponent();
		});
	}

	handleClose =  () => {
		this.setState ({
			show : false
		})
	}

	render () {
		
		// When viewing patient history, display a perscription Link;
		// When viewing a pending appointment, display the satus (requested or approved)

		return (
			<div>
				<div class='row d-flex justify-content-center'>
					<div class='col-md-11'>

						<Modal show={this.state.show} onHide={this.handleClose}>
							<Modal.Header closeButton>
								<Modal.Title>{this.state.modalTitle}</Modal.Title>
							</Modal.Header>
								<Modal.Body>
									<p>
										{this.state.reservationMessage}! 
									</p>
									<Table>
										<TableBody>
											<TableRow>
												<TableCell class='text-white'>
													<strong>Date: </strong>
												</TableCell>
												<TableCell class='text-white'>
													{(this.state.reservedAppointment.date !== undefined) ? (this.state.reservedAppointment.date.split(' ')[0]) : ("")}
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell class='text-white'>
													<strong>Time: </strong>
												</TableCell>
												<TableCell class='text-white'>
													{(this.state.reservedAppointment.date !== undefined) ? (this.state.reservedAppointment.date.split(' ')[1]) : ("")}
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell class='text-white'>
													<strong>Clinic: </strong>
												</TableCell>
												<TableCell class='text-white'>
													{this.state.reservedAppointment.clinicName}
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell class='text-white'>
													<strong>Room: </strong>
												</TableCell>
												<TableCell class='text-white'>
													{this.state.reservedAppointment.room}
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell class='text-white'>
													<strong>Procedure type: </strong>
												</TableCell>
												<TableCell class='text-white'>
													{this.state.reservedAppointment.procedureType}
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell class='text-white'>
													<strong>Doctor: </strong>
												</TableCell>
												<TableCell class='text-white'>
													{this.state.reservedAppointment.doctor}
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell class='text-white'>
													<strong>Nurse: </strong>
												</TableCell>
												<TableCell class='text-white'>
													{this.state.reservedAppointment.nurse}
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell class='text-white'>
													<strong>Price: </strong>
												</TableCell>
												<TableCell class='text-white'>
													{this.state.reservedAppointment.price}
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell class='text-white'>
													<strong>Discount: </strong>
												</TableCell>
												<TableCell class='text-white'>
													<p style={{ color: 'red' }}>
														{this.state.reservedAppointment.discount}%
													</p>
												</TableCell>
											</TableRow>
										</TableBody>
									</Table>
								</Modal.Body>
							<Modal.Footer>
								<Button variant="primary" onClick={this.handleClose}>
									Close
								</Button>
							</Modal.Footer>
						</Modal>

						<div hidden={(this.props.filter === 'PREDEFINED') ? (false) : (true)}>
						{/* <div> */}
							<Table>
								<TableRow>
									<TableCell>
										<FormControl class='text-success'>
											<Select 
												style="width:500px"
												onChange = {this.handleDateFilter.bind(this)}
												options={this.state.dates.map(opt => ({ label: opt, value: opt }))}
											></Select>
											<FormHelperText class='text-success'>Date filter</FormHelperText>
										</FormControl>
									</TableCell>
									<TableCell>
										<FormControl class='text-success'>
										<Select 
											style="width:500px"
											onChange = {this.handleDoctorFilter.bind(this)}
											options={this.state.doctors.map(opt => ({ label: opt, value: opt }))}
										></Select>
									<FormHelperText class='text-success'>Doctor filter</FormHelperText>
								</FormControl>
								</TableCell>
								<TableCell>
								<FormControl class='text-success'>
								<Select 
									style="width:500px"
									onChange = {this.handleClinicFilter.bind(this)}
									options={this.state.clinics.map(opt => ({ label: opt, value: opt }))}
								></Select>
								<FormHelperText class='text-success'>Clinic filter</FormHelperText>
							</FormControl>
								</TableCell>
								<TableCell>
								<FormControl class='text-success'>
								<Select 
									style="width:500px"
									onChange = {this.handleTypeFilter.bind(this)}
									options={this.state.types.map(opt => ({ label: opt, value: opt }))}
								></Select>
								<FormHelperText class='text-success'>Appointment type filter</FormHelperText>
							</FormControl>
									</TableCell>
								</TableRow>
							</Table>
						</div>

						<Table>
							<TableHead>
								<TableRow>
									<TableCell><p class='text-success' onClick={() => this.onSortChange('date')}>Date{this.renderArrowDate()}</p></TableCell>
									<TableCell><p class='text-success' onClick={() => this.onSortChange('date')}>Time</p></TableCell>
									<TableCell><p class='text-success'>Procedure Type</p></TableCell>
									<TableCell><p class='text-success' hidden={(this.props.filter === 'PENDING') ? (false) : (true)}>Status</p></TableCell>
									<TableCell><p class='text-success'>Doctor</p></TableCell>
									<TableCell><p class='text-success'>Nurse</p></TableCell>
									<TableCell><p class='text-success' hidden={(this.props.filter === 'NONE') ? (false) : (true)}>Perscription</p></TableCell>
									<TableCell><p class='text-success'>Clinic</p></TableCell>
									<TableCell><p class='text-success' hidden={(this.props.filter === 'PENDING') ? (false) : (true)}>Cancel appointment</p></TableCell>
									<TableCell><p class='text-success' hidden={(this.props.filter === 'PREDEFINED') ? (false) : (true)}>Room</p></TableCell>
									<TableCell><p class='text-success' hidden={(this.props.filter === 'PREDEFINED') ? (false) : (true)}>Price</p></TableCell>
									<TableCell><p class='text-success' hidden={(this.props.filter === 'PREDEFINED') ? (false) : (true)}>Discount</p></TableCell>
									<TableCell><p class='text-success' hidden={(this.props.filter === 'PREDEFINED') ? (false) : (true)}>Reserve</p></TableCell>
								</TableRow>
							</TableHead>
								{
									this.state.reports.sort((a, b) => (this.state.sortDate === 'ascending') ? (a.date < b.date) : (a.date > b.date)).map (row => (
										<TableBody>
											<TableRow key={row.examinationReportId}>
												<TableCell><p class='text-white'>{row.date.split(' ')[0]}</p></TableCell>
												<TableCell><p class='text-white'>{row.date.split(' ')[1]}</p></TableCell>
												<TableCell><p class='text-white'>{row.procedureType}</p></TableCell>
												<TableCell><p class='text-white' hidden={(this.props.filter === 'PENDING') ? (false) : (true)}>{row.status}</p></TableCell>
												<TableCell><p class='text-white'><Link to={"/doctor/profile/" + row.doctorId}>{row.doctor}</Link></p></TableCell>
												<TableCell><p class='text-white'>{row.nurse}</p></TableCell>
												<TableCell><p class='text-white' hidden={(this.props.filter === 'NONE') ? (false) : (true)}>{(row.date === "") ? ("") : (<Link to={"/patient/perscription/" + row.examinationReportId}>Perscription</Link>)}</p></TableCell>
												<TableCell><p class='text-white'><Link to={"/clinic/" + row.clinicId}>{row.clinicName}</Link></p></TableCell>
												<TableCell><p class='text-white' hidden={(this.props.filter === 'PENDING') ? (false) : (true)}><Button  hidden={row.canCancel} onClick={() => this.handleCancel(row.appointmentId, row.date)}>Cancel</Button></p></TableCell>
												<TableCell><p class='text-white' hidden={(this.props.filter === 'PREDEFINED') ? (false) : (true)}>{row.room}</p></TableCell>
												<TableCell><p class='text-white' hidden={(this.props.filter === 'PREDEFINED') ? (false) : (true)}>{row.price}</p></TableCell>
												<TableCell><p class='text-white' hidden={(this.props.filter === 'PREDEFINED') ? (false) : (true)}><p style={{ color: 'red' }}>{row.discount}%</p></p></TableCell>
									<TableCell><p class='text-white' hidden={(this.props.filter === 'PREDEFINED') ? (false) : (true)} onClick={() => this.handleReservationClick(row)} > <Button disabled={this.state.waiting}>Reserve</Button> </p></TableCell>
											</TableRow>
										</TableBody>
									))
								}		
						</Table>
					</div>
				</div>
			</div>
		);
	}
}

export default PatientHistory;