import React, {Fragment} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"

class AppointmentInfoModal extends React.Component {

    state = {
        showConfirmModal: false
    }

    checkCurrentDate = () => {

        let today = new Date();
        let isToday = (today.toDateString() == this.props.event.start.toDateString());
        console.log('is it today?', isToday)
        return isToday
    }


    componentWillReceiveProps(props) {
        this.setState({ showConfirmModal: props.showConfirmModal})
    }


    render() {
        console.log("showModaL: ", this.state.showConfirmModal)
       let today = new Date()
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
                    <p>Patient: {this.props.event.patient}</p>
                    <p>Status: {this.props.event.status}</p>
                    <p>Procedure: {this.props.event.procedure}</p>
                    <p>Price with discount: {this.props.event.price}</p>
                </div>
                </ModalBody>
                <ModalFooter>

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
         <p> You can only start the appointment on {today.toLocaleDateString("en-US")}</p> 
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