/* eslint-disable */
var calendar;
function createCalendar(data) {
  var calendarEl = document.getElementById('calendar');

  calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    aspectRatio: 2,

    dateClick: function (date,) {
      localStorage.setItem('dateClicked', date.dateStr);
      location.href = "./dailyLog.html";
    },
    
    eventClick: function (info) {

    },
    events: data
  });

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