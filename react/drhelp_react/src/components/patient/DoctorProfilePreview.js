import React, {Component} from 'react';
import axios from 'axios';


class DoctorProfilePreview extends Component {

	state = {
		firstName: "", 
		lastName: "", 
		clinic: "", 
		specialization: "", 
		rating: "", 
		id: ""
	}

	componentDidMount () {
		let parts = window.location.href.split ('/');
		let tempId = parts[parts.length - 1];
		axios.get ("http://localhost:8080/api/doctors/preview/" + tempId)
		.then (response => {
			this.setState ({
				firstName: response.data.firstName, 
				lastName: response.data.lastName, 
				clinic: response.data.clinic, 
				specialization: response.data.specialization, 
				rating: response.data.rating, 
				id: tempId
			})
		});
	}

	render () {

		return (
			<div class="row d-flex justify-content-center">
				<div class='col-md-7'>
					<br/>
					<br/>
					<h1>{this.state.firstName}&nbsp;{this.state.lastName}</h1>
					<div >
                    		<label class="badge badge-success text-right">Clinic:</label>&nbsp;&nbsp;&nbsp;
                    		<label >{this.state.clinic}</label>
                	</div>
					<div >
                    		<label class="badge badge-success text-right">Specialization:</label>&nbsp;&nbsp;&nbsp;
                    		<label >{this.state.specialization}</label>
                	</div>
					<div >
                    		<label class="badge badge-success text-right">Rating:</label>&nbsp;&nbsp;&nbsp;
                    		<label >{this.state.rating}</label>
                	</div>
				</div>
			</div>
		)

	}


}


export default DoctorProfilePreview;