import React, {Component, Fragment}  from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Dropdown, FormControl } from 'react-bootstrap';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import DropdownToggle from 'react-bootstrap/DropdownToggle';
import DropdownItem from 'react-bootstrap/DropdownItem';
import { MenuItem, Menu } from '@material-ui/core';


class ClinicListing extends Component {

	state = {
		clinics: [], 
		activeFilter: '', 
		appointmentTypes: []
	}

	componentDidMount () {
		axios.get ('http://localhost:8080/api/clinics/listing/unfiltered')
		.then (response => {
			this.setState ({
				clinics: response.data.clinicList, 
				appointmentTypes: response.data.procedureType
			})
		})
	}

	generateClinicRows(row) {
		let profileUrl;
		if ((this.state.activeFilter !== '') && (this.state.activeFilter !== 'unfiltered')) {
			profileUrl = '/clinic/' + row.id + '/' + this.state.activeFilter;
		} else {
			profileUrl = '/clinic/' + row.id;
		}
		return (
            <Fragment>
                <TableCell><Link exact to = {profileUrl} >{row.name}</Link></TableCell>
				<TableCell><p class='text-white'>{row.address}</p></TableCell>
				<TableCell><p class='text-white'>{row.city}</p></TableCell>
				<TableCell><p class='text-white'>{row.state}</p></TableCell>
				<TableCell><p class='text-white'>{row.rating}</p></TableCell>
				<TableCell><p class='text-white'>{row.price}</p></TableCell>
             </Fragment>
        )
    }

	handleFilter (text) {
		text = text.replace (' ', '_');
		axios.get ('http://localhost:8080/api/clinics/listing/' + text)
		.then (response => {
			this.setState ({
				clinics: response.data.clinicList, 
				appointmentTypes: response.data.procedureType, 
				activeFilter: text
			})
			if (this.state.activeFilter === 'unfiltered') {
				this.setState ({
					activeFilter: ''
				})
			}
		})
	}

	handleFiltering () {
		alert ("Filtering")
	}

	render () {
		let size = this.state.clinics.length;
		let numberOfTypes = this.state.appointmentTypes.length;
		return (
			<div class="row d-flex justify-content-center">
                <div class='col-md-10'>
					<Dropdown id = "dropdown_id" class='success'>
							<DropdownToggle id="dropdown-basic" >
								Appointment types
							</DropdownToggle>
							<DropdownMenu>
								<MenuItem onClick={() => this.handleFilter ('unfiltered')}>-</MenuItem>
								{
									numberOfTypes > 0 ? this.state.appointmentTypes.map (row => (
										<MenuItem onClick={() => this.handleFilter (row)}>{row}</MenuItem>
									)) : null
								}
							</DropdownMenu>
					</Dropdown>

					<form>
						<FormControl type="date" onChange={() => this.handleFiltering ()}></FormControl>
					</form>

					<Table>
						<TableHead>
							<TableRow>
								<TableCell><p class='text-success'>Clinic Name</p></TableCell>
								<TableCell><p class='text-success'>Address</p></TableCell>
								<TableCell><p class='text-success'>City</p></TableCell>
								<TableCell><p class='text-success'>State</p></TableCell>
								<TableCell><p class='text-success'>Rating</p></TableCell>
								<TableCell><p class='text-success'>Price</p></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{
								size > 0 ? this.state.clinics.map (row => (
									<TableRow key={row.id}>
										{this.generateClinicRows(row)}
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

export default ClinicListing;