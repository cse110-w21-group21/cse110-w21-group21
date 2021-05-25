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
