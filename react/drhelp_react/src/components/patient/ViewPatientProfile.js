import React, {Component} from 'react';
import ViewProfile from '../ViewProfile';
import axios from 'axios'
import DoctorViewProfile from '../view_profile/doctor_view_profile/DoctorViewProfile'

class ViewPatientProfile extends Component {

    state = {
        patient: {},
        loading: true
    }

    componentDidMount() {
        let id = window.location.href.split('profile/')[1] //get the forwarded insurance id from url
        console.log("id is " + id)
        let url = 'http://localhost:8080/api/patients/profile/' + id //append it to get url
        
        setTimeout(() => { axios.get(url).then(response => {
           this.setState({
               patient: response.data
           })
        }).then(
            this.setState({loading: false})
        )}, 1200)
    }

	render () {
		return (
            this.state.loading ? <h1> Loading... </h1> :
			<div>
                <div class="row d-flex justify-content-center">
                 <div class='col-md-4'>
                <br/>
                <br/>
				<ViewProfile profile={this.state.patient}/>
                </div>
                <div class="col-md-6"> 
                {

                //TODO:  here comes the specific options for medical staff
                this.props.medical_staff.role === 'doctor' && <DoctorViewProfile 
                                                                patient={this.state.patient}
                                                                doctor = {this.props.medical_staff}
                                                                /> //ako si doca, imas opcije za doktora
                }
                </div>
                </div>
			</div>
		);
	}

}

export default ViewPatientProfile;