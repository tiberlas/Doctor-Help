import React, {Fragment} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import {Link} from 'react-router-dom'
import axios from 'axios';

class AppointmentInfoModal extends React.Component {

    state = {
        showConfirmModal: false,
        canDecline: false
    }

    handleDelete = () => {
        alert("O YEAH")
    }

    checkCurrentDate = () => {

        let today = new Date();
        let isToday = (today.toDateString() == this.props.event.start.toDateString());
        console.log('is it today?', isToday)
        return isToday
    }


    componentWillReceiveProps(props) {
        this.setState({ showConfirmModal: props.showConfirmModal}, () => {
            axios.get('http://localhost:8080/api/appointments/requested='+this.props.event.id+'/can+delete')
            .then(response => {
                if(response.data == 'CAN BE DELETED') {
                    this.setState({canDecline: true});
                }
            }).catch(error => {
                this.setState({canDecline: false});
            })
        })
    }


    render() {
       let appStart = new Date(this.props.event.start).toLocaleDateString("en-US")
       let profileUrl = '/profile/' + this.props.event.patientInsurance
        return (
            <Fragment> 
                <Modal
                isOpen={this.props.modal}
                toggle={this.props.toggle}
                className={this.props.className} >
                <ModalHeader toggle={this.props.toggle}>
                {this.props.event.title}
                </ModalHeader>
                <ModalBody>
                <div>
                    <p> Development: Appointment ID - {this.props.event.id} </p> 
                    <Link to = {profileUrl}> Patient: {this.props.event.patient} </Link>
                    <p>Status: {this.props.event.status}</p>
                    <p>Procedure: {this.props.event.procedure}</p>
                    <p>Price: {this.props.event.price}</p>
                    <p>Discount: {this.props.event.discount}% </p>
                    <p>Total: {this.props.event.price * (1 - (this.props.event.discount / 100))} </p>
                </div>
                </ModalBody>
                <ModalFooter>

            { this.state.canDecline &&
                <Button color='warning' onClick={this.handleDelete}>Decline</Button>
            }
        {!this.state.showConfirmModal ? <Fragment>
            <Button color="secondary" onClick={this.props.toggle}> Close</Button> 
        {(this.checkCurrentDate() && this.props.event.status === 'APPROVED') ? 
        <Fragment>
            <Button color="primary" onClick = {() => {this.setState({showConfirmModal: true})}}>Start</Button>
        </Fragment>
         : 
         this.props.event.status === 'APPROVED' && 
         <Fragment> 
         <Button disabled>Start</Button>
         <p> You can only start the appointment on {appStart}</p> 
         </Fragment> } </Fragment> :  <Fragment>
              <p> You are about to generate the big dick energy and start the appointment.
             Should you proceed? </p> 
             <Button color = "secondary" onClick = {() => {this.setState({showConfirmModal: false})}}> Cancel</Button> 
             <Button color = "primary" onClick = {() => {this.props.toggleAppointment()}}>  Yes, my child.  </Button> 
            </Fragment>}
                </ModalFooter> 

              
            </Modal>
            
            </Fragment>
        )
    }
}

export default AppointmentInfoModal