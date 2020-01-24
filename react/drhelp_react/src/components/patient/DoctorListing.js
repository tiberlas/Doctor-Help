import React, {Component, Fragment} from 'react';
import { TableHead, TableBody, TableRow, TableCell, MenuItem } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import { Dropdown, Button, Row } from 'react-bootstrap';
import DropdownToggle from 'react-bootstrap/DropdownToggle';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import { UserContext } from '../../context/UserContextProvider';
import ViewClinic from './ViewClinic';
import FormControl from '@material-ui/core/FormControl';
import Select from 'react-select'
import { Modal } from 'react-bootstrap';


class DoctorListing extends Component {

	state = {
		filtered: false, 
		doctors: [], 
		showDialog : false, 
		showMissing : false, 
		selectedRow : [], 
		appointmentType : "", 
		selectedDate : "", 
		clinicName: "", 
		clinicAddress : "", 
		showFinished : false, 
		redirect : false
	}

	static contextType = UserContext;

	componentDidMount () {
		let url = window.location.href.split ('/');

		let request = 'http://localhost:8080/api/doctors/listing';
		request += '/clinic=' + url[4];
		request += '&appointment=' + url[5];
		request += '&date=' + url[6];
		if ((url[5] !== 'unfiltered') && (url[6] !== 'unfiltered')) {
			this.setState ({
				filtered : true
			});
		}
		axios.get (request)
		.then (response => {
			this.setState ({
				doctors: response.data.doctorListing, 
				clinicName : response.data.clinicName, 
				clinicAddress : response.data.address
			})
		})
		this.setState ({
			appointmentType : window.location.href.split('/')[5], 
			selectedDate : window.location.href.split('/')[6]
		})
	}

	handleUpdate () {
		let url = window.location.href.split ('/');

		let request = 'http://localhost:8080/api/doctors/listing';
		request += '/clinic=' + url[4];
		request += '&appointment=' + url[5];
		request += '&date=' + url[6];
		if ((url[5] !== 'unfiltered') && (url[6] !== 'unfiltered')) {
			this.setState ({
				filtered : true
			});
		}
		axios.get (request)
		.then (response => {
			this.setState ({
				doctors: response.data.doctorListing, 
				clinicName : response.data.clinicName, 
				clinicAddress : response.data.address
			})
		})
		this.setState ({
			appointmentType : window.location.href.split('/')[5], 
			selectedDate : window.location.href.split('/')[6]
		})
	}

	handleSubmit (row) {
		if (row.selectedTime === undefined) {
			this.setState ({
				showMissing : true
			})
		} 
		else {
			axios.post ('http://localhost:8080/api/appointments/add', {
				doctorId : row.id, 
				date: window.location.href.split('/')[6], 
				time: row.selectedTime, 
				patientId : this.context.user.id
			})
			.then (response => {
				this.setState ({
					showFinished : true
				})
				//this.handleUpdate();
				alert (response.data)
			});
		}
	}

	handleSelect (row, time) {
		// alert (time.value)
		row.selectedTime = time.value;
		// let tekst = document.getElementById (row.id);
		// tekst.setValue("row.selectedTime")
	}

	handleRequest (row) {
		if (row.selectedTime === undefined) {
			// alert ("Undefined")
			this.setState ({
				showMissing : true
			})
			return;
		}
		this.setState ({
			selectedRow : row, 
		})
		this.setState ({
			showDialog : true
		})
	}

	generateDoctorRows (row) {
		let profileUrl = '/doctor/profile/'

		let hide = false;
		if (row.terms.length === 0) {
			hide = true;
		}
		
		return (
			<Fragment>
				<TableCell hidden={hide}><Link exact to = {profileUrl + row.id}>{row.firstName}</Link></TableCell>
				<TableCell hidden={hide}><p class='text-white'>{row.lastName}</p></TableCell>
				<TableCell hidden={hide}><p class='text-white'>{row.rating}</p></TableCell>
				<TableCell hidden={((this.state.filtered) ? (false) : (true)) || hide}>
					<FormControl class='text-black'>
						<Select 
							style="width:500px"
							onChange = {this.handleSelect.bind(this, row)}
							options={row.terms.map(term => ({ label: term, value: term }))}
						></Select>
					</FormControl>
				</TableCell>
				<TableCell hidden={((this.state.filtered) ? (false) : (true)) || hide} >
					<Button onClick={() => this.handleRequest(row)}>
						Request
					</Button>
				</TableCell>
			</Fragment>
		)
	}

	closeDialog () {
		this.setState ({
			showDialog : false
		})
		
		this.handleSubmit(this.state.selectedRow);
	}

	closeMissingDialog () {
		this.setState ({
			showMissing : false
		})
	}

	closeFinishedDialog () {
		this.setState ({
			showFinished : false, 
			redirect : true
		})
	}

	quitDialog () {
		this.setState ({
			showDialog : false
		})
	}

	quitFinishedDialog () {
		this.setState ({
			showFinished : false, 
		})
	}

	render () {

		let size = this.state.doctors.length;

		return (
			

			<div class="row d-flex justify-content-center">
                <div class='col-md-10'>

					{
						this.state.redirect && 
						<Redirect to='/patient/appointmentList' from='/clinic/'/>
					}

					
					<Modal show={this.state.showDialog} onHide={() => this.quitDialog()}>
						<Modal.Header closeButton>
							<Modal.Title>Confirm appointment request:</Modal.Title>
						</Modal.Header>

						<Modal.Body>
							<Table>
								<TableRow>
									<TableCell>
										Appointment type:
									</TableCell>
									<TableCell>
										{this.state.appointmentType.replace ('_', ' ')}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>
										Clinic:
									</TableCell>
									<TableCell>
										{this.state.clinicName}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>
										Adddress:
									</TableCell>
									<TableCell>
										{this.state.clinicAddress}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>
										Doctor:
									</TableCell>
									<TableCell>
										{this.state.selectedRow.lastName + " dr " + this.state.selectedRow.firstName}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>
										Date:
									</TableCell>
									<TableCell>
										{this.state.selectedDate.split('-')[2] + "." + this.state.selectedDate.split('-')[1] + "." + this.state.selectedDate.split('-')[0] + "."}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>
										Time:
									</TableCell>
									<TableCell>
										{this.state.selectedRow.selectedTime}
									</TableCell>
								</TableRow>
							</Table>
							<p>
								<br/>
								You are about to request this appointment. 
							</p>
							{/* <a href="https://www.youtube.com/watch?v=1Bix44C1EzY" target="blank">Congratulations!!!1!</a> */}
						</Modal.Body>

						<Modal.Footer>
							<Button variant="primary" onClick={() => this.closeDialog()}>
								Confirm
							</Button>
						</Modal.Footer>
					</Modal>

					<Modal show={this.state.showMissing} onHide={() => this.closeMissingDialog()}>
						<Modal.Header closeButton>
							<Modal.Title>Error!</Modal.Title>
						</Modal.Header>

						<Modal.Body>
							<p>Please choose a time for your appointment</p>
						</Modal.Body>

						<Modal.Footer>
							<Button variant="primary" onClick={() => this.closeMissingDialog()}>
								Close
							</Button>
						</Modal.Footer>
					</Modal>

					<Modal show={this.state.showFinished} onHide={() => this.quitFinishedDialog()}>
						<Modal.Header closeButton>
							<Modal.Title>Request has been sent!</Modal.Title>
						</Modal.Header>

						<Modal.Body>
							<a href="https://www.youtube.com/watch?v=1Bix44C1EzY" target="blank">Congratulations!!!1!</a>
						</Modal.Body>

						<Modal.Footer>
							<Button variant="primary" onClick={() => this.closeFinishedDialog()}>
								Close
							</Button>
						</Modal.Footer>
					</Modal>

				<div hidden={this.state.filtered}>
					<ViewClinic hidden={this.state.filtered}></ViewClinic>
				</div>

				<h3>{(this.state.filtered) ? ("Filtered doctors") : ("All doctors")}</h3>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell><p class='text-success'>First Name</p></TableCell>
								<TableCell><p class='text-success'>Last Name</p></TableCell>
								<TableCell><p class='text-success'>Rating</p></TableCell>
								<TableCell hidden={(this.state.filtered) ? (false) : (true)}><p class='text-success'>Terms</p></TableCell>
								<TableCell hidden={(this.state.filtered) ? (false) : (true)}><p class='text-success'>Confirm</p></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{
								size > 0 ? this.state.doctors.map (row => (
									<TableRow key = {row.id}>
										{this.generateDoctorRows (row)}
									</TableRow>
								)) : <h3> No results found. :( </h3>
							}
						</TableBody>
					</Table>
				</div>
			</div>
		);
	}

}


export default DoctorListing;