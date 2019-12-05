import React, {Component}  from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';

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

	render () {
		return (
			<div>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Naziv klinike</TableCell>
							<TableCell>Opis</TableCell>
							<TableCell>Adresa</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>

					</TableBody>
				</Table>
			</div>
		);
	}

}

export default ClinicListing;