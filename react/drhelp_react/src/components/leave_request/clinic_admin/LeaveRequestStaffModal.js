import React, { Fragment } from 'react'
import { Button as ModalButton, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import {Link} from 'react-router-dom'

class LeaveRequestStaffModal extends React.Component {

    state = {
        request: this.props.request,
        approvedConflict: false,
        canBless: false,
        availableConflict: false,
        error: false,
        approvedCount: 0,
        sending: false,
        declining: false,
        declineReason: "",
        success: false
    }

    componentDidMount() {
        console.log('request info', this.state.request)
        if(this.state.request.staffRole === 'NURSE') {
            axios.post('http://localhost:8080/api/leave-requests/get-admin/validate/nurse', {
                firstName: this.state.request.firstName,
                lastName: this.state.request.lastName,
                startDate: this.state.request.startDate,
                endDate: this.state.request.endDate,
                leaveStatus: this.state.request.leaveStatus,
                leaveType: this.state.request.leaveType,
                note: this.state.request.note,
                staffId: this.state.request.staffId,
                staffRole: this.state.request.staffRole
            }).then(response=> {
                console.log('response', response.data)
                if(response.data.validationEnum === 'APPROVED_CONFLICT') {
                    this.setState({approvedConflict: true, approvedCount: response.data.approvedAppointmentsCount})
                } else if(response.data.validationEnum === 'AVAILABLE_CONFLICT') {
                    this.setState({availableConflict: true})
                } else if(response.data.validationEnum === 'CAN_BLESS') {
                    this.setState({canBless: true})
                }
            })

        } else {

         }
    }

    staffRoleDisplay = () => {
        return this.props.request.staffRole.substr(0,1) 
                + this.props.request.staffRole.substr(1, this.props.request.staffRole.length).toLowerCase()
    }

    leaveTypeDisplay = () => {
        return this.props.request.leaveType.substr(0,1) + this.props.request.leaveType.substr(1, this.props.request.leaveType.length).toLowerCase()
    }

    noteDisplay = () => {
        if(this.props.request.note.trim() === "") {
            return <div style={{fontStyle: "italic"}}> No note attached. </div>
        } else 
            return this.props.request.note 
    }

    updateTextArea = (e) =>{
        this.setState({[e.target.name]: e.target.value}, ()=>{
            console.log('updated', this.state.declineReason)
        })
    }

    sendDecline = () => {
        if(this.props.request.staffRole === 'NURSE') {
            this.setState({declining: false, sending: true, success: false}, ()=> {
                this.forceUpdate()
                axios.put('http://localhost:8080/api/leave-requests/decline-nurse/request='+this.props.request.id, {
                    staffId: this.state.request.staffId,
                    staffRole: this.state.request.staffRole,
                    note: this.state.declineReason
                }).then( response => {
                    this.setState({success: true, sending: false}, ()=>{
                        this.props.update()
                    })
                }).catch(error => {
                    this.setState({sending: false, error: true}, ()=>this.props.update())
                })
            })
        }
    }

    sendAccept = () => {
        if(this.props.request.staffRole === 'NURSE') {
            this.setState({decline: false, sending: true, success: false}, () => {
                axios.put('http://localhost:8080/api/leave-requests/accept-nurse/request='+this.props.request.id, {
                    firstName: this.state.request.firstName,
                    lastName: this.state.request.lastName,
                    startDate: this.state.request.startDate,
                    endDate: this.state.request.endDate,
                    leaveStatus: this.state.request.leaveStatus,
                    leaveType: this.state.request.leaveType,
                    note: this.state.request.note,
                    staffId: this.state.request.staffId,
                    staffRole: this.state.request.staffRole
                 }).then( response => {
                           this.setState({
                               success: true,
                               sending: false
                           }, ()=> this.props.update()) 
                 }).catch(error => {
                     this.setState({sending: false, error: true}, ()=> {this.props.update()})
                 })
            })
        }
    }
    

    displayUserRequestTable = () => {
        return <Fragment> 
            <table> 
                <tr> 
                    <th scope="row">First name: </th>
                    <td> &emsp;{this.props.request.firstName} </td>
                </tr>
                <tr> 
                    <th scope="row">Last name: </th>
                    <td> &emsp;{this.props.request.lastName} </td>
                </tr>
                <tr> 
                    <th scope="row">Role: </th>
                    <td> &emsp;{this.staffRoleDisplay()} </td>
                </tr>
                <tr> 
                    <th scope="row">Leave type: </th>
                    <td>  &emsp;{this.leaveTypeDisplay()} </td>
                </tr>
                <tr> 
                    <th scope="row">Additional note: </th>
                    <td >  &emsp;{this.noteDisplay()} </td>
                </tr>
                <tr> 
                    <th scope="row">Start date: </th>
                    <td>  &emsp; {new Date(this.props.request.startDate).toLocaleDateString("en-US")} </td>
                </tr>
                <tr> 
                    <th scope="row">End date: </th>
                    <td >  &emsp; {new Date(this.props.request.endDate).toLocaleDateString("en-US")} </td>
                </tr>
            </table>
        </Fragment>
    }


    render() {


        let conflict = ''
        if(this.state.sending) {
            conflict = 'sending'
        } else if(this.state.error) {
            conflict = 'error'
        } else if(this.state.success) {
            conflict = 'succ'
        } else if(this.state.approvedConflict) {
            conflict = 'approved'
        } else if(this.state.availableConflict) {
            conflict = 'available' 
        }  else if(this.state.canBless) {
            conflict= 'bless'
        } else {
            conflict = 'idk fam'
        }

        return(
            <Fragment>
            <Modal
                    isOpen={this.props.modal}
                    toggle={this.props.toggle}
                    closeTimeoutMS={2000} >
                    <ModalHeader toggle={this.props.toggle}>
                        Request overview
                    </ModalHeader>
                            <ModalBody>

                                <div class="row d-flex justify-content-center">
                                        <div class='col-md-11'>
                                            {this.displayUserRequestTable()}
                                            <br/>
                                        
                                <br/>

                                {conflict === 'sending' && <div> <p class="text-info">Sending... </p> </div>}

                                {conflict === 'succ' && <div class="valid-feedback d-block"> Success. </div>}

                                {conflict === 'error' && <div class="invalid-feedback d-block"> Something went wrong, please try again. </div>}

                                {conflict === 'approved' && !this.state.declining 
                                && <Button variant="outline-danger" onClick={()=>{this.setState({declining: true})}}>Decline</Button>}

                                {conflict === 'approved' && this.state.declining 
                                    && <Fragment> 
                                    <textarea name="declineReason" placeholder="Reasons for declining..." onChange = {this.updateTextArea}/>
                                    <br/>
                                    <Button variant="outline-secondary" onClick = {()=>this.setState({declining: false})}>Back</Button> &nbsp;&nbsp;&nbsp;
                                    <Button variant="outline-primary"  onClick = {this.sendDecline}>Send</Button>
                                    </Fragment>}

                                {conflict === 'approved' 
                                    && <div class="invalid-feedback d-block"> 
                                    There {this.state.approvedCount == 1 ? 'is' : 'are' } {this.state.approvedCount.toString()} 
                                   &nbsp; approved appointment{this.state.approvedCount == 1 ? '':'s'} in the request period. </div>}


                                {conflict === 'available' && !this.state.declining 
                                && <Fragment>
                                    <Button variant="outline-danger" onClick={()=>{this.setState({declining: true})}}>Decline</Button>&nbsp;&nbsp;
                                    <Button variant="outline-warning" disabled onClick={this.sendAccept}>Accept</Button>
                                    </Fragment>}

                                {conflict === 'available' && this.state.declining 
                                && <Fragment> 
                                <textarea name="declineReason" placeholder="Reasons for declining..." onChange = {this.updateTextArea}/>
                                <br/>
                                <Button variant="outline-secondary" onClick = {()=>this.setState({declining: false})}>Back</Button> &nbsp;&nbsp;&nbsp;
                                <Button variant="outline-primary"  onClick = {this.sendDecline}>Send</Button>
                                </Fragment>}

                                {conflict === 'available' 
                                    && <div class="text-warning d-block"> 
                                    There are some <strong> available </strong> appointments in the request period. 
                                    <br/>You can decline, or <Link exact to="/clinic-administrator/predefined-appointments">remove</Link> the appointments and accept the request. </div>}


                                {conflict === 'bless' && !this.state.declining
                                && <Fragment>
                                <Button variant="outline-danger" onClick={()=>{this.setState({declining: true})}}>Decline</Button>&nbsp;&nbsp;
                                <Button variant="outline-success" onClick={this.sendAccept}>Accept</Button>
                                </Fragment>}

                                {conflict === 'bless' && this.state.declining 
                                && <Fragment> 
                                <textarea name="declineReason" placeholder="Reasons for declining..." onChange = {this.updateTextArea}/>
                                <br/>
                                <Button variant="outline-secondary" onClick = {()=>this.setState({declining: false})}>Back</Button> &nbsp;&nbsp;&nbsp;
                                <Button variant="outline-primary"  onClick = {this.sendDecline}>Send</Button>
                                </Fragment>}

                                {conflict === 'bless' 
                                    && <div class="valid-feedback d-block"> 
                                    No conflicting appointments. Everything seems okay! </div>}
{/* 
                                <div class="row d-flex justify-content-center">
                                        <div class='col-md-11'>

                                        {this.state.sending ? <div> <p class="text-info">Sending... </p> </div> : <Fragment> 
                                            {this.state.decline && <Fragment> 
                                                <textarea name="declineReason" placeholder="Reasons for declining..." onChange = {this.updateTextArea}/>
                                                <br/>
                                                <Button variant="outline-secondary" onClick = {()=>this.setState({decline: false})}>Back</Button> &nbsp;&nbsp;&nbsp;
                                                <Button variant="outline-primary"  onClick = {this.sendDecline}>Send</Button>
                                                </Fragment>}

                                            
                                            {(!this.state.decline && !this.state.success && !this.state.conflict) && <Fragment> <Button variant="outline-danger" onClick={()=>{this.setState({decline: true})}}>Decline</Button>&nbsp;&nbsp;
                                            <Button variant="outline-success" onClick={this.sendAccept}>Accept</Button> </Fragment>}
                                            </Fragment>}

                                        {this.state.success && <div class="valid-feedback d-block"> Success. </div>}
                                        {this.state.conflict && <div class="invalid-feedback d-block"> Something went wrong. Please try again </div>}

                                        </div>
                                </div> */}
                                    </div>
                                </div>
                            </ModalBody>
                    <ModalFooter>
                        
                 <ModalButton class="secondary" onClick={this.props.toggle}> Close</ModalButton>
                    </ModalFooter>
                </Modal>

            </Fragment>
        )
    }
}

export default LeaveRequestStaffModal