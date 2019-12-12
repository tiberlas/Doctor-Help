import React, {Component} from 'react';
import { TableHead, TableRow, TableBody } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';


class PerscriptionOverview extends Component {

	render () {
		return (
			<div>
				<h3>Perscription Name</h3>
				<h5>Perscription description:</h5>
				<p>Lorem ipsum lorem ipsum</p>
				<h5>Advice:</h5>
				<p>Lorem ipsum lorem ipsum</p>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell><p class='text-success'>Medication Name</p></TableCell>
							<TableCell><p class='text-success'>Medication Description</p></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell>PLACEHONDER</TableCell>
							<TableCell>PLACEHONDER</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>PLACEHONDER</TableCell>
							<TableCell>PLACEHONDER</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>PLACEHONDER</TableCell>
							<TableCell>PLACEHONDER</TableCell>
						</TableRow>
					</TableBody>
				</Table>

			</div>
		)
	}
 
}


export default PerscriptionOverview;