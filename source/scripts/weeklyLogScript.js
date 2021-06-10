/* eslint-disable no-plusplus */
/* eslint import/extensions: "off" */
/* global FullCalendar */
/* eslint no-undef: 2 */

import { createDB, viewNoteWeekly } from "./db.js";

let calendar;

/**
 * render the calendar with given event data
 * @param {Object} data 
 */
function createCalendar(data) {
  let calendarEl = document.getElementById("calendar");

  calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "timeGridWeek",
    aspectRatio: 2,

    /**
     * upon click of a date traverse to the proper dailyLog page
     * @param {Date} date 
     */
    dateClick(date) {
      localStorage.setItem("dateClicked", date.dateStr);
      window.location.href = "./dailyLog.html";
    },

    events: data,
  });

  calendar.render();
}

/**
 * render the calendar onload of the page
 */
document.addEventListener("DOMContentLoaded", () => {
  let existing = localStorage.getItem("currentEvents");
  createCalendar(JSON.parse(existing));
});

const menuToggle = document.querySelector("main");

/**
 * on page size change resize the calendar
 */
menuToggle.addEventListener("transitionend", () => {
  calendar.updateSize();
});

window.onload = () => {
  createDB(true);
};

/**
 * Waits .2 seconds after DOMContentLoaded to make sure the calendar data is accessible
 * Displays important notes for the current week when the weekly page is refreshed
 */
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.getElementById("notelist").innerHTML = "";
    for (let i = 1; i < 8; i++) {
      // thisDay is one day before the start of the week, thus the loop starts at 1
      let thisDay = new Date(
        document.querySelector(".fc-col-header-cell").getAttribute("data-date")
      );
      thisDay.setDate(thisDay.getDate() + i);
      const date = `${thisDay.getFullYear()}-${
        thisDay.getMonth() + 1
      }-${thisDay.getDate()}`;
      viewNoteWeekly(date);
    }
  }, 200);
});

/**
 * Listener for the prev/next buttons on the weekly log
 * Will change the week and pull up any important notes for
 * that week shown as the "Weekly Overview:"
 */
document.addEventListener("click", (e) => {
  if (
    e.target.className === "fc-next-button fc-button fc-button-primary" ||
    e.target.className === "fc-prev-button fc-button fc-button-primary" ||
    e.target.className === "fc-icon fc-icon-chevron-right" ||
    e.target.className === "fc-icon fc-icon-chevron-left" ||
    e.target.className === "fc-today-button fc-button fc-button-primary"
  ) {
    document.getElementById("notelist").innerHTML = "";
    for (let i = 1; i < 8; i++) {
      // thisDay is one day before the start of the week, thus the loop starts at 1
      let thisDay = new Date(calendar.currentData.currentDate);
      thisDay.setDate(thisDay.getDate() + i);
      const date = `${thisDay.getFullYear()}-${
        thisDay.getMonth() + 1
      }-${thisDay.getDate()}`;
      viewNoteWeekly(date);
    }
  }
});
