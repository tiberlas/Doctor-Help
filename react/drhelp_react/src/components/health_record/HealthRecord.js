import React from 'react'
import axios from 'axios'
import ShowHealthRecord from './ShowHealthRecord'
import UpdateHealthRecord from './UpdateHealthRecord'

class HealthRecord extends React.Component {

    state = {
        updating: false,
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

    toggleUpdate = () => {
        this.setState({updating: !this.state.updating})
    }

    render() {
        return (
            !this.state.updating ?  <ShowHealthRecord data = {this.props.data} 
                                        bloodTypeDisplay = {this.bloodTypeDisplay}
                                        ageDisplay = {this.ageDisplay}
                                        allergyDisplay = {this.allergyDisplay}
                                        weightDisplay = {this.weightDisplay}
                                        heightDisplay = {this.heightDisplay}
                                        diopterDisplay = {this.diopterDisplay}
                                        toggleUpdate = {this.toggleUpdate}
                                    /> : <UpdateHealthRecord data = {this.props.data}
                                        bloodTypeDisplay = {this.bloodTypeDisplay}
                                        ageDisplay = {this.ageDisplay}
                                        allergyDisplay = {this.allergyDisplay}
                                        weightDisplay = {this.weightDisplay}
                                        heightDisplay = {this.heightDisplay}
                                        diopterDisplay = {this.diopterDisplay}
                                        toggleUpdate = {this.toggleUpdate} />
           
        )
    }

}


export default HealthRecord