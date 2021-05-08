const eventCreation = document.getElementById('createEventForm');

function createCalendar(data) {
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },

    dateClick: function (date, jsEvent, view) {
      if (this.view.type == 'dayGridMonth' || this.view.type == 'timeGridWeek') {
        this.gotoDate(date.dateStr);
        this.changeView('timeGridDay', date.dateStr);
      }
    },

    eventClick: function (info) {
      let date = info.event.start.toISOString().slice(0, 10);
      if (this.view.type == 'dayGridMonth' || this.view.type == 'timeGridWeek') {
        this.gotoDate(date);
        this.changeView('timeGridDay', date);
      } else {
        let existing = localStorage.getItem('currentEvents');

        existing = JSON.parse(existing);

        for (let i = 0; i < existing.length; i++) {
          if(existing[i].title == info.event.title) {
            existing.splice(i,1);
          }
        }
        localStorage.setItem('currentEvents', JSON.stringify(existing));

        info.event.remove();
      }
    },
    events: data
  });

  calendar.render();
}

document.addEventListener('DOMContentLoaded', function () {
  let existing = localStorage.getItem('currentEvents');
  createCalendar(JSON.parse(existing));
});

eventCreation.addEventListener('submit', function () {
  let inputTitle = document.getElementById('title').value;
  let startDate = document.getElementById('start').value;
  let endDate = document.getElementById('end').value;
  let colorSelection = document.getElementById('colorSelect').value;
  let existing = localStorage.getItem('currentEvents');

  existing = JSON.parse(existing);
  if(Array.isArray(existing)) {
    existing.push({ title: inputTitle, start: startDate, end: endDate, color: colorSelection });
  } else {
    existing = { title: inputTitle, start: startDate, end: endDate, color: colorSelection }; 
    existing = [ existing ];
  }
  localStorage.setItem('currentEvents', JSON.stringify(existing));

  createCalendar(existing);
});