/* eslint-disable*/

import { createDB, viewNoteWeekly, db } from "./db.js";

window.onload = () => {
  createDB(true);
};

/**
 * Waits .2 seconds after DOMContentLoaded to make sure the calendar data is accessible
 * Displays important notes for the current week when the weekly page is refreshed
 */
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const tx = db.transaction("personal_notes", "readwrite");
    const pNotes = tx.objectStore("personal_notes");
    document.getElementById("notelist").innerHTML = "Weekly Overview:";
    for (let i = 1; i < 8; i++) {
      //thisDay is one day before the start of the week, thus the loop starts at 1
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
    e.target.className === "fc-icon fc-icon-chevron-left"
  ) {
    const tx = db.transaction("personal_notes", "readwrite");
    const pNotes = tx.objectStore("personal_notes");
    document.getElementById("notelist").innerHTML = "Weekly Overview:";
    for (let i = 1; i < 8; i++) {
      //thisDay is one day before the start of the week, thus the loop starts at 1
      let thisDay = new Date(calendar.currentData.currentDate);
      thisDay.setDate(thisDay.getDate() + i);
      const date = `${thisDay.getFullYear()}-${
        thisDay.getMonth() + 1
      }-${thisDay.getDate()}`;
      viewNoteWeekly(date);
    }
  }
});
