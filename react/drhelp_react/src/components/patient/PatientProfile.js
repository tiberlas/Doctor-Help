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
				<div class="row d-flex justify-content-center">
					<div class='col-md-7'>
						<div >
                    		<label class="badge badge-success text-right">Insurance Number:</label>&nbsp;&nbsp;&nbsp;
                    		<label >{this.context.patient.insuranceNumber}</label>
                		</div>
						<div>
							<NavLink to = '/patient/health-record'>
								Health Record
							</NavLink>
						</div>
						<div>
							<NavLink to = '/patient/history'>
								Patient History
							</NavLink>
						</div>
						<div>
							<NavLink to = '/patient/profile/change'>
								Change profile
							</NavLink>
						</div>
						<div>
							<NavLink to = '/patient/password/change'>
								Change password
							</NavLink>
						</div>
                	</div>
            	</div>
			</div>
		);
	}

}

export default PatientProfile;