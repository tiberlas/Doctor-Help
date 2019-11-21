import React from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import TempHome from './components/TempHome.js';
import {UserContext} from './context/UserContextProvider'


class LoginPage extends React.Component {


	state = {  }

    static contextType = UserContext
	
	constructor() {
		super()
		this.state = {
			loggedIn: false,
			userRole: 'guest', 
		}
	}

	handleSubmit = (event) => {
		event.preventDefault ();
		if (this.state.userRole !== 'guest') {
			return (
				<div>
					<TempHome userRole={this.props.userRole} userId = "1"/>			
				</div>
			)
		}
		let email = document.getElementById('tb_email');
		let password = document.getElementById('tb_password');
		
		if ((email.value === 'doctor') && (password.value === 'doctor')) {
			this.props.setLoginDoctor ();
			this.setState ({
				userRole: 'doctor'
			});
		}
		else if ((email.value === 'nurse') && (password.value === 'nurse')) {
			this.props.setLoginNurse ();
			this.setState ({
				userRole: 'nurse'
			});
		}
		else if ((email.value === 'clinicAdmin') && (password.value === 'clinicAdmin')) {
			this.props.setLoginClinicAdmin ();
			this.setState ({
				userRole: 'clinicAdmin'
			});
		}
		else if ((email.value === 'centreAdmin') && (password.value === 'centreAdmin')) {
			this.props.setLoginCentreAdmin ();
			this.setState ({
				userRole: 'centreAdmin'
			});
		}
		else if ((email.value === 'patient') && (password.value === 'patient')) {
			this.props.setLoginPatient ();
			this.setState ({
				userRole: 'patient'
			});
		}
		
		if (email.value.length > 3) {
			if  (password.value.length > 3) {
				fetch ('http://localhost:8080/api/login', {
					method: 'post',
					headers: {'Content-Type' : 'application/json'},
					body: JSON.stringify ({
						email: email.value, 
						password: password.value
					})
				})
				.then (response => response.json())
				.then (response =>  {
					if (response.userRole === "PATIENT") {
						this.props.setLoginPatient ();
					}
					else if (response.userRole === "DOCTOR") {
						this.props.setLoginDoctor ()
					}
					else if (response.userRole === "NURSE") {
						this.props.setLoginNurse ()
					}
					else if (response.userRole === "CLINICAL_ADMINISTRATOR") {
						this.props.setLoginClinicAdmin ()
					}
					else if (response.userRole === "CENTRE_ADMINISTRATOR") {
						this.props.setLoginCentreAdmin ()
					}
				});
			}
		else {
			alert ('Password too short');
				this.setState (() => ({
					loggedIn: false
				}))
			}
		}
		else  {
			alert ('Username too short');
			this.setState (() => ({
					loggedIn: false
			}))
		}
		
	}


	handleLogIn = () => {
		this.setState ({
			loggedIn: true
		})
	}
	
	render () {
		
		

		

		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<FormControl type="text" placeholder="Email" id="tb_email"/>
					<FormControl type="password" placeholder="Password" id='tb_password'/>
					<input type="submit" value="Submit">
					</input>
					{/*
					<Button 	
						variant="primary" 
						type="submit" 
						onClick={this.handleLogIn}
					>
						Submit
					</Button>
					*/}
				</form>
			</div>
		)
	}

}


export default LoginPage