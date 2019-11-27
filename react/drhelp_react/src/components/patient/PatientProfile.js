import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import { PatientContext } from '../../context/PatientContextProvider';
import { ClinicAdminContext } from '../../context/ClinicAdminContextProvider';


class PatientProfile extends Component {

	static contextType = ClinicAdminContext;

	render () {
		return (
			<div>
				<p>
					Patient profile
				</p>
				<div>
					<span>
						<label>First name: </label>
						<label></label>
					</span>
				</div>
				<div>
					<span>
						<label>Last name: </label>
						<label></label>
					</span>
				</div>
				<div>
					<span>
						<label>Email: </label>
						<label></label>
					</span>
				</div>
				<div>
					<span>
						<label>Address: </label>
						<label></label>
					</span>
				</div>
				<div>
					<span>
						<label>City: </label>
						<label></label>
					</span>
				</div>
				<div>
					<span>
						<label>State: </label>
						<label></label>
					</span>
				</div>
				<div>
					<span>
						<label>Phone number: </label>
						<label></label>
					</span>
				</div>
				<div>
					<span>
						<label>Birthday: </label>
						<label></label>
					</span>
				</div>
				<div>
					<span>
						<label>Insurance Number: </label>
						<label></label>
					</span>
				</div>
				<div>
					<NavLink to = '/clinic+administrator/profile/change'>
						Change profile
					</NavLink>
				</div>
				<div>
					<NavLink to = '/clinic+administrator/profile/change'>
						Change password
					</NavLink>
				</div>
			</div>
		);
	}

}

export default PatientProfile;