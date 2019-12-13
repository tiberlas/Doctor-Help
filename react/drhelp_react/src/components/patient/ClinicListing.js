import React, {Component}  from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import {Link} from 'react-router-dom';
//import Dropdown from 'react-dropdown'; 

class ClinicListing extends Component {

	state = {
		clinics: []
	}

	componentDidMount () {
		axios.get ('http://localhost:8080/api/clinics/listing')
		.then (response => {
			this.setState ({
				clinics: response.data
			})
		})
	}

	generatePatientRows(row) {
        let profileUrl = '/profile/' + row.insuranceNumber
        return (
            <Fragment>
                <TableCell><Link exact to = {profileUrl} >{row.insuranceNumber}</Link></TableCell>
                <TableCell><p class='text-white'>{row.firstName}</p></TableCell>
                <TableCell><p class='text-white'>{row.lastName}</p></TableCell>
                <TableCell><p class='text-white'>{row.email}</p></TableCell>
                <TableCell></TableCell>
             </Fragment>
        )
    }

	render () {
		return (
			<div>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell><p class='text-success'>Clinic name</p></TableCell>
							<TableCell><p class='text-success'>Adress</p></TableCell>
							<TableCell><p class='text-success'>Description</p></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{this.state.clinics.map (row => (
							<TableRow key={row.id}>
								<TableCell><Link >{row.name}</Link></TableCell>
								<TableCell><p class='text-white'>{row.address}</p></TableCell>
								<TableCell><p class='text-white'>{row.description}</p></TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		);
	}

}

export default ClinicListing;