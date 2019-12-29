import React, {Fragment} from 'react'
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import {Row, Col} from 'react-bootstrap'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import OverviewTable from './OverviewTable'
import HealthRecord from './HealthRecord'
import ExaminationReport from './ExaminationReport'

class AppointmentModal extends React.Component {
    
    state = {
        selectedDiagnosis: "",
        selectedMedication: [],
        note: "",
        confirmFinish: false
    }

    handleDiagnosisChange = (option) => {
        console.log("diagnosis", option.label)
        this.setState({selectedDiagnosis: option.label})
    }

    handleMedicationChange = (options) => {
        if(options === null) {
            this.setState({selectedMedication: []})
            return
        }
        let medication = []
        for(let i=0; i<options.length; i++) {
            medication.push(options[i].label)
        }
        console.log("BOG:", medication)
        console.log("STATE:", medication)
        this.setState({selectedMedication: medication})
    }

    handleNotesChange = (e) => {
        console.log("owowo", e.target.value)
        this.setState({note: e.target.value})
    }

    componentWillReceiveProps(props) {
        this.setState({ confirmFinish: props.showConfirmAppointment})
        console.log("props", props.showConfirmAppointment)
    }


    handleFinish = () => {
        this.props.toggleAppointment()
        console.log("so far diagnosis:", this.state.selectedDiagnosis)
        console.log("so far medication:", this.state.selectedMedication)
        console.log("so far note:", this.state.note)
    }
  
    render() {
        return (
            <Fragment> 
                <Modal
                isOpen={this.props.modal}
                toggle={this.props.toggle}
                className={this.props.className + " modal-lg"} 
                >
                    <ModalHeader className = "text-align:center">
                    Appointment
                    </ModalHeader>

                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Row>
                            <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                <Nav.Link eventKey="first">Overview</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                <Nav.Link eventKey="second">Health record</Nav.Link>
                                </Nav.Item>

                                <Nav.Item>
                                <Nav.Link eventKey="third">Examination report</Nav.Link>
                                </Nav.Item>

                                <Nav.Item>
                                <Nav.Link eventKey="fourth">Schedule another</Nav.Link>
                                </Nav.Item>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                            </Nav>
                            </Col>
                            <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <ModalBody>
                                        <OverviewTable data = {this.props.event}/>
                                    </ModalBody>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                <ModalBody>
                                   <HealthRecord data = {this.props.event} />
                                 </ModalBody>
                                </Tab.Pane>
                                <Tab.Pane eventKey="third">
                                <ModalBody>
                                   <ExaminationReport 
                                    data={this.props.event}
                                    handleDiagnosisChange={this.handleDiagnosisChange}
                                    handleMedicationChange={this.handleMedicationChange}
                                    handleNotesChange={this.handleNotesChange} />
                                 </ModalBody>
                                </Tab.Pane>
                            </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>


                 
                    <ModalFooter>
                    {!this.state.confirmFinish && <Button color="secondary" onClick={() => {this.setState({confirmFinish: true})}}> Finish </Button>}
                    {this.state.confirmFinish &&  <Fragment>
                        <p> You are about to finish the appointment.
                        Should you proceed? </p><br/>
                        <Button color = "secondary" onClick = {() => {this.setState({confirmFinish: false})}}> Back</Button> 
                        <Button color = "primary" onClick = {this.handleFinish}>Yes</Button> 
                    </Fragment>}
                   
                    </ModalFooter>
                </Modal>
            </Fragment>

        )
    }
}

export default AppointmentModal