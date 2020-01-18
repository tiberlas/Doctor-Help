import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid"
import bootstrapPlugin from '@fullcalendar/bootstrap'
import interaction from "@fullcalendar/interaction"
import listPlugin from '@fullcalendar/list'
import NurseAppointmentInfoModal from '../appointment/NurseAppointmentInfoModal'
import axios from 'axios'
import '../../main.scss' //webpack must be configured to do this

class NurseCalendar extends React.Component {

    state = {
        appointments: [],
        businessHours: [],
        infoModal: false, 
        event: {
            id: 0,
            title: "",
            start: new Date(),
            end: new Date(),
            patient: "",
            doctor: "",
            procedure: "",
            price: "",
            discount: "",
            status: "",
            patientInsurance: ""
        }
    }

    toggle = () => {
        this.setState({ infoModal: !this.state.infoModal})
      }

    componentDidMount() {
      if(this.props.regime === 'schedule') {
            let url = 'http://localhost:8080/api/appointments/all_appointments/nurse=' + this.props.medical_staff.id 
            axios.get(url).then((response) => {
                this.setState({
                  appointments: response.data
                })
            })

            axios.get('http://localhost:8080/api/nurses/nurse='+this.props.medical_staff.id+'/business-hours')
            .then(response => {
              this.setState({businessHours: response.data}, () => {
                console.log('business hours:', this.state.businessHours)
              })
            })

          }
      }

      componentWillReceiveProps(props) {
        if(props.regime === 'history') {
          let id = window.location.href.split('profile/')[1] //get the forwarded insurance id from url
          let url = 'http://localhost:8080/api/appointments/done_appointments/nurse/patient='+id
          axios.get(url).then((response) => {
            this.setState({
              appointments: response.data
            })
          })
        }
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
              doctor: event.extendedProps.doctor,
              procedure: event.extendedProps.procedure,
              price: event.extendedProps.price,
              discount: event.extendedProps.discount,
              status: event.extendedProps.status,
              patientInsurance: event.extendedProps.patientInsurance
            }
         });
      };

    generateEventList = () => {
        let events = []
        let info = ''
        for(let i = 0; i < this.state.appointments.length; i++) {
            let appointment = this.state.appointments[i]

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

            let doctorInfo = appointment.doctorFirstName + ' ' + appointment.doctorLastName
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
              doctor: doctorInfo,
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

        return(
            <div className='demo-app-calendar'> 
                  {this.props.regime === 'schedule' && <FullCalendar defaultView="dayGridMonth" 
              header={{
                  left: "prev,next, today",
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
              selectable={true}
              events = {this.generateEventList()}
              eventLimit = {true}
              eventRender={this.handleEventRender}
              eventClick={this.handleEventClick}
              plugins={[ dayGridPlugin, timeGridPlugin, bootstrapPlugin, interaction]} 
            themeSystem = 'bootstrap' /> }


              {this.props.regime === 'history' && <FullCalendar defaultView="listYear" //ako si na stranici pacijenta za history, list view
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
              
              <NurseAppointmentInfoModal
                event = {this.state.event}
                modal = {this.state.infoModal}
                toggle = {this.toggle}
              />
          </div>
        )
    }

}


export default NurseCalendar