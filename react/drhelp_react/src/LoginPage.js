import React from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import TempHome from './components/TempHome.js';
import axios from 'axios';


//import { createAppContainer } from 'react-navigation';
//import { createStackNavigator } from 'react-navigation-stack';


class LoginPage extends React.Component {

	state = {
    	loggedIn: false, 
  	}

	
	render () {

		if (this.state.loggedIn === true) {
			let email = document.getElementById('tb_email');
			let password = document.getElementById('tb_password');
			//email.value
			
			let userRole = "guest";

			if ((email.value === 'doctor') && (password.value === 'doctor')) {
				userRole = 'doctor';
			} 
			else if ((email.value === 'nurse') && (password.value === 'nurse')) {
				userRole = 'nurse';
			}
			else if ((email.value === 'clinicAdmin') && (password.value === 'clinicAdmin')) {
				userRole = 'clinicAdmin';
			}
			else if ((email.value === 'centreAdmin') && (password.value === 'centreAdmin')) {
				userRole = 'centreAdmin';
			}
			else if ((email.value === 'patient') && (password.value === 'patient')) {
				userRole = 'patient';
			}

			if (email.value.length > 3) {
				if  (password.value.length > 3) {

					axios.post ('http://localhost:8080/api/login', {		
						email: email.value, 
						password: password.value
					}).then (function (response) {
						alert (response);
						if (response.userRole !== 'guest') {
							userRole = response.userRole;
						}
					});

					if (userRole !== 'guest') {


						return (
							<div>
								<TempHome userRole={userRole}/>			
							</div>
						)
					}
					else {
						alert ('Invalid user id');
						this.setState (() => ({
							loggedIn: false
						}))
					}
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

		const handleLogIn = () => {
			this.setState (() => ({
				loggedIn: true
			}))
		}


		return (
			<div>
				<Form>
					<FormControl type="text" placeholder="Email" id="tb_email"/>
					<FormControl type="password" placeholder="Password" id='tb_password'/>
					<Button 	
						variant="primary" 
						type="submit" 
						onClick={handleLogIn}
					>
						Submit
					</Button>
				</Form>
			</div>
		)
	}

}


export default LoginPage