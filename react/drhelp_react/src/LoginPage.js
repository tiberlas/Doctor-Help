import React from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import TempHome from './components/TempHome.js';
import {UserContext} from './context/UserContextProvider';
import {Route} from 'react-router-dom';
import {Switch} from 'react-router-dom';
import RegistrationPage from './components/RegistrationPage.js';
import { Link } from 'react-router-dom';
import FirstTimePasswordChange from './components/FirstTimePasswordChange'


class LoginPage extends React.Component {


	state = {  }

    static contextType = UserContext
	
	constructor(props) {
		super(props)
		this.state = {
			loggedIn: false,
			userRole: 'guest'
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
				.then(response => response.json())
				.then (response =>  {


					if (response.status === 401) {
						alert ("An account with that email and password doesn't exist or isn't activated. ");
						return;
					}
					if(response.status === 302) {
						alert("moved")
						//window
					}
					//return response.json()

					localStorage.setItem('token', JSON.stringify(response.jwtToken));

					var token = JSON.parse(localStorage.getItem('token'));
					console.log(`Authorization=Bearer ${token}`)

					console.log("must change password, ", response.mustChangePassword)

					if(response.mustChangePassword === true) {
						let role = response.userRole
						alert('role here' + role)
						this.props.setPasswordChange(response.userRole)
						alert(" dolby" + role)
					}
					
					if (response.userRole === "PATIENT") {
						this.props.setLoginPatient ();
						this.context.updateValue (response.id, response.userRole);

						//this.context.updateValue ("role", response.userRole);
					}
					else if (response.userRole === "DOCTOR") {
						this.props.setLoginDoctor ()
						this.context.updateValue (response.id, response.userRole);
						//this.context.updateValue ("role", response.userRole);
					}
					else if (response.userRole === "NURSE") {
						this.props.setLoginNurse ()
						this.context.updateValue (response.id, response.userRole);
						//this.context.updateValue ("role", response.userRole);
					}
					else if (response.userRole === "CLINICAL_ADMINISTRATOR") {
						this.props.setLoginClinicAdmin ()
						this.context.updateValue (response.id, response.userRole);
						
					
						//this.context.updateValue ("role", response.userRole);
					}
					else if (response.userRole === "CENTRE_ADMINISTRATOR") {
						this.props.setLoginCentreAdmin ()
						this.context.updateValue ( response.id, response.userRole);
						//this.context.updateValue ("role", response.userRole);
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

				{/* <div class="alert alert-dismissible alert-success">
					<button type="button" class="close" data-dismiss="alert">&times;</button>
					<strong>Well done!</strong> You successfully read <a href="#" class="alert-link">this important alert message</a>.
				</div> */}

				<Switch>
					<Route path = "/login">
						<div class='row d-flex justify-content-center' >
						<div class='col-sm-5'>

							<form onSubmit={this.handleSubmit}>
							<div class="form-group ">
								<label for="exampleInputEmail1">Email address</label>
								<FormControl type="email" placeholder="Email" id="tb_email"/>
							</div>
							<div class="form-group ">
							<label for="exampleInputEmail1">Password</label>
								<FormControl type="password" placeholder="Password" id='tb_password'/>
							</div>
							<div class="form-group row">
								<div class='col-md text-left'>
									<input type="submit" value="Submit" class="btn btn-outline-success" />
								</div>
								<div class='col-md text-right'>
									<Link to="/register">
										<a href>need account?</a>
									</Link>
								</div>
							</div>
							</form>
							</div>
						</div>
					</Route>
					<Route path = "/register">
						<RegistrationPage></RegistrationPage>
					</Route>
				</Switch>
			</div>
		)
	}

}


export default LoginPage