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
import { MenuItem} from '@material-ui/core';


class ClinicListing extends Component {

	state = {
		clinics: [], 
		activeFilter: 'unfiltered', 
		appointmentTypes: [],
		selectedDate: 'unfiltered'
	}

	componentDidMount () {
		axios.get ('http://localhost:8080/api/clinics/listing/unfiltered/unfiltered')
		.then (response => {
			this.setState ({
				clinics : response.data.clinicList, 
				appointmentTypes : response.data.procedureType, 
				activeFilter  : response.data.procedureTypeString, 
				selectedDate : response.data.dateString
			})
		})
	}

	generateClinicRows(row) {
		let profileUrl;
		if ((this.state.activeFilter !== '') && (this.state.activeFilter !== 'unfiltered')) {
			profileUrl = '/clinic/' + row.id + '/' + this.state.activeFilter;
		} else {
			profileUrl = '/clinic/' + row.id + '/unfiltered';
		}
		profileUrl += '/' + this.state.selectedDate;
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

	handleFilterType (text)  {
		text = text.replace (' ', '_');
		let element = document.getElementById ("picker");
		let value = element.value;
		if (value === "") {
			value = 'unfiltered'
		}

		this.setState ({
			selectedDate : value,
			activeFilter : text
		})

		this.fetchData (text, value);
	}

	toggleMenu = () => {
		if(!this.state.visible){
		  this.setState({ visible: true, hide: true });
		} else {
		  this.setState({ visible: false, hide: false});
		}
	  }

	handleFilterDate () {
		this.toggleMenu();
		let element = document.getElementById ("picker");
		let value = element.value;
		let text = this.state.activeFilter;
		// text = text.replace (' ', '_');
		
		// alert ("Filter date: " + value + "; Filter type: " + text);
		
		this.setState ({
			selectedDate : value,
			activeFilter : text
		})

		this.fetchData(text, value)

	}

	fetchData (dil, dat) {
		let requestPartOne = 'http://localhost:8080/api/clinics/listing/';
		let requestPartTwo = dil + '/' + dat;
		let wholeRequest = requestPartOne + requestPartTwo;
		// alert (requestPartOne + requestPartTwo);
		axios.get (wholeRequest)
		.then (response => {
			this.setState ({
				clinics: response.data.clinicList, 
				appointmentTypes: response.data.procedureType, 
			})
		})
	}

	

	render () {
		let size = this.state.clinics.length;
		let numberOfTypes = this.state.appointmentTypes.length;
		return (
			<div class="row d-flex justify-content-center">
                <div class='col-md-10'>
					
					
					

					<Table>
						<TableHead>
							<TableRow>
								<TableCell></TableCell>
								<TableCell></TableCell>
								<TableCell></TableCell>
								<TableCell></TableCell>
								<TableCell>
									<form>
										<FormControl id="picker" type="date" onChange={() => this.handleFilterDate ()}></FormControl>
									</form>
								</TableCell>
								<TableCell>
									<Dropdown id = "dropdown_id" class='success' onFocus='this.toggleMenu' >
										<DropdownToggle id="dropdown-basic" >
											{(this.state.activeFilter === 'unfiltered') ? ("Procedure types"): (this.state.activeFilter.replace('_', ' '))}
										</DropdownToggle>
										<DropdownMenu>
											<MenuItem onClick={() => this.handleFilterType ('unfiltered')}>-</MenuItem>
											{
												numberOfTypes > 0 ? this.state.appointmentTypes.map (row => (
													<MenuItem onClick={() => this.handleFilterType (row)}>{row}</MenuItem>
												)) : null
											}
										</DropdownMenu>
									</Dropdown>
								</TableCell>
							</TableRow>
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