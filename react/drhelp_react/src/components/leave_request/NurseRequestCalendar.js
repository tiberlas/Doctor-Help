import React from 'react'
import {NurseContext} from '../../context/NurseContextProvider'
import axios from 'axios'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import bootstrapPlugin from '@fullcalendar/bootstrap'
import interaction from "@fullcalendar/interaction"
import Moment from 'moment';
import '../../main.scss' 
import LeaveRequestModal from './LeaveRequestModal'

class NurseRequestCalendar extends React.Component {

    static contextType = NurseContext
    
    state = {
        appointments: [],
        businessHours: [],
        showRequestModal: false,
        selectedDates: {},
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
        this.setState({ showRequestModal: !this.state.showRequestModal})
      }

    componentDidMount() {
        let url = 'http://localhost:8080/api/appointments/leave-request-appointments/nurse=' + this.context.nurse.id 
        axios.get(url).then((response) => {
            this.setState({
            appointments: response.data
            })
        })

        axios.get('http://localhost:8080/api/nurses/nurse='+this.context.nurse.id+'/business-hours')
        .then(response => {
        this.setState({businessHours: response.data}, () => {
            console.log('business hours:', this.state.businessHours)
        })
        })
    }


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
              color: '#ff9f89',
              allDay: true
            }
    
            events.push(event)
        }
        return events
    }


    handleSelectedDates = (info) => {
        this.setState({showRequestModal: true, selectedDates: info}, () => { console.log('selected ' + info.startStr + ' to ' + info.endStr)})
    }

    render() {
        return (
            <div className='demo-app-calendar'> 
                <FullCalendar defaultView="dayGridMonth" 
              header={{
                  left: '',
                  center: "title",
                  right: "prev,next"
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

              selectAllow={ //restrikcija da se ne mogu selektovati datumi pre danas
                function(selectInfo) {
                  return Moment().diff(selectInfo.start) <= 0
                }
              }
              select={ //aktivira modal kojem prosledjuje datume koji su selektovani
                    this.handleSelectedDates
              }
              events = {this.generateEventList()}
              eventLimit = {true}
              eventRender={this.handleEventRender}
              eventClick={this.handleEventClick}
              plugins={[ dayGridPlugin, bootstrapPlugin, interaction]} 
                themeSystem = 'bootstrap' />

             {this.state.showRequestModal 
                && <LeaveRequestModal modal={this.state.showRequestModal} 
                                      toggle={this.toggle}
                                      appointments={this.state.appointments}
                                      selectedDates={this.state.selectedDates}/>}

            </div>
        )
    }
}

export default NurseRequestCalendar