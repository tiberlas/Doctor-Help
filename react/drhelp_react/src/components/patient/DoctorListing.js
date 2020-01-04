import React, {Component, Fragment} from 'react';
import { TableHead, TableBody, TableRow, TableCell, MenuItem } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Dropdown, Button } from 'react-bootstrap';
import DropdownToggle from 'react-bootstrap/DropdownToggle';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import { UserContext } from '../../context/UserContextProvider';


class DoctorListing extends Component {

	state = {
		filtered: false, 
		doctors: [], 
		
	}

	static contextType = UserContext;

	componentDidMount () {
		let url = window.location.href.split ('/');
		// alert ('Filter: ' + url[5] + '; Date: ' + url[6]);
		let request = 'http://localhost:8080/api/doctors/listing';
		request += '/' + url[4];
		request += '/' + url[5];
		request += '/' + url[6];
		if ((url[5] !== 'unfiltered') && (url[6] !== 'unfiltered')) {
			this.setState ({
				filtered : true
			});
		}
		axios.get (request)
		.then (response => {
			this.setState ({
				doctors: response.data
			})
		})
	}

	handleSubmit (row) {
		if (row.selectedTime === undefined) {
			alert ("Please specify a timepoint")
		} 
		else {
			// alert ("Rezervisem kod " + row.firstName + " u " + row.selectedTime)
			axios.post ('http://localhost:8080/api/appointments/add', {
				doctorId : row.id, 
				date: window.location.href.split('/')[6], 
				time: row.selectedTime, 
				patientId : this.context.user.id
			}) 
		}
	}

	handleSelect (row, time) {
		row.selectedTime = time;
	}

	generateDoctorRows (row) {
		let profileUrl = '/doctor/profile/'

		return (
			<Fragment>
				<TableCell><Link exact to = {profileUrl + row.id}>{row.firstName}</Link></TableCell>
				<TableCell><p class='text-white'>{row.lastName}</p></TableCell>
				<TableCell><p class='text-white'>{row.rating}</p></TableCell>
				<TableCell hidden={(this.state.filtered) ? (false) : (true)}>
					<Dropdown>
						<DropdownToggle >
							Termini
						</DropdownToggle>
						<DropdownMenu>
							{
								row.terms.map (term => (
									<MenuItem onClick={() => this.handleSelect(row, term)}>{term}</MenuItem>
								))
							}
						</DropdownMenu>
					</Dropdown>
				</TableCell>
				<TableCell hidden={(this.state.filtered) ? (false) : (true)} >
					<Button onClick={() => this.handleSubmit(row)}>
						Potvrdi
					</Button>
				</TableCell>
			</Fragment>
		)
	}

	render () {

		let size = this.state.doctors.length;

		return (
			<div class="row d-flex justify-content-center">
                <div class='col-md-10'>
				<h3>{(this.state.filtered) ? ("Filtered doctors") : ("All doctors")}</h3>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell><p class='text-success'>First Name</p></TableCell>
								<TableCell><p class='text-success'>Last Name</p></TableCell>
								<TableCell><p class='text-success'>Rating</p></TableCell>
								<TableCell><p class='text-success' hidden={(this.state.filtered) ? (false) : (true)}>Termini</p></TableCell>
								<TableCell><p class='text-success' hidden={(this.state.filtered) ? (false) : (true)}>Potvrda</p></TableCell>
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