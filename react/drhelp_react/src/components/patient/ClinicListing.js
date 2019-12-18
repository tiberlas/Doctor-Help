import React, {Component, Fragment}  from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import DropdownToggle from 'react-bootstrap/DropdownToggle';
import DropdownItem from 'react-bootstrap/DropdownItem';


class ClinicListing extends Component {

	state = {
		clinics: []
	}

	componentDidMount () {
		axios.get ('http://localhost:8080/api/clinics/listing')
		.then (response => {
			this.setState ({
				clinics: response.data.clinicList
			})
		})
	}

	generateClinicRows(row) {
        let profileUrl = '/clinic/' + row.id
        return (
            <Fragment>
                <TableCell><Link exact to = {profileUrl} >{row.name}</Link></TableCell>
				<TableCell><p class='text-white'>{row.address}</p></TableCell>
				<TableCell><p class='text-white'>{row.description}</p></TableCell>
             </Fragment>
        )
    }

	render () {
		let size = this.state.clinics.length
		return (
			<div class="row d-flex justify-content-center">
                <div class='col-md-10'>
				
  



               <Dropdown>

					<DropdownToggle>
						Glavni tekst
					</DropdownToggle>

				   <DropdownMenu>
					   <DropdownItem>
						   Tekst 1
					   </DropdownItem>
					   <DropdownItem>
						   Tekst 2
					   </DropdownItem>
					   <DropdownItem>
						   Tekst 3
					   </DropdownItem>
				   </DropdownMenu>
			   </Dropdown>

				<Table>
					<TableHead>
						<TableRow>

							<TableCell><p class='text-success'>Clinic Name</p></TableCell>
							<TableCell><p class='text-success'>Address</p></TableCell>
							<TableCell><p class='text-success'>Description</p></TableCell>


						</TableRow>
					</TableHead>
					<TableBody>
						{size > 0 ? this.state.clinics.map (row => (
							<TableRow key={row.id}>
								{this.generateClinicRows(row)}
							</TableRow>
						)) : <h3> No results found. :( </h3> }

					</TableBody>
				</Table>
			</div>
			</div>
		);
	}

}

export default ClinicListing;