import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import { PatientContext } from '../../context/PatientContextProvider';
import ViewProfile from '../ViewProfile';


class PatientProfile extends Component {

	static contextType = PatientContext;

	render () {
		return (
			<div>
				<ViewProfile profile={this.context.patient}/>
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