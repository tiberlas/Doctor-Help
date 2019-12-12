import React, {Component} from 'react';
import ViewProfile from '../ViewProfile';
import axios from 'axios'

class ViewPatientProfile extends Component {

    state = {
        patient: {}
    }

    componentDidMount() {
        let id = window.location.href.split('profile/')[1] //get the forwarded id
        console.log("id is " + id)
        let url = 'http://localhost:8080/api/patients/profile/' + id
        axios.get(url).then(response => {
           this.setState({
               patient: response.data
           })
        })
    }

	render () {
		return (
			<div>
				<ViewProfile profile={this.state.patient}/>
                {//TODO:  here comes the specific options for medical staff
                }
			</div>
		);
	}

}

export default ViewPatientProfile;