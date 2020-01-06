import React, {Fragment} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import {Link} from 'react-router-dom'
import ShowExaminationReport from './NurseShowExaminationReport'
import axios from 'axios'


class NurseAppointmentInfoModal extends React.Component {

    state = {
        showReport: false,
        report: {}
    }

    componentWillReceiveProps(props) {
        if(props.event.status === 'DONE') {
            axios.get('http://localhost:8080/api/nurses/perscription/appointment='+props.event.id).then(response => {
                this.setState({report: response.data, showReport: true})
            })
        } else {
            this.setState({showReport: false})
        }
    }

    signOff = () => {
        axios.put('http://localhost:8080/api/nurses/signOff/appointment='+this.props.event.id).then(response => {
        })
    }

    render() {
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
                    Development: Appointment ID - {this.props.event.id} <br/>
                    <Link to = {profileUrl}> Patient: {this.props.event.patient} </Link> <br/>
                    Doctor: {this.props.event.doctor} <br/>
                    Status: {this.props.event.status} <br/>
                    Procedure: {this.props.event.procedure} <br/>
                    Price: {this.props.event.price} <br/>
                    Discount: {this.props.event.discount}% <br/>
                    Total: {this.props.event.price * (1 - (this.props.event.discount / 100))} <br/>
                </div>
                <div> 
                {this.state.showReport && <ShowExaminationReport
                                                event = {this.props.event} 
                                                report = {this.state.report}
                                                signOff = {this.signOff}/>}
                </div>
                </ModalBody>
                <ModalFooter>

            <Button color="secondary" onClick={this.props.toggle}> Close</Button> 
                </ModalFooter> 

              
            </Modal>
            
            </Fragment>
        )
    }
}


export default NurseAppointmentInfoModal