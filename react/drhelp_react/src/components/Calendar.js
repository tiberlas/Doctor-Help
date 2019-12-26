import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid"
import bootstrapPlugin from '@fullcalendar/bootstrap'

 import '../main.scss' // webpack must be configured to do this

class Calendar extends React.Component {


  componentDidMount() {
    if(this.props.role === 'nurse') {
        alert('im a nurse')
    } else {
      alert("im a doctor")
    }
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
          plugins={[ dayGridPlugin, timeGridPlugin, bootstrapPlugin]} 
          themeSystem = 'bootstrap' />
        </div>
      )
  }

}
export default Calendar