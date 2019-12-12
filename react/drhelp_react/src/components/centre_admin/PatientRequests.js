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

        axios.get('http://localhost:8080/api/centreAdmins/requests',)
        .then(res =>  {
            const patientInfo = res.data
            this.setState({patientInfo})
        })
        .catch(err => 
            console.log(err)
        )
    }

    componentDidUpdate = () => {
        axios.get('http://localhost:8080/api/centreAdmins/requests',)
        .then(res =>  {
            const patientInfo = res.data
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

        var size = Object.keys(this.state.patientInfo).length

        if(this._isMounted)
            return(
                <div>
                    <h1>>Registration requests</h1>

                    {size > 0 ? <PatientRegistrationInformation data = {{...this.state.patientInfo}}/> 
                                : <div> <h2> No requests at the moment :) </h2></div>}
                
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