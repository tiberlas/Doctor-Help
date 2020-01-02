import React from 'react'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

class UpdateHealthRecord extends React.Component {

    state = { //predefinisan state je ono sto je i bilo ranije u health recordu
        height: this.props.heightDisplay(),
        weight: this.props.weightDisplay(),
        diopter: this.props.diopterDisplay(),
        allergy: this.props.allergyDisplay(),
        bloodType: this.props.bloodTypeDisplay()
    }

    handleChange = (e) => {
        console.log("event" + e.target.name + " " + e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    handleSubmit = (event) => {
        event.preventDefault()
        alert("doing it")
        console.log('info:', this.state)
        console.log('props', this.props.data)
        console.log('insurance' + this.props.data.patientInsurance)

        let object = {
            allergyList: this.state.allergy.split(','),
            weight: parseFloat(this.state.weight),
            height: parseFloat(this.state.height),
            diopter: parseFloat(this.state.diopter),
            bloodType: this.state.bloodType.replace(' ', '_').toUpperCase()
        }

        let url = 'http://localhost:8080/api/healthRecord/update/insurance='+this.props.data.patientInsurance
        axios.put(url, {
            weight: object.weight,
            height: object.height,
            diopter: object.diopter,
            bloodType: object.bloodType,
            allergyList: object.allergyList
        }).then(this.props.toggleUpdate())
    }

    generateSelect = () => {
        let items = []
        items.push(<option value="O positive">O+</option>)
        items.push(<option value="O negative">O-</option>)
        items.push(<option value="A positive">A+</option>)
        items.push(<option value="A negative">A-</option>)
        items.push(<option value="B positive">B+</option>)
        items.push(<option value="B negative">B-</option>)
        items.push(<option value="AB positive">AB+</option>)
        items.push(<option value="AB negative">AB-</option>)
        return items
    }

    render() {
        return (
            <div class="row d-flex justify-content-center">
                <div class='col-md-11'>
                <h2> {this.props.data.patient} </h2>
                <br/>
                <form onSubmit = {this.handleSubmit}>
                <table class="table table-hover">
                    <tbody>
                        <tr>
                            <th scope="row">Age:</th>
                                <td><input type="text" defaultValue = {this.props.ageDisplay()} disabled/></td>
                        </tr>
                        <tr>
                            <th scope="row">Height: </th>
                            <td><input name="height" type="number" step="any" defaultValue = {this.props.heightDisplay()} onChange={this.handleChange}/></td>
                        </tr>
                        <tr>
                            <th scope="row">Weight:</th>
                                <td><input name="weight" type="number" defaultValue={this.props.weightDisplay()} onChange={this.handleChange}/></td>
                        </tr>
                        <tr>
                            <th scope="row">Diopter:</th>
                                <td><input name="diopter" type="number" defaultValue={this.props.diopterDisplay()} onChange={this.handleChange}/></td>
                        </tr>
                        <tr>
                            <th scope="row">Allergies:</th>
                                <td><input id="allergyInput" name="allergy" type="text" defaultValue={this.props.allergyDisplay()} onChange={this.handleChange}/>
                                <label for="allergyInput"><div class="text-muted"> Allergies are seperated by a comma</div></label> </td>
                               
                        </tr>

                        <tr>
                            <th scope="row">Blood type:</th>
                                <td>
                                    <select id="selectBloodType" name="bloodType" onChange={this.handleChange}>
                                        {this.generateSelect()}
                                    </select>
                                </td>
                        </tr>
                        
                    </tbody>
                </table>
                <Button className = "btn" onClick = {this.props.toggleUpdate}> Back</Button>
                &nbsp;&nbsp;
                <input type = "submit" value = "Confirm" className = "btn btn-success"/>
                </form>
            </div> 
        </div>
        )
    }
}

export default UpdateHealthRecord