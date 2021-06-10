/* eslint-disable */
var calendar;

/**
 * renders the calendar with given event data
 * @param {Object} data 
 */
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

/**
 * ondocument load render the calendar
 */
document.addEventListener('DOMContentLoaded', function () {
  let existing = localStorage.getItem('currentEvents');
  createCalendar(JSON.parse(existing));
});

const menuToggle = document.querySelector('main');

/**
 * when the page size is altered need to update the calendar size
 */
menuToggle.addEventListener('transitionend', () => {
  calendar.updateSize();
});
