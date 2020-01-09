import React from 'react'
import Button from 'react-bootstrap/Button'
import HealthRecord from './HealthRecord'

class ShowHealthRecord extends React.Component {

    render() {
        return(
            <div> 
                    <h2> {this.props.data.patient} </h2>
                    <br/>
                    <HealthRecord health_record = {this.props.health_record}/>
                    <Button className = "btn btn-success" onClick = {this.props.toggleUpdate}> Update</Button>
                    </div>
        )
    }
}

export default ShowHealthRecord