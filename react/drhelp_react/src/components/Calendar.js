import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid"
import bootstrapPlugin from '@fullcalendar/bootstrap'
import interaction from "@fullcalendar/interaction";
import axios from 'axios'
import '../main.scss' // webpack must be configured to do this
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"

class Calendar extends React.Component {

  state = {
    appointments: [],
    modal: false,
    event: {
      id: 0,
      title: "",
      start: new Date(),
      end: new Date(),
      patient: "",
      procedure: "",
      price: "",
      status: ""
    }
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleEventClick = ({ event, el }) => {
    this.toggle();
    this.setState({ 
        event: {
          id: event.id,
          title: event.title,
          start: event.start,
          end: event.end,
          patient: event.extendedProps.patient,
          procedure: event.extendedProps.procedure,
          price: event.extendedProps.price,
          status: event.extendedProps.status
        }
     });
  };

  componentDidMount() {
    if(this.props.medical_staff.role === 'nurse') {
        alert('im a nurse' + this.props.medical_staff.id)
    } else {
      let url = 'http://localhost:8080/api/appointments/all_appointments/doctor=' + this.props.medical_staff.id 
      axios.get(url).then((response) => {
          this.setState({
            appointments: response.data
          })
      })
    }
  }


  generateEventList = () => {
    let events = []
    let info = ''
    for(let i = 0; i < this.state.appointments.length; i++) {
        let appointment = this.state.appointments[i]
        if (appointment.isOperation) {
          info = 'Operation\n'
        } else {
          info = 'Appointment\n'
        }

        info += ' in ' + appointment.roomName + ' ' + appointment.roomNumber
        let start = new Date(appointment.startDate).toISOString()
        let end = new Date(appointment.endDate).toISOString()

        let patientInfo = ''
        if(appointment.patientFirstName.includes('-'))
        {
          patientInfo = '-'
        } else {
          patientInfo = appointment.patientFirstName + ' ' + appointment.patientLastName
        }

        let statusInfo = appointment.status
        let procedureInfo = appointment.procedureName
        let priceInfo = appointment.price

        let event = 
        { 
          id: appointment.appointment_id,
          title: info, 
          start: start,
          end: end, 
          patient: patientInfo,
          status: statusInfo,
          procedure: procedureInfo,
          price: priceInfo
        }

        events.push(event)
    }
    return events
  }

 

  render() {


      return (
        <div className='demo-app-calendar'>
          <FullCalendar defaultView="dayGridMonth" 
          header={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay"
          }}
          selectable={true}
          events = {this.generateEventList()}
          eventLimit = {true}
          eventRender={this.handleEventRender}
          eventClick={this.handleEventClick}
          plugins={[ dayGridPlugin, timeGridPlugin, bootstrapPlugin, interaction]} 
          themeSystem = 'bootstrap' />

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className} >
                    <ModalHeader toggle={this.toggle}>
                      {this.state.event.title}
                    </ModalHeader>
                    <ModalBody>
                      <div>
                        <p>Patient: {this.state.event.patient}</p>
                        <p>Status: {this.state.event.status}</p>
                        <p>Procedure: {this.state.event.procedure}</p>
                        <p>Price with discount: {this.state.event.price}</p>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary">Do Something</Button>{" "}
                      <Button color="secondary" onClick={this.toggle}>
                        Cancel
                      </Button>
                    </ModalFooter>
                  </Modal>

        </div>
      )
  }

}
export default Calendar