import React, {Fragment} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import {Link} from 'react-router-dom'
import axios from 'axios'
import {DoctorContext} from '../../context/DoctorContextProvider'
import DoctorShowExaminationReport from './DoctorShowExaminationReport'

class AppointmentInfoModal extends React.Component {

    static contextType = DoctorContext

    state = {
        showConfirmModal: false, 
        showReport: false,
        report: {}
    }

    checkCurrentDate = () => { //proverava da li se prosledjeni appointment slaze sa tekucim danom

        let today = new Date();
        let isToday = (today.toDateString() == this.props.event.start.toDateString());
        return isToday
    }


    componentWillReceiveProps(props) {
        this.setState({ showConfirmModal: props.showConfirmModal}, ()=>{
            if(props.event.status === 'DONE') {
                axios.get('http://localhost:8080/api/appointments/get-examination-report/appointment='+props.event.id+'/doctor='+this.context.doctor.id).then(response => {
                    this.setState({report: response.data, showReport: true})
                })
            } else {
                this.setState({showReport: false})
            }

        })
    }

    updateReport = (note) => {
        this.setState( prevState => ({
            report: {
                ...prevState.report,
                note: note
            }
        }), ()=>{this.forceUpdate()})
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
                    <br/>
                     Patient:  {this.props.event.patient.trim() === '-' 
                     ? <span style={{fontStyle: "italic", color: "#cdcdcd"}}> unassigned </span> : <Fragment> <Link to = {profileUrl}> {this.props.event.patient} </Link> </Fragment> }
                     <br/>
                    Status: {this.props.event.status}<br/>
                    Procedure: {this.props.event.procedure}<br/>
                    Price: {this.props.event.price}<br/>
                    Discount: {this.props.event.discount}% <br/>
                    Total: {this.props.event.price * (1 - (this.props.event.discount / 100))}<br/>
                </div>
                <div>
                {this.state.showReport && <DoctorShowExaminationReport
                                                event = {this.props.event} 
                                                report = {this.state.report}
                                                updateReport={this.updateReport}/>}
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