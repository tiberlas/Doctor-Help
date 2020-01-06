import React, {Component, Fragment} from 'react'
import Tab from 'react-bootstrap/Tab'
import {Row, Col} from 'react-bootstrap'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import axios from 'axios';

class PatientRegistrationInformation extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            declined: false,
            refreshPage: false,
            sending: false
        }
    }

    generateListGroup = () => {

        let items = []; 
        var size = Object.keys(this.props.data).length;
        for( let i = 0; i < size; i++) {
            let action_href = '#' + this.props.data[i].insuranceNumber
            items.push(<ListGroup.Item key={i} action href = {action_href}>
                   {this.props.data[i].firstName} {this.props.data[i].lastName}
                   </ListGroup.Item>)
        }

        return items
    }

    handleAccept = (event) => {
        this.setState({sending: true, declined: false})

        var size = Object.keys(this.props.data).length;
        for( let i = 0; i < size; i++) {
            if(event.target.value == this.props.data[i].insuranceNumber) {
              
                axios.post('http://localhost:8080/api/centreAdmins/acceptRequest', {
                        email: this.props.data[i].email
             }).then( response => {
                    this.props.handleUpdate(this.props.data[i].email);
                       this.setState({
                           refreshPage: true,
                           sending: false
                       })
             })
            }
            
        }
    }

    handleDecline = (event) => {
        event.preventDefault()
        this.setState({
            declined: true
        })

    }

    goBack = () => {
        this.setState({declined: false})
        // this.forceUpdate()
    }

    sendDecline = (event) => {

        this.setState({sending: true, declined: false})
        let declineDescription = document.getElementById("declinationDescription").value

        //TODO: find the appropriate request based on insuranceID.
       
        var size = Object.keys(this.props.data).length;
        for( let i = 0; i < size; i++) {
            if(event.target.value == this.props.data[i].insuranceNumber) {
            
                
                axios.post('http://localhost:8080/api/centreAdmins/declineRequest', {
                   
                        email: this.props.data[i].email,
                        declinedDescription: declineDescription
                   }).then( response => {
                    //    alert("Successfully declined.")
                    this.props.handleUpdate(this.props.data[i].email);
                       this.setState({
                        refreshPage: true, 
                        sending: false
                    })})

            }

            
        }
    }

    updateTextArea = (event) => {
        document.getElementById("declinationDescription").value = event.target.value
        console.log("DESCR VALUE" + document.getElementById("declinationDescription").value)
    }


    generateTabPane = () => {
        let items = []; 
        var size = Object.keys(this.props.data).length;

        let declined = this.state.declined

        for( let i = 0; i < size; i++) {
            let event_key = '#' + this.props.data[i].insuranceNumber
            items.push(<Tab.Pane key={i} eventKey = {event_key}>
                   First name:      {this.props.data[i].firstName} 
                   <br/> Last name:     {this.props.data[i].lastName}
                   <br/> Email:     {this.props.data[i].email}
                   <br/> Address:     {this.props.data[i].address}
                   <br/> City:      {this.props.data[i].city}
                   <br/> State:        {this.props.data[i].state}
                   <br/> Insurance number:      {this.props.data[i].insuranceNumber}
                   <br/> Phone number: {this.props.data[i].phoneNumber}
                   <br/>
                   <br/>

                {this.state.sending  ? <div> <p class="text-info">Loading... </p> </div> : <Fragment> 
                    

                {(!this.state.declined) ? <div>

                        <Button variant="outline-success" value = {this.props.data[i].insuranceNumber} onClick = {this.handleAccept}>Accept</Button> &nbsp;&nbsp;&nbsp;
                        <Button variant="outline-danger" value = {this.props.data[i]} onClick = {this.handleDecline}>Decline</Button>
                </div> : 
                <div> 
                    <textarea id = "declinationDescription" onChange = {this.updateTextArea}> Reasons for declining: </textarea>
                    <br/>
                    <br/>
                    <Button variant="outline-secondary" onClick = {this.goBack}>Back</Button> &nbsp;&nbsp;&nbsp;
                    <Button variant="outline-primary" value = {this.props.data[i].insuranceNumber} onClick = {this.sendDecline}>Send</Button>
                </div>
                }

            </Fragment>}
                </Tab.Pane>)
        }

        return items
    }

    generatePage = () => {
        
        return( 
            <Tab.Container id="list-group-tabs-example">
                <Row>
                    <Col sm={4}>
                    <ListGroup>
                        {this.generateListGroup()}
                    </ListGroup>
                    </Col>
                    <Col sm={8}>
                    <Tab.Content>
                        {this.generateTabPane()}
                    </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        )
    }

    render() {

        var size = Object.keys(this.props.data).length;
        return(
            <div>
                 {size > 0 ? this.generatePage() : <div> <h2> No requests at the moment :) </h2></div>}
            </div>
        )
    }
}


export default PatientRegistrationInformation