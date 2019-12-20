import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import bootstrapPlugin from '@fullcalendar/bootstrap'

 import '../../main.scss' // webpack must be configured to do this

class Calendar extends React.Component {

  render() {
    return (

      <div className='demo-app-calendar'>
        <FullCalendar defaultView="dayGridMonth" plugins={[ dayGridPlugin, bootstrapPlugin]} themeSystem = 'bootstrap' />
      </div>
    )
  }

}
export default Calendar