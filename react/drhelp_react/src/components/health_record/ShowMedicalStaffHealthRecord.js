import React, {Fragment} from 'react'
import axios from 'axios'

class ShowMedicalStaffHealthRecord extends React.Component {

    state = {
        health_record: {
            firstName: "",
            lastName: "",
            height: "",
            weight: "", 
            diopter: "",
            bloodType: "",
            birthday: "",
            allergyList: []
        }
    }

    componentDidMount() {
        let url = 'http://localhost:8080/api/healthRecord/get/patient='+this.props.patient.insuranceNumber
        axios.get(url).then(response => {
            this.setState( prevState => ({
                health_record: {
                    ...prevState.health_record,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    height: response.data.height,
                    weight: response.data.weight,
                    diopter: response.data.diopter,
                    bloodType: response.data.bloodType,
                    birthday: new Date(response.data.birthday),
                    allergyList: response.data.allergyList
                }
            }))
            console.log("health: ", this.state.health_record)
        })
    }

    heightDisplay = () => {
        return this.state.health_record.height
    }

    weightDisplay = () => {
        return this.state.health_record.weight
    }

    diopterDisplay = () => {
        return this.state.health_record.diopter
    }

    allergyDisplay = () => {

        let allergies = ""
        for(let i = 0; i < this.state.health_record.allergyList.length; i++) {
            allergies += this.state.health_record.allergyList[i]
            if(i !== this.state.health_record.allergyList.length - 1) {
                allergies += ', '
            }
            
        }
        return allergies
    }


    ageDisplay = () => {

        let thisYear = new Date().getFullYear()
        let bornYear = new Date(this.state.health_record.birthday).getFullYear()

        let age = Math.abs(thisYear - bornYear).toString()

        let born = new Date(this.state.health_record.birthday).toLocaleDateString("en-US")

        return age + ' - (born ' + born + ')'
    }

    bloodTypeDisplay = () => {
        let bloodType = ""

        bloodType = this.state.health_record.bloodType.replace('_', ' ')
        bloodType = bloodType.substr(0, 1) + bloodType.substr(1, bloodType.length).toLowerCase()
        return bloodType
    }


    render() {
        return (
            <Fragment>
            <h1> Record overview </h1>
            <table class="table table-hover">
            <tbody>
                <tr>
                    <th scope="row">Age:</th>
                        <td>{this.ageDisplay()}</td>
                </tr>
                <tr>
                    <th scope="row">Height: </th>
                    <td>{this.heightDisplay()} m</td>
                </tr>
                <tr>
                    <th scope="row">Weight:</th>
                        <td>{this.weightDisplay()} kg</td>
                </tr>
                <tr>
                    <th scope="row">Diopter:</th>
                        <td>{this.diopterDisplay()}</td>
                </tr>
                <tr>
                    <th scope="row">Allergies:</th>
                        <td>{this.allergyDisplay()}</td>
                </tr>

                <tr>
                    <th scope="row">Blood type:</th>
                        <td>{this.bloodTypeDisplay()}</td>
                </tr>
                
            </tbody>
        </table>
        </Fragment>
        )

    }

}

export default ShowMedicalStaffHealthRecord