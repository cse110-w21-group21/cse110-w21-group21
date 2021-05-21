/* eslint-disable */
var calendar;
function createCalendar(data) {
  var calendarEl = document.getElementById('calendar');
  calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'timeGridDay',
    aspectRatio: 2,

    customButtons: {
      today: {
        text: 'today',
        click: function() {
          localStorage.removeItem('dateClicked');
          calendar.today();
        }
      }
    },
    eventClick: function (info) {
      let date = info.event.start.toISOString().slice(0, 10);
        let existing = localStorage.getItem('currentEvents');

        existing = JSON.parse(existing);

      for (let i = 0; i < existing.length; i += 1) {
        if(existing[i].title === info.event.title) {
          existing.splice(i,1);
        }
      }

      localStorage.setItem('currentEvents', JSON.stringify(existing));

      info.event.remove();
    },
    
    events: data
    
  });
  var todaysDate = localStorage.getItem('dateClicked');
  if(todaysDate !== null) {
    calendar.gotoDate(todaysDate);
  }
  calendar.render();
}

document.addEventListener('DOMContentLoaded', function () {
  let existing = localStorage.getItem('currentEvents');
  createCalendar(JSON.parse(existing));
});

const menuToggle = document.querySelector('main');
menuToggle.addEventListener('transitionend', () => {
  calendar.updateSize();
});
