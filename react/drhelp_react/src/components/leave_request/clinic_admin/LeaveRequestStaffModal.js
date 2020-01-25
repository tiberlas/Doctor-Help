import React, { Fragment } from 'react'
import { Button as ModalButton, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import Button from 'react-bootstrap/Button'
import axios from 'axios'


class LeaveRequestStaffModal extends React.Component {


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
    

    displayUserRequestTable = () => {
        return <Fragment> 
            <table> 
                <tr> 
                    <th scole="row">First name: </th>
                    <td> &emsp;{this.props.request.firstName} </td>
                </tr>
                <tr> 
                    <th scole="row">Last name: </th>
                    <td> &emsp;{this.props.request.lastName} </td>
                </tr>
                <tr> 
                    <th scole="row">Role: </th>
                    <td> &emsp;{this.staffRoleDisplay()} </td>
                </tr>
                <tr> 
                    <th scole="row">Leave type: </th>
                    <td>  &emsp;{this.leaveTypeDisplay()} </td>
                </tr>
                <tr> 
                    <th scole="row">Additional note: </th>
                    <td style={{wordBreak: "break-all"}}>  &emsp;{this.noteDisplay()} </td>
                </tr>
                <tr> 
                    <th scole="row">Start date: </th>
                    <td>  &emsp; {new Date(this.props.request.startDate).toLocaleDateString("en-US")} </td>
                </tr>
                <tr> 
                    <th scole="row">End date: </th>
                    <td >  &emsp; {new Date(this.props.request.endDate).toLocaleDateString("en-US")} </td>
                </tr>
            </table>
        </Fragment>
    }


    render() {
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
                                        </div>
                                </div>

                                <br/>
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