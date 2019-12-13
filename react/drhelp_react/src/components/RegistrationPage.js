import React from 'react';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import Axios from 'axios';
import { Link } from 'react-router-dom';

class RegistrationPage extends React.Component {

	constructor () {
    	super()
    	this.state = { 
			iHaveWaited: false, 
			same_password: true 
		}
  	}


	handleRegister = async (event) => {
		this.setState ({
			same_password: true
		})
		event.preventDefault();

		let pass1 = document.getElementById ('tb_pass1').value;
		let pass2 = document.getElementById ('tb_pass2').value;
		if (pass1 !== pass2) {
			this.setState ({
				same_password: false
			})
			//alert ("Both instances of the password must be the same");
			return;
		}

							
		let email = document.getElementById ('tb_email').value;
		let pass = document.getElementById ('tb_pass1').value;
		let name = document.getElementById ('tb_name').value;
		let last_name = document.getElementById ('tb_last_name').value;
		let address = document.getElementById ('tb_address').value;
		let town = document.getElementById ('tb_town').value;
		let country = document.getElementById ('tb_country').value;
		let phone = document.getElementById ('tb_phone').value;
		let insurance = document.getElementById ('tb_insurance').value;
		let birthday = document.getElementById('tb_birthday').value;

		if (Number.isInteger(insurance)){
			alert ('Insurance number must be an integer!');
			return;
		}
		if (insurance.includes("-") || insurance.includes("+")) {
			alert ("Insurance number can't have a sign!");
			return;
		}

		fetch ('http://localhost:8080/api/register', {
			method: 'post', 
			headers: {'Content-Type' : 'application/json'}, 
			body: JSON.stringify ({
				email: email, 
				password: pass, 
				firstName: name, 
				lastName: last_name, 
				address: address, 
				city: town, 
				state: country, 
				phoneNumber: phone, 
				insuranceNumber: insurance, 
				birthday: birthday
			})
		})
		.then (data => data.json ())
		.then (function (data) {
			alert (data.response)
		});		
	}



	render () {
		return (
			<div class='row d-flex justify-content-center'>
				<div class='col-md-3'> 
					<br/>
					<form onSubmit={this.handleRegister}>
						<br/>
						<br/>
						<br/>
						<h2 class='text-success'>Register</h2>
						<br/>
						
						<FormControl required type="email" placeholder="Email" id="tb_email"/>
						<FormControl required type="password" placeholder="Password" id="tb_pass1"/>
						<FormControl required type="password" placeholder="Repeat password" id="tb_pass2" className={`form-control ${!this.state.same_password? 'is-invalid': ''}`}/>
						<div class="invalid-feedback">Both instances of the password must be same. </div>
						<FormControl required type="text" placeholder="First name" id="tb_name"/>
						<FormControl required type="text" placeholder="Last name" id="tb_last_name"/>
						<FormControl required type="text" placeholder="Address" id="tb_address"/>
						<FormControl required type="text" placeholder="Town" id="tb_town"/>
						<FormControl required type="text" placeholder="Country" id="tb_country"/>
						<FormControl required type="text" placeholder="Phone number" id="tb_phone"/>
						<FormControl required type="text" placeholder="Insurance number" id="tb_insurance"/>
						<FormControl required type="date" placeholder="Date of birth, in format: dd/mm/yyyy" id="tb_birthday"/>
						
						<div class="form-group row">
							<div class='col-md text-left'>
								<input type="submit" value="Submit" class='btn btn-success'></input>
							</div>
							<div class='col-md text-right'>
								<Link to="/login">
									<a href>Login</a>
								</Link>
							</div>
						</div>
					</form>
				</div>
			</div>
		)
	}

} export default RegistrationPage


