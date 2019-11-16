import React from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import TempHome from './components/TempHome.js';
import axios from 'axios';
import { appendToMemberExpression } from '@babel/types';
import App from './App.js';


//import { createAppContainer } from 'react-navigation';
//import { createStackNavigator } from 'react-navigation-stack';


class LoginPage extends React.Component {

	
	constructor() {
		super()
		this.state = {
			loggedIn: false,
			userRole: 'guest', 
		}
	}


	handleLogIn = () => {
		this.setState ({
			loggedIn: true
		})
	}
	
	render () {
		
		if (this.state.loggedIn === true) {
			if (this.state.userRole !== 'guest') {
				return (
					<div>
						<TempHome userRole={this.props.userRole} userId = "1"/>			
					</div>
				)
			}
			let email = document.getElementById('tb_email');
			let password = document.getElementById('tb_password');
			//email.value
			
			if ((email.value === 'doctor') && (password.value === 'doctor')) {
				this.props.fcnSetLoginData ();
			}
			else if ((email.value === 'nurse') && (password.value === 'nurse')) {
				
			}
			else if ((email.value === 'clinicAdmin') && (password.value === 'clinicAdmin')) {
				
			}
			else if ((email.value === 'centreAdmin') && (password.value === 'centreAdmin')) {
				
			}
			else if ((email.value === 'patient') && (password.value === 'patient')) {
				
			}
			
			if (email.value.length > 3) {
				if  (password.value.length > 3) {
					/*
					axios.post ('http://localhost:8080/api/login', JSON.stringify ({
						email: email.value, 
						password: password.value
					})).then (function (response) {
						//alert (response);
						if (response.userRole !== 'guest') {
							userRole = response.userRole;
						}
					});
					*/

					fetch ('http://localhost:8080/api/login', {
						method: 'post',
						headers: {'Content-Type' : 'application/json'},
						body: JSON.stringify ({
							email: email.value, 
							password: password.value
						})
					});


					if (this.props.userRole !== 'guest') {


						return (
							<div>
								<TempHome userRole={this.props.userRole} userId = "1"/>			
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

		

		return (
			<div>
				<Form>
					<FormControl type="text" placeholder="Email" id="tb_email"/>
					<FormControl type="password" placeholder="Password" id='tb_password'/>
					<Button 	
						variant="primary" 
						type="submit" 
						onClick={this.handleLogIn}
					>
						Submit
					</Button>
				</Form>
			</div>
		)
	}

}


export default LoginPage