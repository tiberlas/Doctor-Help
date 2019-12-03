import React, {Component} from 'react'
import PatientRegistrationInformation from './PatientRegistrationInformation'
import axios from 'axios';
class PatientRequests extends Component {

    _isMounted = false

    constructor() {
        super()
        this.state = {
                patientInfo: {}
        }

    }

    componentDidMount = () => {
        this._isMounted = true

        var token = JSON.parse(localStorage.getItem('token'));
        console.log("token is" + token)
        axios.get('http://localhost:8080/api/centreAdmins/requests',)
        .then(res =>  {
            const patientInfo = res.data
            console.log("patient info from fetch", patientInfo[0])
            this.setState({patientInfo})
        })
        .catch(err => 
            console.log(err)
        )
    }

    componentDidUnmount = () => {
        this._isMounted = false
    }

    render() {
        if(this._isMounted)
            return(
                <div>
                    <h1>>Registration requests</h1>
                    <PatientRegistrationInformation data = {{...this.state.patientInfo}}/>

                
                </div>
            )
        else {
            return (
                <div> Loading... </div>
            )
        }
    }
}


export default PatientRequests