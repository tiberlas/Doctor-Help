import React, {Fragment} from 'react'
import axios from 'axios'
import ShowHealthRecord from './ShowHealthRecord'
import UpdateHealthRecord from './UpdateHealthRecord'

class AppointmentHealthRecord extends React.Component {

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

    componentWillMount() {
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
        })
    }

    update = (record) => {
        console.log('passed record', record)
            this.setState({
                health_record: {
                    height: record.height,
                    weight: record.weight,
                    diopter: record.diopter,
                    bloodType: record.bloodType,
                    allergyList: record.allergyList,
                    birthday: this.state.health_record.birthday
                }
            }, () => {
                this.toggleUpdate()
            })
        
    }

    toggleUpdate = () => {
        this.setState({updating: !this.state.updating}, ()=> {this.forceUpdate()})
    }

 

    render() {
        return (
            <Fragment>
                  <div class="row d-flex justify-content-center">
                    <div class='col-md-11'>
            {!this.state.updating ?  <ShowHealthRecord data = {this.props.data} 
                                        toggleUpdate = {this.toggleUpdate}
                                        health_record = {this.state.health_record}
                                    /> : <UpdateHealthRecord data = {this.props.data}
                                        update = {this.update}
                                        toggleUpdate = {this.toggleUpdate}
                                        health_record={this.state.health_record} />}
                        </div>
                    </div>
            </Fragment>
        )
    }

}


export default AppointmentHealthRecord