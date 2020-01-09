import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid"
import bootstrapPlugin from '@fullcalendar/bootstrap'
import interaction from "@fullcalendar/interaction"
import listPlugin from '@fullcalendar/list'
import AppointmentInfoModal from '../appointment/AppointmentInfoModal'
import AppointmentModal from '../appointment/AppointmentModal'
import axios from 'axios'
import '../../main.scss' //webpack must be configured to do this

class DoctorCalendar extends React.Component {

  state = {
    appointments: [],
    infoModal: false,
    appointmentModal: false,
    showConfirmModal: false,
    showConfirmAppointment: false,
    event: {
      id: 0,
      title: "",
      start: new Date(),
      end: new Date(),
      patient: "",
      procedure: "",
      price: "",
      discount: "",
      status: "",
      patientInsurance: ""
    }
  }

  toggle = () => {
    this.setState({ infoModal: !this.state.infoModal, showConfirmModal: false, showConfirmAppointment: false});
  }

  toggleAppointment = () => {
    this.setState({infoModal: false, appointmentModal: !this.state.appointmentModal, showConfirmModal: false, showConfirmAppointment: false})
  }


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
          discount: event.extendedProps.discount,
          status: event.extendedProps.status,
          patientInsurance: event.extendedProps.patientInsurance
        }
     });
  };

  componentDidMount() {
    if(this.props.regime === 'schedule') {
        let url = 'http://localhost:8080/api/appointments/all_appointments/doctor=' + this.props.medical_staff.id 
        axios.get(url).then((response) => {
            this.setState({
              appointments: response.data
            })
        })
      }
  }

  componentWillReceiveProps(props){
    if(this.props.regime === 'profile') {
      let id = window.location.href.split('profile/')[1] //get the forwarded insurance id from url
      let url = 'http://localhost:8080/api/appointments/approved_appointments/doctor='+props.medical_staff.id+'/patient='+id
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
        let discountInfo = appointment.discount
        let insuranceInfo = appointment.insuranceNumber

        let event = { 
          id: appointment.appointment_id,
          title: info, 
          start: start,
          end: end, 
          patient: patientInfo,
          status: statusInfo,
          procedure: procedureInfo,
          price: priceInfo,
          discount: discountInfo,
          patientInsurance: insuranceInfo
        }

        events.push(event)
    }
    return events
  }

  render() {
      return (
        <div className='demo-app-calendar'>
          {this.props.regime==='schedule' &&  <FullCalendar defaultView="dayGridMonth" //ako si na stranici za raspored, daygrid view
          header={{
            left: "prev,next today",
            center: "title",
            right: "dayGridYear, dayGridMonth,timeGridWeek,timeGridDay"
          }}
          buttonText={
            {
              prev: '<',
              next: '>'
            }
          }  
          selectable={true}
          events = {this.generateEventList()}
          eventLimit = {true}
          eventRender={this.handleEventRender}
          eventClick={this.handleEventClick}
          plugins={[ dayGridPlugin, timeGridPlugin, bootstrapPlugin, interaction]} 
          themeSystem = 'bootstrap' />} 

        {this.props.regime==='profile' &&  <FullCalendar defaultView="listWeek" //ako si na stranici pacijenta, list view
          header={{
            left: "title",
            center: "Upcoming appointments",
            right: ""
          }}
          selectable={true}
          events = {this.generateEventList()}
          eventLimit = {true}
          eventRender={this.handleEventRender}
          eventClick={this.handleEventClick}
          plugins={[ listPlugin, bootstrapPlugin, interaction]} 
          themeSystem = 'bootstrap' />} 
         

          <AppointmentInfoModal 
            event = {this.state.event} 
            confirmModal = {this.state.confirmModal}
            modal = {this.state.infoModal} 
            toggle = {this.toggle} 
            toggleAppointment = {this.toggleAppointment}
           />
          <AppointmentModal 
            event = {this.state.event} 
            showConfirmAppointment = {this.state.showConfirmAppointment} 
            modal = {this.state.appointmentModal} 
            toggleAppointment = {this.toggleAppointment}
          />

        </div>
      )
  }

}
export default DoctorCalendar