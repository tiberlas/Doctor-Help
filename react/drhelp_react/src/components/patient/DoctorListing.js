import React, {Component, Fragment} from 'react';
import { TableHead, TableBody, TableRow, TableCell, MenuItem } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Dropdown, Button } from 'react-bootstrap';
import DropdownToggle from 'react-bootstrap/DropdownToggle';
import DropdownMenu from 'react-bootstrap/DropdownMenu';


class DoctorListing extends Component {

	state = {
		filtered: false, 
		doctors: []
	}

	componentDidMount () {
		let url = window.location.href.split ('/');
		let request = 'http://localhost:8080/api/doctors/listing/';
		if (url.length === 6) {
			request += url[4] + '/' + url[5];
			this.setState ({
				filtered: true
			})
		} else {
			request += url[4] + '/unfiltered';
			this.setState ({
				fintered: false
			})
		}
		//alert (request);
		axios.get (request)
		.then (response => {
			this.setState ({
				doctors: response.data
			})
		})
	}

	generateDoctorRows (row) {
		let profileUrl = '/doctor/profile/'

		return (
			<Fragment>
				<TableCell><Link exact to = {profileUrl + row.id}>{row.firstName}</Link></TableCell>
				<TableCell><p class='text-white'>{row.lastName}</p></TableCell>
				<TableCell><p class='text-white'>{row.rating}</p></TableCell>
				<TableCell>
					<Dropdown>
						<DropdownToggle>
							Meni
						</DropdownToggle>
						<DropdownMenu>
							<MenuItem>1</MenuItem>
							<MenuItem>2</MenuItem>
							<MenuItem>3</MenuItem>
							<MenuItem>4</MenuItem>
						</DropdownMenu>
					</Dropdown>
				</TableCell>
				<TableCell>
					<Button>
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