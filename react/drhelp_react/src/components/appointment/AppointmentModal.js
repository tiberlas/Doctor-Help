import React, {Fragment} from 'react'
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import {Row, Col} from 'react-bootstrap'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import OverviewTable from './OverviewTable'
import HealthRecord from './HealthRecord'
import ExaminationReport from './ExaminationReport'

class AppointmentModal extends React.Component {
    
  
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
                                   <ExaminationReport data = {this.props.event} />
                                 </ModalBody>
                                </Tab.Pane>
                            </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>


                 
                    <ModalFooter>
                    <Button color="secondary" onClick={() => {this.props.toggleAppointment()}}> Finish </Button> 
                    </ModalFooter>
                </Modal>
            </Fragment>

        )
    }
}

export default AppointmentModal