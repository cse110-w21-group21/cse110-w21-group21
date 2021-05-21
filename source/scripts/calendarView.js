/* eslint-disable */
const eventCreation = document.getElementById('createEventForm');

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

/**
 *    let date = info.event.start.toISOString().slice(0, 10);
      let existing = localStorage.getItem('currentEvents');

      existing = JSON.parse(existing);

      for (let i = 0; i < existing.length; i += 1) {
        if(existing[i].title === info.event.title) {
          existing.splice(i,1);
        }
      }
      localStorage.setItem('currentEvents', JSON.stringify(existing));

      info.event.remove();
 */