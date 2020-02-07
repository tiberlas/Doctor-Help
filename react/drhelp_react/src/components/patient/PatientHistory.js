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
import { Modal, ModalBody, ModalFooter } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/ModalHeader';


const crniFont = {
	option: provided => ({
		...provided,
		color: 'black'
	  }),
	  control: provided => ({
		...provided,
		color: 'black'
	  }),
	  singleValue: (provided) => ({
		...provided,
		color: 'black'
	  })
}


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
		statuses : [],
		activeDateFilter : "unfiltered", 
		activeClinicFilter : "unfiltered",
		activeDoctorFilter : "unfiltered", 
		activeTypeFilter : "unfiltered",  
		activeStatusFilter : "unfiltered",
		show : false, 
		reservationMessage : "", 
		modalTitle : "", 
		waiting : false, 
		reservedAppointment : [], 
		dateOptions : [], 
		showFilters : false, 

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
			axios.get('http://localhost:8080/api/patients/history/doctor=' + this.state.activeDoctorFilter + '/procedure_type=' + this.state.activeTypeFilter + '/clinic=' + this.state.activeClinicFilter + '/date=' + this.state.activeDateFilter)
			.then (response => {
				this.setState ({
					reports: response.data.appointmentList, 
					isUpToDate : false
				})

				let dateList = [];
				let dateSize = 0;
				if ((response.data.possibleDates !== []) && (response.data.possibleDates !== undefined)) {
					dateSize = response.data.possibleDates.length;
				}
				if (dateSize > 0) {
					dateList.push ({
						label : "-",
						value : "unfiltered"
					})
					for (let i = 1; i < dateSize; ++i) {
						dateList.push ({
							label : response.data.possibleDates[i],
							value : response.data.possibleDates[i]
						})
					}
				}
				
				let doctorList = [];
				let doctorSize = 0;
				if ((response.data.possibleDoctors !== null) && (response.data.possibleDoctors !== undefined)) {
					doctorSize = response.data.possibleDoctors.length;
				}
				if (doctorSize > 0) {
					doctorList.push ({
						label : "-",
						value : "unfiltered" 
					})
					for (let i = 1; i < doctorSize; ++i) {
						doctorList.push ({
							label : response.data.possibleDoctors[i],
							value : response.data.possibleDoctors[i], 
						})
					}
				}
				

				let clinicList = []
				let clinicSize = 0; 
				if ((response.data.possibleClinics !== null) && (response.data.possibleClinics !== undefined)) {
					clinicSize = response.data.possibleClinics.length;
				}

				if (clinicSize > 0) {
					clinicList.push ({
						label : "-", 
						value : "unfiltered"
					})
					for (let i = 1; i < clinicSize; ++i) {
						clinicList.push ({
							label : response.data.possibleClinics[i],
							value : response.data.possibleClinics[i]
						})
					}
				}
				

				let typeList = [];
				let typeSize = 0;
				if ((response.data.possibleTypes !== null) && (response.data.possibleTypes !== undefined)) {
					typeSize = response.data.possibleTypes.length;
				}
				
				if (typeSize > 0) {
					typeList.push ({
						label : "-", 
						value : "unfiltered"
					})
					for (let i = 1; i < typeSize; ++i) {
						typeList.push ({
							label : response.data.possibleTypes[i],
							value : response.data.possibleTypes[i] 
						})
					}
				}
				
				
				this.setState ({
					dates : dateList,
					doctors : doctorList,
					clinics : clinicList, 
					types : typeList
				})
			});
		}
		else if (this.props.filter === 'PENDING') {
			axios.get('http://localhost:8080/api/patients/pending/doctor=' + this.state.activeDoctorFilter + '/procedure_type=' + this.state.activeTypeFilter + '/clinic=' + this.state.activeClinicFilter + '/date=' + this.state.activeDateFilter + '/status=' + this.state.activeStatusFilter)
			.then (response => {
				this.setState ({
					reports : response.data.appointmentList,
					isUpToDate : false
				})

				let dateList = [];
				let dateSize = 0;
				if (response.data.possibleDates !== []) {
					dateSize = response.data.possibleDates.length;
				}
				if (dateSize > 0) {
					dateList.push ({
						label : "-",
						value : "unfiltered"
					})
					for (let i = 1; i < dateSize; ++i) {
						dateList.push ({
							label : response.data.possibleDates[i],
							value : response.data.possibleDates[i]
						})
					}
				}
				
				let doctorList = [];
				let doctorSize = 0;
				if (response.data.possibleDoctors !== null) {
					doctorSize = response.data.possibleDoctors.length;
				}
				if (doctorSize > 0) {
					doctorList.push ({
						label : "-",
						value : "unfiltered" 
					})
					for (let i = 1; i < doctorSize; ++i) {
						doctorList.push ({
							label : response.data.possibleDoctors[i],
							value : response.data.possibleDoctors[i], 
						})
					}
				}
				

				let clinicList = []
				let clinicSize = 0; 
				if (response.data.possibleClinics !== null) {
					clinicSize = response.data.possibleClinics.length;
				}

				if (clinicSize > 0) {
					clinicList.push ({
						label : "-", 
						value : "unfiltered"
					})
					for (let i = 1; i < clinicSize; ++i) {
						clinicList.push ({
							label : response.data.possibleClinics[i],
							value : response.data.possibleClinics[i]
						})
					}
				}
				

				let typeList = [];
				let typeSize = 0;
				if (response.data.possibleTypes !== null) {
					typeSize = response.data.possibleTypes.length;
				}
				
				if (typeSize > 0) {
					typeList.push ({
						label : "-", 
						value : "unfiltered"
					})
					for (let i = 1; i < typeSize; ++i) {
						typeList.push ({
							label : response.data.possibleTypes[i],
							value : response.data.possibleTypes[i] 
						})
					}
				}
				
				let statusList = [];
				let statusSize = 0;
				if (response.data.possibleStatuses !== null) {
					statusSize = response.data.possibleStatuses.length;
				}
				if (statusSize > 0) {
					statusList.push ({
						label : "-", 
						value : "unfiltered"
					})
					for (let i = 1; i < statusSize; ++i) {
						statusList.push ({
							label: response.data.possibleStatuses[i], 
							value: response.data.possibleStatuses[i], 
						})
					}
				}
				
				this.setState ({
					dates : dateList,
					doctors : doctorList,
					clinics : clinicList, 
					types : typeList, 
					statuses : statusList
				})

			})
			.catch ( response => {
				alert ("Catch!")
				this.setState ({
					reports : [],
					isUpToDate : false
				})
			}
				
			);
		}
		else if (this.props.filter === 'PREDEFINED') {
			let tempClinicFilter = this.state.activeClinicFilter;
			if (window.location.href.split('/').length > 5) {
				// alert ("Clinic id is " + window.location.href.split('/')[5])
				this.setState ({
					activeClinicFilter : window.location.href.split('/')[5]
				})
				tempClinicFilter = window.location.href.split('/')[5];
			}
			axios.get('http://localhost:8080/api/appointments/predefined/doctor=' + this.state.activeDoctorFilter + '/procedure_type=' + this.state.activeTypeFilter + '/clinic=' + tempClinicFilter + '/date=' + this.state.activeDateFilter)
			.then (response => {
				this.setState ({
					reports : response.data.appointmentList,
					isUpToDate : false, 
				})

				let dateList = [];
				let dateSize = response.data.possibleDates.length;
				dateList.push ({
					label : "-",
					value : "unfiltered"
				})
				for (let i = 1; i < dateSize; ++i) {
					dateList.push ({
						label : response.data.possibleDates[i],
						value : response.data.possibleDates[i]
					})
				}

				let doctorList = [];
				let doctorSize = response.data.possibleDoctors.length;
				doctorList.push ({
					label : "-",
					value : "unfiltered" 
				})
				for (let i = 1; i < doctorSize; ++i) {
					doctorList.push ({
						label : response.data.possibleDoctors[i],
						value : response.data.possibleDoctors[i], 
					})
				}

				let clinicList = []
				let clinicSize = response.data.possibleClinics.length;
				clinicList.push ({
					label : "-", 
					value : "unfiltered"
				})
				for (let i = 1; i < clinicSize; ++i) {
					clinicList.push ({
						label : response.data.possibleClinics[i],
						value : response.data.possibleClinics[i]
					})
				}

				let typeList = [];
				let typeSize = response.data.possibleTypes.length;
				typeList.push ({
					label : "-", 
					value : "unfiltered"
				})
				for (let i = 1; i < typeSize; ++i) {
					typeList.push ({
						label : response.data.possibleTypes[i],
						value : response.data.possibleTypes[i] 
					})
				}
				
				this.setState ({
					dates : dateList,
					doctors : doctorList,
					clinics : clinicList, 
					types : typeList
				})
			})
			.catch ( response => {
				this.setState ({
					reports : [],
					isUpToDate : false, 
					// dates : response.data.possibleDates, 
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
		if (this.props.filter === 'PREDEFINED') {
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
		else if (this.props.filter === 'PENDING') {
			axios.get('http://localhost:8080/api/patients/pending/doctor=' + this.state.activeDoctorFilter + '/procedure_type=' + this.state.activeTypeFilter + '/clinic=' + this.state.activeClinicFilter + '/date=' + option.value  + '/status=' + this.state.activeStatusFilter)
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
		else if (this.props.filter === 'NONE') {
			axios.get('http://localhost:8080/api/patients/history/doctor=' + this.state.activeDoctorFilter + '/procedure_type=' + this.state.activeTypeFilter + '/clinic=' + this.state.activeClinicFilter + '/date=' + option.value)
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
	}

	handleDoctorFilter = (option) => {
		if (this.props.filter === 'PREDEFINED') {
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
		else if (this.props.filter === 'PENDING') {
			axios.get('http://localhost:8080/api/patients/pending/doctor=' + option.value + '/procedure_type=' + this.state.activeTypeFilter + '/clinic=' + this.state.activeClinicFilter + '/date=' + this.state.activeDateFilter  + '/status=' + this.state.activeStatusFilter)
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
		else if (this.props.filter === 'NONE') {
			axios.get('http://localhost:8080/api/patients/history/doctor=' + option.value + '/procedure_type=' + this.state.activeTypeFilter + '/clinic=' + this.state.activeClinicFilter + '/date=' + this.state.activeDateFilter)
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
	}

	handleClinicFilter = (option) => {
		if (this.props.filter === 'PREDEFINED') {
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
		else if (this.props.filter === 'PENDING') {
			axios.get('http://localhost:8080/api/patients/pending/doctor=' + this.state.activeDoctorFilter + '/procedure_type=' + this.state.activeTypeFilter + '/clinic=' + option.value + '/date=' + this.state.activeDateFilter + '/status=' + this.state.activeStatusFilter)
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
		else if (this.props.filter === 'NONE') {
			axios.get('http://localhost:8080/api/patients/history/doctor=' + this.state.activeDoctorFilter + '/procedure_type=' + this.state.activeTypeFilter + '/clinic=' + option.value + '/date=' + this.state.activeDateFilter)
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
	}

	handleTypeFilter = (option) => {
		if (this.props.filter === 'PREDEFINED') {
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
		else if (this.props.filter === 'PENDING') {
			axios.get('http://localhost:8080/api/patients/pending/doctor=' + this.state.activeDoctorFilter + '/procedure_type=' + option.value + '/clinic=' + this.state.activeClinicFilter + '/date=' + this.state.activeDateFilter + '/status=' + this.state.activeStatusFilter)
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
		else if (this.props.filter === 'NONE') {
			axios.get('http://localhost:8080/api/patients/history/doctor=' + this.state.activeDoctorFilter + '/procedure_type=' + option.value + '/clinic=' + this.state.activeClinicFilter + '/date=' + this.state.activeDateFilter)
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

	handleStatusFilter = (option) => {
		axios.get('http://localhost:8080/api/patients/pending/doctor=' + this.state.activeDoctorFilter + '/procedure_type=' + this.state.activeTypeFilter + '/clinic=' + this.state.activeClinicFilter + '/date=' + this.state.activeDateFilter + '/status=' + option.value)
		.then (response => {
			this.setState ({
				reports : response.data.appointmentList,
				isUpToDate : false, 
				activeStatusFilter : option.value
			})
		})
		.catch ( response => {
			this.setState ({
				reports : [],
				isUpToDate : false, 
				activeStatusFilter : option.value
			})
		});
	}

	handleClose =  () => {
		this.setState ({
			show : false
		})
	}

	switchFilter () {
		if (this.state.showFilters) {
			this.setState ({
				showFilters : false
			})
		} 
		else {
			this.setState ({
				showFilters : true
			})
		}
	}

	confirmAppointment (row) {
		// alert ("Confirming an appointment " + row.appointmentId)
		axios.post ("http://localhost:8080/api/appointments/confirm", {
			appointmentId : row.appointmentId, 
			patientId : this.state.patientId
		})
		.then (response => {
			this.updateComponent();
		});
	}

	render () {
		
		// When viewing patient history, display a perscription Link;
		// When viewing a pending appointment, display the satus (requested or approved)

		return (
			<div>
				<div class='row d-flex justify-content-center'>
					<div class='col-md-11'>

						<Modal show={this.state.showFilters} onHide={() => this.switchFilter()}> 
							<ModalHeader closeButton>
								Search through appointments
							</ModalHeader>
							<ModalBody>
								<Table>
									<TableRow>
										<FormControl class='text-success'>
											<Select 
												style="width:500px"
												styles={crniFont}
												onChange = {this.handleDateFilter.bind(this)}
												options={this.state.dates}
												placeholder={(this.state.activeDateFilter === 'unfiltered') ? ('-') : (this.state.activeDateFilter)}
											></Select>
											<FormHelperText class='text-success'>Date filter</FormHelperText>
										</FormControl>
									</TableRow>
									<TableRow>
										<FormControl class='text-success'>
											<Select 
												style="width:500px"
												styles={crniFont}
												onChange = {this.handleDoctorFilter.bind(this)}
												options={this.state.doctors}
												placeholder={(this.state.activeDoctorFilter === 'unfiltered') ? ('-') : (this.state.activeDoctorFilter)}
											></Select>
											<FormHelperText class='text-success'>Doctor filter</FormHelperText>
										</FormControl>
									</TableRow>
									<TableRow>
										<FormControl class='text-success'>
											<Select 
												style="width:500px"
												styles={crniFont}
												onChange = {this.handleClinicFilter.bind(this)}
												options={this.state.clinics}
												placeholder={(this.state.activeClinicFilter === 'unfiltered') ? ('-') : (this.state.activeClinicFilter)}
											></Select>
											<FormHelperText class='text-success'>Clinic filter</FormHelperText>
										</FormControl>
									</TableRow>
									<TableRow >
										<FormControl class='text-success'>
											<span id="select_appointment_type"> 
											<Select 
												className="select_type"
												inputId="select_type"
												style="width:500px"
												styles={crniFont}
												onChange = {this.handleTypeFilter.bind(this)}
												options={this.state.types}
												placeholder={(this.state.activeTypeFilter === 'unfiltered') ? ('-') : (this.state.activeTypeFilter)}
											></Select>
											</span>
											<FormHelperText class='text-success'>Appointment type filter</FormHelperText>
										</FormControl>
									</TableRow>
									<TableRow hidden={this.props.filter !== 'PENDING'}>
										<FormControl class='text-success'>
											<Select 
												style="width:500px"
												styles={crniFont}
												onChange = {this.handleStatusFilter.bind(this)}
												options={this.state.statuses}
												placeholder={(this.state.activeStatusFilter === 'unfiltered') ? ('-') : (this.state.activeStatusFilter)}
											></Select>
											<FormHelperText class='text-success'>Status filter</FormHelperText>
										</FormControl>
									</TableRow>
								</Table>
							</ModalBody>
							<ModalFooter>
								<Button id="filter_close" onClick={() => this.switchFilter()}>
									Close
								</Button>
							</ModalFooter>
						</Modal>

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
								<Button id="modal_button_reserve" variant="primary" onClick={this.handleClose}>
									Close
								</Button>
							</Modal.Footer>
						</Modal>

						
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
									<TableCell hidden={(this.props.filter === 'PENDING') ? (false) : (true)}><p class='text-success' hidden={(this.props.filter === 'PENDING') ? (false) : (true)}>Cancel appointment</p></TableCell>
									<TableCell hidden={(this.props.filter === 'PREDEFINED') ? (false) : (true)}><p class='text-success' hidden={(this.props.filter === 'PREDEFINED') ? (false) : (true)}>Room</p></TableCell>
									<TableCell hidden={(this.props.filter === 'PREDEFINED') ? (false) : (true)}><p class='text-success' hidden={(this.props.filter === 'PREDEFINED') ? (false) : (true)}>Price</p></TableCell>
									<TableCell hidden={(this.props.filter === 'PREDEFINED') ? (false) : (true)}><p class='text-success' hidden={(this.props.filter === 'PREDEFINED') ? (false) : (true)}>Discount</p></TableCell>
									<TableCell hidden={(this.props.filter === 'PREDEFINED') ? (false) : (true)}><p class='text-success' hidden={(this.props.filter === 'PREDEFINED') ? (false) : (true)}>Reserve</p></TableCell>
									<TableCell><Button id="button_filter" onClick = {() => this.switchFilter()}>Filter</Button></TableCell>
								</TableRow>
							</TableHead>
								{
									(this.state.reports !== undefined) &&
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
												<TableCell hidden={(this.props.filter === 'PENDING') ? (false) : (true)}><p class='text-white' hidden={(this.props.filter === 'PENDING') ? (false) : (true)}><Button  hidden={row.canCancel} onClick={() => this.handleCancel(row.appointmentId, row.date)}>Cancel</Button></p></TableCell>
												<TableCell hidden={(this.props.filter === 'PREDEFINED') ? (false) : (true)}><p class='text-white' hidden={(this.props.filter === 'PREDEFINED') ? (false) : (true)}>{row.room}</p></TableCell>
												<TableCell hidden={(this.props.filter === 'PREDEFINED') ? (false) : (true)}><p class='text-white' hidden={(this.props.filter === 'PREDEFINED') ? (false) : (true)}>{row.price}</p></TableCell>
												<TableCell hidden={(this.props.filter === 'PREDEFINED') ? (false) : (true)}><p class='text-white' hidden={(this.props.filter === 'PREDEFINED') ? (false) : (true)}><p style={{ color: '#E99002' }}>{row.discount}%</p></p></TableCell>
												<TableCell hidden={(this.props.filter === 'PREDEFINED') ? (false) : (true)}><p class='text-white' hidden={(this.props.filter === 'PREDEFINED') ? (false) : (true)} onClick={() => this.handleReservationClick(row)} > <Button id="button_reserve" disabled={this.state.waiting}>Reserve</Button> </p></TableCell>
												<TableCell>
													<p hidden={row.status !== "Approved"}>
														<Button onClick={() => this.confirmAppointment(row)}>
															Confirm
														</Button>
													</p>
												</TableCell>
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