/* eslint-disable */
var calendar;
function createCalendar(data) {
  var calendarEl = document.getElementById('calendar');

  calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'timeGridWeek',
    aspectRatio: 2,
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
    },

    dateClick: function (date,) {
      localStorage.setItem('dateClicked', date.dateStr);
      location.href = "./dailyLog.html";
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