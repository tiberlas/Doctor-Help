import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import { PatientContext } from '../../context/PatientContextProvider';


class PatientProfile extends Component {

	static contextType = PatientContext;

	render () {
		return (
			<div>
				<div>
					<span>
						<label>First name: </label>
						<label>{this.context.patient.firstName}</label>
					</span>
				</div>
				<div>
					<span>
						<label>Last name: </label>
						<label>{this.context.patient.lastName}</label>
					</span>
				</div>
				<div>
					<span>
						<label>Email: </label>
						<label>{this.context.patient.email}</label>
					</span>
				</div>
				<div>
					<span>
						<label>Address: </label>
						<label>{this.context.patient.address}</label>
					</span>
				</div>
				<div>
					<span>
						<label>City: </label>
						<label>{this.context.patient.city}</label>
					</span>
				</div>
				<div>
					<span>
						<label>State: </label>
						<label>{this.context.patient.state}</label>
					</span>
				</div>
				<div>
					<span>
						<label>Phone number: </label>
						<label>{this.context.patient.state}</label>
					</span>
				</div>
				<div>
					<span>
						<label>Birthday: </label>
						<label>{this.context.patient.birthday}</label>
					</span>
				</div>
				<div>
					<span>
						<label>Insurance Number: </label>
						<label>{this.context.patient.insuranceNumber}</label>
					</span>
				</div>
				<div>
					<NavLink to = '/patient/profile/change'>
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