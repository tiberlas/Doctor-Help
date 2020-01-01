import React from 'react'
import Button from 'react-bootstrap/Button'

class UpdateHealthRecord extends React.Component {

    state = {
        height: "",
        weight: "",
        diopter: "",
        allergy: "",
        bloodType: ""
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
        this.props.toggleUpdate()
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
                            <td><input name="height" type="text" defaultValue = {this.props.heightDisplay()} onChange={this.handleChange}/></td>
                        </tr>
                        <tr>
                            <th scope="row">Weight:</th>
                                <td><input name="weight" type="text" defaultValue={this.props.weightDisplay()} onChange={this.handleChange}/></td>
                        </tr>
                        <tr>
                            <th scope="row">Diopter:</th>
                                <td><input name="diopter" type="text" defaultValue={this.props.diopterDisplay()} onChange={this.handleChange}/></td>
                        </tr>
                        <tr>
                            <th scope="row">Allergies:</th>
                                <td><input name="allergy" type="text" defaultValue={this.props.allergyDisplay()} onChange={this.handleChange}/></td>
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