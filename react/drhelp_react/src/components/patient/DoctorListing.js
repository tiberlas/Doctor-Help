import React, {Component} from 'react';
import { TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import Table from '@material-ui/core/Table';


class DoctorListing extends Component {

	state = {
		filtered: false
	}

	componentDidMount () {
		let url = window.location.href.split ('/');
		if (url.length === 6) {
			this.setState ({
				filtered: true
			})
		}
	}

	render () {

		return (
			<div class="row d-flex justify-content-center">
                <div class='col-md-10'>
				<h3>{(this.state.filtered) ? ("Izabrani lekari") : ("Svi lekari")}</h3>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell><p class='text-success'>First Name</p></TableCell>
								<TableCell><p class='text-success'>Last Name</p></TableCell>
								<TableCell><p class='text-success'>Name</p></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							
						</TableBody>
					</Table>
				</div>
			</div>
		);
	}

}


export default DoctorListing;