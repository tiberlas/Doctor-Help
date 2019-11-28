import React, {Component} from 'react';
import { PatientContext } from '../../context/PatientContextProvider';
import { Redirect } from 'react-router';



class PatientChangeProfile extends Component {

	static contextType = PatientContext

	state = {
		to_profile: false, 
		id: this.context.patient.id, 
		email: this.context.patient.email,
		firstName: this.context.patient.firstName, 
		lastName: this.context.patient.lastName, 
		address: this.context.patient.address, 
		city: this.context.patient.city, 
		state: this.context.patient.state, 
		phoneNumber: this.context.patient.phoneNumber, 
		birthday: this.context.patient.birthday
	}

	handleSubmit = (event) => {
		event.preventDefault();

		fetch ('http://localhost:8080/api/patients/change', {
			method: "PUT", 
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify ({
				id: this.state.id, 
				email: this.state.email,
				firstName: this.state.firstName, 
				lastName: this.state.lastName, 
				address: this.state.address, 
				city: this.state.city, 
				state: this.state.state, 
				phoneNumber: this.state.phoneNumber, 
				birthday: this.state.birthday
			})
		})
		.then (
			this.props.handleUpdate, 
			this.setState ({to_profile: true})
		);
	}

	handleChange = (event) => {
		let nam = event.target.name;
		let val = event.target.value;
		this.setState({[nam]: val});
	}

	render () {
		if (this.state.to_profile) {
			return (
				<Redirect to='/patients/profile' />
			);
		}
		else {
			return (
				<form onSubmit={this.handleSubmit}>
					<div>
						<span>
							<label>First name: </label>
							<input type='text' name='firstName' value={this.state.firstName} onChange={this.handleChange}/>
						</span>
					</div>
					<div>
						<span>
							<label>Last name: </label>
							<input type='text' name='lastName' value={this.state.lastName} onChange={this.handleChange}/>
						</span>
					</div>
					<div>
						<span>
							<label>Email: </label>
							<input type='text' name='email' value={this.state.email} onChange={this.handleChange}/>
						</span>
					</div>
					<div>
						<span>
							<label>Address: </label>
							<input type='text' name='address' value={this.state.address} onChange={this.handleChange}/>
						</span>
					</div>
					<div>
						<span>
							<label>City: </label>
							<input type='text' name='city' value={this.state.city} onChange={this.handleChange}/>
						</span>
					</div>
					<div>
						<span>
							<label>State: </label>
							<input type='text' name='state' value={this.state.state} onClick={this.handleChange}/>
						</span>
					</div>
					<div>
						<span>
							<label>Phone number: </label>
							<input type='text' name='phoneNumber' value={this.state.phoneNumber} onClick={this.handleChange}/>
						</span>
					</div>
					<div>
                    	<input type='submit' value='submit'/>
                	</div>
				</form>
			);
		}
	}

}

export default PatientChangeProfile;