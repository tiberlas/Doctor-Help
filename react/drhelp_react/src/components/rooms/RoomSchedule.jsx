import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import axios from 'axios';

 import '../../main.scss' // webpack must be configured to do this

class RoomSchedule extends React.Component {

    state = {
        appointments: [],
        event: {
            id: 0,
            title: '',

        }
    }

  componentDidMount() {
    let path_parts = window.location.pathname.split('schedule/')
    axios.get(`http://localhost:8080/api/rooms/room=${path_parts[1]}/schedule`)
        .then((response) => {
            this.setState({appointments: response.data})
        })
  }

  generateEvents = () => {
    let events = []
    for(let i = 0; i < this.state.appointments.length; i++) {
        let event = {
            id: this.state.appointments[i].appointmentId,
            title: this.state.appointments[i].title,
            start: this.state.appointments[i].date +'T'+ this.state.appointments[i].startTime,
            end: this.state.appointments[i].date +'T'+ this.state.appointments[i].endTime
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
          events = {this.generateEvents()}
          plugins={[ dayGridPlugin, timeGridPlugin, bootstrapPlugin]} 
          themeSystem = 'bootstrap' />
        </div>
      )
  }

}
export default RoomSchedule