/* eslint import/extensions: "off" */
/* eslint no-undef: "error" */

import { createDB, viewNote } from "./db.js";

window.onload = () => {
  createDB(true);
};

document.getElementById("btnViewNote").addEventListener("click", (event) => {
  viewNote(event, true);
});

var calendar;
function createCalendar(data) {
  var calendarEl = document.getElementById('calendar');

  calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'timeGridWeek',
    aspectRatio: 2,

    dateClick: function (date) {
      localStorage.setItem('dateClicked', date.dateStr);
      window.location.href = "./dailyLog.html";
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
