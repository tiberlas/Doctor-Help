import React, {Fragment} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"

let currentDate = new Date()
let curYear = currentDate.getFullYear
let curMonth = currentDate.getMonth
let curDay = currentDate.getDay

class DisplayDoctorModals extends React.Component {

    checkCurrentDate = () => {

        let today = new Date();
        let isToday = (today.toDateString() == this.props.event.start.toDateString());
        console.log(isToday)
        return isToday
    }


    render() {
       let today = new Date()
        return (
                <Modal
                isOpen={this.props.modal}
                toggle={this.props.toggle}
                className={this.props.className} >
                <ModalHeader toggle={this.props.toggle}>
                {this.props.event.title}
                </ModalHeader>
                <ModalBody>
                <div>
                    <p>Patient: {this.props.event.patient}</p>
                    <p>Status: {this.props.event.status}</p>
                    <p>Procedure: {this.props.event.procedure}</p>
                    <p>Price with discount: {this.props.event.price}</p>
                </div>
                </ModalBody>
                <ModalFooter>

        {(this.checkCurrentDate() && this.props.event.status === 'APPROVED') ? 
        <Fragment> 
            <Button color="primary">Start</Button>
        </Fragment>
         : 
         this.props.event.status === 'APPROVED' && 
         <Fragment> 
         <Button disabled>Start</Button>
         </Fragment> }

         <Button color="secondary" onClick={this.props.toggle}> Close </Button> 

         {(!this.checkCurrentDate() && this.props.event.status === 'APPROVED')  
         && <Fragment>  <p> You can only start the appointment on {today.toLocaleDateString("en-US")}</p> </Fragment>  }
                </ModalFooter>
            </Modal>
        )
    }
}

export default DisplayDoctorModals