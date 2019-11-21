import React from 'react';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';

import DatePicker from 'react-datepicker';


class RegistrationPage extends React.Component {

	validate () {
		/*
		let pass1 = document.getElementById ('tb_pass1').value;
		let pass2 = document.getElementById ('tb_pass2').value;
		if (pass1 !== pass2) {
			alert ("Both instances of the password must be the same");
			return;
		}
*/
		var dateInput = document.getElementById ('tb_birthday');
		var dateSegments = dateInput.split ('/');
		if (dateSegments.len < 3) {
			alert ("The date of birth must be in format: dd/mm/yyyy");
		}
	}
	
	handleRegister = () => {
		this.validate ();

		let email = document.getElementById ('tb_email').value;
		let pass = document.getElementById ('tb_pass1')
		let name = document.getElementById ('tb_name').value;
		let last_name = document.getElementById ('tb_last_name').value;
		let address = document.getElementById ('tb_address').value;
		let town = document.getElementById ('tb_town').value;
		let country = document.getElementById ('tb_country').value;
		let phone = document.getElementById ('tb_phone').value;
		let insurance = document.getElementById ('tb_insurance').value;

		fetch ('http://localhost:8080/api/register', {
			method: 'post', 
			headers: {'Content-Type' : 'application/json'}, 
			body: JSON.stringify ({
				email: email, 
				password: pass, 
				first_name: name, 
				last_name: last_name, 
				address: address, 
				town: town, 
				country: country, 
				phone: phone, 
				insurance: insurance
			})
		});
	}

	render () {
		return (
			<div>
				<Form>
					{/*
					<FormControl required type="text" placeholder="Email" id="tb_email"/>
					<FormControl required type="password" placeholder="Password" id="tb_pass1"/>
					<FormControl required type="password" placeholder="Repeat password" id="tb_pass2"/>
					<FormControl required type="text" placeholder="First name" id="tb_name"/>
					<FormControl required type="text" placeholder="Last name" id="tb_last_name"/>
					<FormControl required type="text" placeholder="Address" id="tb_address"/>
					<FormControl required type="text" placeholder="Town" id="tb_town"/>
					<FormControl required type="text" placeholder="Country" id="tb_country"/>
					<FormControl required type="text" placeholder="Phone number" id="tb_phone"/>
					<FormControl required type="text" placeholder="Insurance number" id="tb_insurance"/>
		            */}
					<FormControl required type="text" placeholder="Date of birth, in format: dd/mm/yyyy" id="tb_birthday"/>
					<Button 	
							variant="primary" 
							type="submit" 
							onClick={this.handleRegister}
					>
						Submit
					</Button>
				</Form>
			</div>
		)
	}

} export default RegistrationPage


