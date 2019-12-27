import React, {Fragment} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"

class AppointmentModal extends React.Component {

    render() {
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
                    <Button color="secondary" onClick={() => {this.props.toggleAppointment()}}> Finish </Button> 
                    </ModalFooter>
                </Modal>
            </Fragment>

        )
    }
}

export default AppointmentModal