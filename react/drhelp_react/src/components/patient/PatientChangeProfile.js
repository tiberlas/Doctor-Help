import React, {Component} from 'react';
import { PatientContext } from '../../context/PatientContextProvider';
import { Redirect } from 'react-router-dom';
import axios from 'axios';



class PatientChangeProfile extends Component {

	static contextType = PatientContext

	state = {
		to_profile: false, 
		id: this.context.patient.id, 
		firstName: this.context.patient.firstName, 
		lastName: this.context.patient.lastName, 
		address: this.context.patient.address, 
		city: this.context.patient.city, 
		state: this.context.patient.state, 
		phoneNumber: this.context.patient.phoneNumber, 
		birthday: this.context.patient.birthday, 
	}

	handleSubmit = async (event) => {
		event.preventDefault();


		axios.put ('http://localhost:8080/api/patients/change', {
			
				id: this.context.patient.id, 
				email: this.context.patient.email,
				firstName: document.getElementById('tb_firstName').value, 
				lastName: document.getElementById('tb_lastName').value, 
				address: document.getElementById('tb_address').value, 
				city: document.getElementById('tb_city').value, 
				state: document.getElementById('tb_state').value, 
				phoneNumber: document.getElementById('tb_phoneNumber').value, 
				birthday: this.context.patient.birthday, 
				insuranceNumber: this.context.patient.insuranceNumber
			
		})
		.then(response => {
            console.log('odgovor');
            console.log(response);
        })
		.then (
			this.props.updateData,
			this.setState ({
				to_profile: true
			})
		); 
	}

	handleChange = (event) => {
		let nam = event.target.name;
		let val = event.target.value;
		this.setState({[nam]: val});
	}

	render () {
		this.bul = false;

		if (this.state.to_profile === true) {
			//alert ('To profile is true');
			return (
				<Redirect to ='/patient/profile' />
			);
		}
		else {
			return (
				<form onSubmit={this.handleSubmit}>
					<div>
						<span>
							<label>First name: </label>
							<input type='text' name='firstName' id='tb_firstName' value={this.state.firstName} onChange={this.handleChange}/>
						</span>
					</div>
					<div>
						<span>
							<label>Last name: </label>
							<input type='text' name='lastName' id='tb_lastName' value={this.state.lastName} onChange={this.handleChange}/>
						</span>
					</div>
					<div>
						<span>
							<label>Address: </label>
							<input type='text' name='address' id='tb_address' value={this.state.address} onChange={this.handleChange}/>
						</span>
					</div>
					<div>
						<span>
							<label>City: </label>
							<input type='text' name='city' id='tb_city' value={this.state.city} onChange={this.handleChange}/>
						</span>
					</div>
					<div>
						<span>
							<label>State: </label>
							<input type='text' name='state' id='tb_state' value={this.state.state} onClick={this.handleChange}/>
						</span>
					</div>
					<div>
						<span>
							<label>Phone number: </label>
							<input type='text' name='phoneNumber' id='tb_phoneNumber' value={this.state.phoneNumber} onClick={this.handleChange}/>
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