import React, {Fragment} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import {Link} from 'react-router-dom'
import axios from 'axios'
import Moment from 'moment';

import './fade-modal.css'

// const modalStyle = {
//     ReactModal__Overlay {
//         opacity: 0;
//         transition: opacity 2000ms ease-in-out;
//     }
    
//     .ReactModal__Overlay--after-open{
//         opacity: 1;
//     }
    
//     .ReactModal__Overlay--before-close{
//         opacity: 0;
//     }
// }

class LeaveRequestModal extends React.Component {

    state = {
        ableToRequest: true,
        leaveType: "Personal leave",
        note: "", 
        showNote: false,
        successInfo: false,
        id: this.props.id, //medical staff id
        role: this.props.role //medical staff role
    }


    handleChange = (event) => {
        this.setState( {
            [event.target.name]: event.target.value
        })
    }

    componentDidMount() {
        let able = true
        for(let i = 0; i < this.props.appointments.length; i++) {
            let appointmentStartDate = new Date(this.props.appointments[i].startDate)
            let selectedBeginDate = new Date(this.props.selectedDates.startStr)
            let selectedEndDate = new Date(this.props.selectedDates.endStr)
            if(Moment(appointmentStartDate).isAfter(selectedBeginDate) && Moment(appointmentStartDate).isBefore(selectedEndDate)) {
                able = false
            }
        }

        this.setState({ableToRequest: able})

    }


    displayUnableToRequest = () => { //if overlapping dates, unable to make a request
        let startDate = new Date(this.props.selectedDates.startStr).toLocaleDateString("en-US")
        let endDate = new Date(this.props.selectedDates.endStr).toLocaleDateString("en-US")
        
        return <Fragment>  
            <div class="row d-flex justify-content-center">
                <div class='col-md-11'> 
                        {'Unable to make a request between ' + startDate + ' and ' + endDate + 
                ' because some appointments overlap.\nPlease try another date.' }  
                </div>
            </div> 
            </Fragment>
    }

    displayAbleToRequest = () => {
       return <Fragment>                
                    <div class="row d-flex justify-content-center">
                        <div class='col-md-11'>
                          
                            <strong> Start:  </strong>&emsp; {new Date(this.props.selectedDates.startStr).toLocaleDateString("en-US")}
                            <br/>
                            <strong> End: </strong> &emsp; {new Date(this.props.selectedDates.endStr).toLocaleDateString("en-US")}
                        </div>
                    </div>

                    <div class="row d-flex justify-content-center">
                        <div class='col-md-11'>
                        <br/>
                        <label>
                            <input required
                                type="radio" 
                                name="leaveType"
                                value="Personal leave"
                                checked={this.state.leaveType === "Personal leave"}
                                onChange={this.handleChange}
                            /> Personal leave
                        </label> &nbsp;
                        <label>
                            <input required
                                type="radio" 
                                name="leaveType"
                                value="Annual leave"
                                checked={this.state.leaveType === "Annual leave"}
                                onChange={this.handleChange}
                            /> 
                        </label> Annual leave

                        </div>
                    </div>

                    <div class="row d-flex justify-content-center">
                        <div class='col-md-11'>
                           {this.state.showNote === false && <Button className="btn btn-info " onClick={()=>{this.setState({showNote: true})}}>Add note</Button>}
                            {this.state.showNote === true 
                            && <textarea name="note" onChange={this.handleChange} 
                                                    placeholder="Aditional note will make your request better!" 
                                                    style={{resize: "none"}}/>}

                        </div>
                    </div>

                    {this.state.successInfo &&  <div class="row d-flex justify-content-center">
                                                 <div class='col-md-11'>
                                                    <div class="valid-feedback d-block"> Request successfully sent! </div>  
                                                </div> 
                                                </div>}

                  
                                            
                </Fragment>
    }

    handleConfirm = () => {
        let leaveTypeData = ""
        if(this.state.leaveType === 'Annual leave') {
            leaveTypeData = "ANNUAL"
        } else {
            leaveTypeData = "PERSONAL"
        }
        
        if(this.state.role === 'NURSE') {
            axios.post('http://localhost:8080/api/leave-requests/add/nurse='+this.state.id, 
            {
                leaveType: leaveTypeData,
                note: this.state.note,
                staffId: this.state.id,
                staffRole: "NURSE",
                startDate: new Date(this.props.selectedDates.startStr),
                endDate: new Date(this.props.selectedDates.endStr)

            }).then(response => {
                this.setState({successInfo: true}, () => {
                    setTimeout(() => { this.props.toggle()}, 1000)
                })
            })
            
        }
    }

    render() {
        console.log('states are:', this.state)
        return (
            <Fragment>

                            <Modal
                            isOpen={this.props.modal}
                            toggle={this.props.toggle}
                            closeTimeoutMS={2000} >
                            <ModalHeader toggle={this.props.toggle}>
                            {!this.state.ableToRequest ? <>Unable to request</> : <> New request overview </> } 
                            </ModalHeader>

                           
                                    <ModalBody>
                                    
                                            {!this.state.ableToRequest && this.displayUnableToRequest()}
                                            {this.state.ableToRequest && this.displayAbleToRequest()}            
                                
                                    </ModalBody>
                           
                            <ModalFooter>
                                
                        <Button color="secondary" onClick={this.props.toggle}> Cancel</Button>
                        {this.state.ableToRequest 
                        && <Button color="primary" onClick={this.handleConfirm}> Submit </Button>}
                            </ModalFooter>
                        
                        </Modal>
                        
            </Fragment>
        )
    }
}


export default LeaveRequestModal