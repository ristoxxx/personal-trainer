import React, { Component, useState } from 'react';
import { render } from 'react-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Includes fractions of code from here https://shahzeb.svbtle.com/getting-react-big-calendar-to-work
// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.

function BCalendar() {

const localizer = momentLocalizer(moment);
//const localizer = Calendar.momentLocalizer(moment) // or globalizeLocalizer

const now = new Date();
const [events, setEvents] = useState([
  {
      id: 0,
      title: 'All Day Event very long title',
      allDay: true,
      start: new Date(2019, 6, 0),
      end: new Date(2019, 6, 1),
  },
  {
      id: 1,
      title: 'Long Event',
      start: new Date(2019, 3, 7),
      end: new Date(2019, 3, 10),
  },
  {
      id: 2,
      title: 'Time is right for Romans baby',
      start: now,
      end: now,
  },
  {
      id: 3,
      title: 'Spinning',
      start: new Date(moment('2021-01-01T05:31:09.035+0000').toDate()),
      end: new Date(moment('2021-01-01T05:31:09.035+0000').add(120, 'minutes').toDate()),    
  },
]);
//const [events, setEvents] = useState();
// this.state = {
//   events
// };


return (
<div style={{ height: '500pt'}}>
          <Calendar
            events={events}
            startAccessor="start"
            endAccessor="end"
            defaultDate={moment().toDate()}
            localizer={localizer}
          />
        </div>
);

}

export default BCalendar;