import React, {Component} from 'react';
import axios from 'axios'


class HealthRecord extends Component {

	state = {
		firstName: "", 
		lastName: "", 
		weight: "", 
		height: "", 
		birthday: "", 
		diopter: "", 
		bloodType: ""
	}

	componentDidMount () {
		let path = "http://localhost:8080/api/patients/health_record";
        axios.get (path)
        .then (response => {
            this.setState ({
                firstName: response.data.firstName, 
				lastName: response.data.lastName, 
				weight: response.data.weight, 
				height: response.data.height, 
				birthday: response.data.birthday, 
				diopter: response.data.diopter, 
				bloodType: response.data.bloodType
            });
        })
	}

	render () {
		return (
			<div class="row d-flex justify-content-center">
                <div class='col-md-3'>
					<div >
						<label class="badge badge-success text-right">First Name:</label>&nbsp;&nbsp;&nbsp;
						<label >{this.state.firstName}</label>
					</div>
					<div >
						<label class="badge badge-success text-right">Last Name:</label>&nbsp;&nbsp;&nbsp;
						<label >{this.state.lastName}</label>
					</div>
					<div >
						<label class="badge badge-success text-right">Weight:</label>&nbsp;&nbsp;&nbsp;
						<label >{this.state.weight} kg</label>
					</div>
					<div >
						<label class="badge badge-success text-right">Height:</label>&nbsp;&nbsp;&nbsp;
						<label >{this.state.height}</label>
					</div>
					<div >
						<label class="badge badge-success text-right">Birthday:</label>&nbsp;&nbsp;&nbsp;
						<label >{this.state.birthday}</label>
					</div>
					<div >
						<label class="badge badge-success text-right">Diopter:</label>&nbsp;&nbsp;&nbsp;
						<label >{this.state.diopter}</label>
					</div>
					<div >
						<label class="badge badge-success text-right">Blood Type:</label>&nbsp;&nbsp;&nbsp;
						<label >{this.state.bloodType}</label>
					</div>
					<div >
						<label class="badge badge-success text-right">Alergies:</label>&nbsp;&nbsp;&nbsp;
						<label >PLACEHOLDER</label>
					</div>
                </div>
                
            </div>
		);
	}

}


export default HealthRecord;