/* eslint-disable*/

import { createDB, viewNoteWeekly, db } from "./db.js";

window.onload = () => {
  createDB(true);
};

/**
 * Displays note content from the past 7 days on weekly page only upon its first time loading
 * Implemented it like this instead of extracting the exact week because its difficult to find
 * the beginning of the week on page refresh with FullCalendar for some reason. So this uses
 * the current date and goes back 7 days instead of finding the week. The content will change to
 * the "Weekly Overview" when the week is changed
 */
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const tx = db.transaction("personal_notes", "readwrite");
    const pNotes = tx.objectStore("personal_notes");
    document.getElementById("notelist").innerHTML =
      "Highlights From The Past 7 Days:";
    for (let i = 7; i >= 0; i--) {
      let thisDay = new Date(calendar.currentData.currentDate);
      thisDay.setDate(thisDay.getDate() - i);
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
      let thisDay = new Date(calendar.currentData.currentDate);
      thisDay.setDate(thisDay.getDate() + i);
      const date = `${thisDay.getFullYear()}-${
        thisDay.getMonth() + 1
      }-${thisDay.getDate()}`;
      viewNoteWeekly(date);
    }
  }
});
