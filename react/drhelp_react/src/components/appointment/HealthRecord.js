import React from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'

class HealthRecord extends React.Component {

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
        let url = 'http://localhost:8080/api/doctors/appointment='+this.props.data.id+'/health_record'
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

    allergyDisplay = () => {

        let allergies = ""
        for(let i = 0; i < this.state.health_record.allergyList.length; i++) {
            allergies += this.state.health_record.allergyList[i]
            if(i !== this.state.health_record.allergyList.length - 1) {
                allergies += ', '
            }
            
        }
        console.log("allergies: ", allergies)
        return allergies
    }


    ageDisplay = () => {

        let thisYear = new Date().getFullYear()
        let bornYear = new Date(this.state.health_record.birthday).getFullYear()

        let age = Math.abs(thisYear - bornYear).toString()

        let born = new Date(this.state.health_record.birthday).toLocaleDateString("en-US")

        return age + ' - (born ' + born + ')'
    }

    render() {
        return (
            <div class="row d-flex justify-content-center">
                <div class='col-md-11'>
                <h2> {this.props.data.patient} </h2>
                <br/>
                <table class="table table-hover">
                    <tbody>
                        <tr>
                            <th scope="row">Age:</th>
                                <td>{this.ageDisplay()}</td>
                        </tr>
                        <tr>
                            <th scope="row">Height: </th>
                            <td>{this.state.health_record.height} </td>
                        </tr>
                        <tr>
                            <th scope="row">Weight:</th>
                                <td>{this.state.health_record.weight}</td>
                        </tr>
                        <tr>
                            <th scope="row">Diopter:</th>
                                <td>{this.state.health_record.diopter}</td>
                        </tr>
                        <tr>
                            <th scope="row">Allergies:</th>
                                <td>{this.allergyDisplay()}</td>
                        </tr>

                        
                    </tbody>
                </table>
                <Button className = "btn btn-success"> Update</Button> 
                </div>
            </div>
        )
    }

}


export default HealthRecord