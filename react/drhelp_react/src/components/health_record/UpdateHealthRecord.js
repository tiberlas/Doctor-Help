import React from 'react'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

class UpdateHealthRecord extends React.Component {

    state = { //predefinisan state je ono sto je i bilo ranije u health recordu
        height: this.props.heightDisplay(),
        weight: this.props.weightDisplay(),
        diopter: this.props.diopterDisplay(),
        allergy: this.props.allergyDisplay(),
        bloodType: this.props.bloodTypeDisplay(),
        error: false,
        errorAllergy: false
    }

    handleChange = (e) => {
        console.log("event" + e.target.name + " " + e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        }, ()=>{this.validate()})
    }


    validate = () => {
        this.setState({error: false, errorAllergy: false})

        if(!this.state.allergy.trim()) {
            this.setState({error: true, errorAllergy: true})
        } else {
            let allergyList = []
            let regex = new RegExp("[^a-zA-Z0-9\s:]$")
            allergyList = this.state.allergy.trim().split(',')
            for(let i=0; i < allergyList.length; i++) {
                if(allergyList[i].trim() === "" || regex.test(allergyList[i])) {
                    this.setState({error: true, errorAllergy: true})
                    break
                }
            }
        }

    }



    handleSubmit = (event) => {
        event.preventDefault()

        if(this.state.error)
            return

        let record = {
            allergyList: this.state.allergy.split(','),
            weight: parseFloat(this.state.weight),
            height: parseFloat(this.state.height),
            diopter: parseFloat(this.state.diopter),
            bloodType: this.state.bloodType.replace(' ', '_').toUpperCase()
        }

        let url = 'http://localhost:8080/api/healthRecord/update/insurance='+this.props.data.patientInsurance
        axios.put(url, {
            weight: record.weight,
            height: record.height,
            diopter: record.diopter,
            bloodType: record.bloodType,
            allergyList: record.allergyList
        }).then(this.props.update(record))
    }


   
    generateSelect = () => {
        let items = []
        items.push(<option value="">Select a blood type</option>)
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
                <div class="table-responsive">
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
                                <td><input name="weight" type="number" step="any" defaultValue={this.props.weightDisplay()} onChange={this.handleChange}/></td>
                        </tr>
                        <tr>
                            <th scope="row">Diopter:</th>
                                <td><input name="diopter" type="number" step="any" defaultValue={this.props.diopterDisplay()} onChange={this.handleChange}/></td>
                        </tr>
                        <tr>
                            <th scope="row">Allergies:</th>
                                <td>
                                    <input id="allergyInput" name="allergy" type="text" 
                                defaultValue={this.props.allergyDisplay()} 
                                onChange={this.handleChange}/>
                                {this.state.errorAllergy &&
                                    // <div class="text-muted"> Allergies are seperated by a comma </div>
                                      <div class="invalid-feedback d-block"> Invalid allergy format. <br/>Allergies are seperated by a comma.</div>}
                                </td>
                               
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
                </div>
                <Button className = "btn" onClick = {this.props.toggleUpdate}> Back</Button>
                &nbsp;&nbsp;
                <input type = "submit" value = "Confirm" className = "btn btn-success" className={`btn btn-success ${this.state.error ? 'disabled': ''}`}/>
                </form>
            </div> 
        </div>
        )
    }
}

export default UpdateHealthRecord