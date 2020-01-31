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
import {DoctorContext} from '../../context/DoctorContextProvider'

class DoctorCalendar extends React.Component {

  static contextType = DoctorContext

  state = {
    appointments: [],
    approvedLeaves: [], //approved leave requests for background events
    businessHours: [],
    operations: [],
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
      patientInsurance: "",
      doctorId: "",
      doctor: "",
      nurse: "",
      operation: false,
      firstDoctor: "",
      secondDoctor: "",
      thirdDoctor: "",
    }
  }

  toggle = (id, declined) => {
    if(declined == true) {
      const items = this.state.appointments.filter(item => item.appointment_id != id);
      this.setState({appointments: items}, () => {
        console.log(this.state.appointments)
        
      });
    }

    this.setState({ infoModal: !this.state.infoModal, showConfirmModal: false, showConfirmAppointment: false});
  }

  toggleAppointment = () => {
    this.setState({infoModal: false, appointmentModal: !this.state.appointmentModal, showConfirmModal: false, showConfirmAppointment: false})
  }


  handleEventClick = ({ event, el }) => {
    
    if(event.extendedProps.leave === true) { //ako je leave request, iskaci
      return
    }

    
    this.setState({ 
        event: {
          id: event.id,
          title: event.title,
          start: event.start,
          end: event.end,
          patient: event.extendedProps.patient,
          doctor: event.extendedProps.doctor,
          procedure: event.extendedProps.procedure,
          price: event.extendedProps.price,
          discount: event.extendedProps.discount,
          status: event.extendedProps.status,
          patientInsurance: event.extendedProps.patientInsurance,
          doctorId: event.extendedProps.doctorId,
          nurse: event.extendedProps.nurse,
          operation: event.extendedProps.operation,
          firstDoctor: event.extendedProps.firstDoctor,
          secondDoctor: event.extendedProps.secondDoctor,
          thirdDoctor: event.extendedProps.thirdDoctor
        }
     }, () => {
      this.toggle();
     });
  };

  componentDidMount() {
    if(this.props.regime === 'schedule') {
        this.setState({regime: 'schedule'})
        let url = 'http://localhost:8080/api/appointments/all_appointments/doctor=' + this.context.doctor.id 
        axios.get(url).then((response) => {
            this.setState({
              appointments: response.data
            })
        })

        axios.get('http://localhost:8080/api/operations/all-approved/doctor='+this.context.doctor.id).then(response => {
          this.setState({operations: response.data})
        })

        axios.get('http://localhost:8080/api/doctors/doctor='+this.context.doctor.id +'/business-hours')
            .then(response => {
              this.setState({businessHours: response.data}, () => {
              })
            })

        axios.get('http://localhost:8080/api/leave-requests/get-approved/doctor='+this.context.doctor.id)
            .then(response => {this.setState({approvedLeaves: response.data})})

      }
  }

  componentWillReceiveProps(props){
    if(this.props.regime === 'profile') {
      this.setState({regime: 'profile'})
      let id = window.location.href.split('profile/')[1] //get the forwarded insurance id from url
      let url = 'http://localhost:8080/api/appointments/approved_appointments/doctor='+this.context.doctor.id+'/patient='+id
      axios.get(url).then((response) => {
        this.setState({
          appointments: response.data
        })
      })
    }
    
    if(this.props.regime === 'history') {
      let id = window.location.href.split('profile/')[1] //get the forwarded insurance id from url
      let url = 'http://localhost:8080/api/appointments/done_appointments/doctor/patient='+id
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

        // if (appointment.isOperation) {
        //   info = 'Operation\n'
        // } else {
        //   info = 'Appointment\n'
        // }

        info = appointment.roomName + ' ' + appointment.roomNumber
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
        let doctorIdInfo = appointment.doctorId
        let doctorInfo = appointment.doctorFirstName + ' ' + appointment.doctorLastName
        let nurseInfo = appointment.nurseFirstName + ' ' + appointment.nurseLastName


        let color = ''
        if(statusInfo === 'AVAILABLE') {
          color = '#999900'
        } else if(statusInfo === 'APPROVED') {
          color = '#3CB371'
        } else if(statusInfo === 'DONE') {
          color = '#FF4500'
        }

        console.log('status info', statusInfo)
        if(statusInfo === 'DOCTOR_REQUESTED_APPOINTMENT') { //soba je null za ovaj status, pa se mora promeniti naslov
          info = 'Requested'
          color = '#999900'
          nurseInfo = '-'
        }

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
          patientInsurance: insuranceInfo,
          doctorId: doctorIdInfo,
          doctor: doctorInfo,
          nurse: nurseInfo,
          color: color
        }

        events.push(event)
    }
    return events
  }

  generateLeaveRequestsEventList = () => {
    let events = []
    for(let i = 0; i < this.state.approvedLeaves.length; i++)
    {
      let request = this.state.approvedLeaves[i]
      let start = new Date(request.startDate).toISOString()
      
      let endDate = new Date(request.endDate)
      endDate.setDate(endDate.getDate() + 1)
      let end = endDate.toISOString()

      let event = {
          start: start,
          end: end,
          rendering: 'background',
          color: '#ff9f89', //red
          allDay: true,
          leave: true
      }

      events.push(event)
    }

    return events
  }


  generateOperationList = () => {
    let events = []
    for(let i = 0; i < this.state.operations.length; i++) {
      let operation = this.state.operations[i]

      let start = new Date(operation.startDate).toISOString()
      let end = new Date(operation.endDate).toISOString()

      let color = '#4B0082' //purple

      let event = {
        title: operation.roomName + ' ' + operation.roomNumber,
        start: start,
        end: end,
        patient: operation.patientFirstName + ' ' + operation.patientLastName,
        status: operation.status,
        price: operation.price,
        operation: true,
        firstDoctor: operation.firstDoctor,
        secondDoctor: operation.secondDoctor,
        thirdDoctor: operation.thirdDoctor,
        procedure: operation.procedureName,
        color: color
      }

      events.push(event)
    }

    return events
  }

  render() {
      return (
        <div className='demo-app-calendar'>
          {this.props.regime==='schedule' &&  <FullCalendar id="FullCalendar" defaultView="dayGridMonth" //ako si na stranici za raspored, daygrid view
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
          businessHours = { 
            this.state.businessHours
          }
          eventSources = {
           [
             this.generateEventList(),
             this.generateLeaveRequestsEventList(),
             this.generateOperationList()
           ]
          }
          nowIndicator={true}
          eventLimit = {true}
          eventRender={this.handleEventRender}
          eventClick={this.handleEventClick}
          plugins={[ dayGridPlugin, timeGridPlugin, bootstrapPlugin, interaction]} 
          themeSystem = 'bootstrap' />} 

        {this.props.regime ==='profile' && this.generateEventList().length > 0 && <FullCalendar defaultView="listWeek" //ako si na stranici pacijenta, list view
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
          themeSystem = 'bootstrap' />} {
          this.props.regime === 'profile' && this.generateEventList().length === 0 && <h2>No upcoming appointments. </h2> 
          }

          {this.props.regime==='history' &&  <FullCalendar defaultView="listYear" //ako si na stranici pacijenta za history, list view
          header={{
            left: "",
            center: "title",
            right: "prev, next"
          }}
          buttonText={
            {
              prev: '<',
              next: '>'
            }
          } 
          titleFormat={
            {
             year: 'numeric'
            }
          }
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
            toggle = {(id, declined) => this.toggle(id, declined)} 
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