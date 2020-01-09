import React from 'react'
import Button from 'react-bootstrap/Button'

class ShowHealthRecord extends React.Component {

    render() {
        return(
            <div> 
                    <h2> {this.props.data.patient} </h2>
                    <br/>
                    
                    <table class="table table-hover">
                        <tbody>
                            <tr>
                                <th scope="row">Age:</th>
                                    <td>{this.props.ageDisplay()}</td>
                            </tr>
                            <tr>
                                <th scope="row">Height: </th>
                                <td>{this.props.heightDisplay()} m</td>
                            </tr>
                            <tr>
                                <th scope="row">Weight:</th>
                                    <td>{this.props.weightDisplay()} kg</td>
                            </tr>
                            <tr>
                                <th scope="row">Diopter:</th>
                                    <td>{this.props.diopterDisplay()}</td>
                            </tr>
                            <tr>
                                <th scope="row">Allergies:</th>
                                    <td>{this.props.allergyDisplay()}</td>
                            </tr>

                            <tr>
                                <th scope="row">Blood type:</th>
                                    <td>{this.props.bloodTypeDisplay()}</td>
                            </tr>
                            
                        </tbody>
                    </table>
                    <Button className = "btn btn-success" onClick = {this.props.toggleUpdate}> Update</Button>
                    </div>
        )
    }
}

export default ShowHealthRecord