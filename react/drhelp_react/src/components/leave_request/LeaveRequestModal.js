import React, {Fragment} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import {Link} from 'react-router-dom'
import axios from 'axios'
import Moment from 'moment';

class LeaveRequestModal extends React.Component {

    state = {
        ableToRequest: true,
        leaveType: "",
        note: "", 
        showNote: false

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
            console.log('bigboy start date ', new Date(this.props.appointments[0].startDate).toISOString().split('T')[0])
        }

        this.setState({ableToRequest: able})

    }


    displayUnableToRequest = () => {
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
        let leaveType = this.state.leaveType
        if(leaveType === "Personal") {
            leaveType = "Personal leave"
        }
       return <Fragment>                
                    {/* <div class="row d-flex justify-content-center">
                        <div class='col-md-11'>
                            <h4> Request overview </h4>
                        </div>
                    </div> */}

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
                                value="Personal"
                                checked={this.state.leaveType === "Personal"}
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
                            && <textarea name="note" onChange={this.handleChange} placeholder="Aditional note will make your request better!" style={{resize: "none"}}/>}

                        </div>
                    </div>

                  
                                            
                </Fragment>
    }

    handleConfirm = () => {
        this.setState({confirmRequest: false}, () => {
            this.props.toggle()
        })
    }
    generateMyNonBreakableSpaces = () => { //:D
        let items = []
        for(let i=0;i<80;i++)
            items.push('\u00A0')
        return items
    }


    render() {
        console.log('states are:', this.state)
        return (
            <Fragment>
                <div class="modal-body">
                     <div class="container-fluid">
                            <Modal
                            isOpen={this.props.modal}
                            toggle={this.props.toggle}
                            className={this.props.className} >
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
                        </div>
                    </div>
            </Fragment>
        )
    }
}


export default LeaveRequestModal