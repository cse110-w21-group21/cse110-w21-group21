/* eslint-disable */
let db;

/**
 * Views a note for the current day
 * @param {Function} myCallback - function to be called after notes are loaded
 */
function viewNote(myCallback) {
  const tx = db.transaction("personal_notes", "readonly");
  const pNotes = tx.objectStore("personal_notes");

  const thisDay = new Date(calendar.currentData.viewTitle);
  const date = `${thisDay.getFullYear()}-${
    thisDay.getMonth() + 1
  }-${thisDay.getDate()}`;
  const request = pNotes.get(date);

  request.onerror = function err(error) {
    // Handle errors!
    console.error(error);
  };

  // load the note from the specified date
  request.onsuccess = function success() {
    if (
      !(
        request.result === undefined ||
        request.result.text === "" ||
        request.result.text === "<br>"
      )
    ) {
      document.getElementById("notelist").innerHTML = request.result.text;
      typeof myCallback === 'function' && myCallback();
    }
  };
} /* viewNote */

/**
 * Views all saved notes for the current week
 * @param {*} date - the day within the week
 */
function viewNoteWeekly(date) {
  const tx = db.transaction("personal_notes", "readonly");
  const pNotes = tx.objectStore("personal_notes");
  const request = pNotes.get(date);

  request.onerror = function err(error) {
    // Handle errors!
    console.error(error);
  }; /* viewNoteWeekly */

  // load the note from the specified date
  request.onsuccess = function success() {
    if (
      !(
        request.result === undefined ||
        request.result.text === "" ||
        request.result.text === "<br>"
      )
    ) {
      document.getElementById("notelist").innerHTML += request.result.text;

      // remove unimportant notes
      let unimportantNotes = document.querySelectorAll(
        'bullet-note[data-important="false"]'
      );
      unimportantNotes.forEach((u) => {
        u.remove();
      });
      let noteTextboxes = document.querySelectorAll(".textbox");
      noteTextboxes.forEach((t) => {
        let t2 = t;
        t2.contentEditable = false;
      });
    }
  };
}

/**
 * Adds a note to the DB. Will be called from createDB to add a note.
 * @param {Boolean} fromWeekly - If it's from the weekly page
 * @param {Function} myCallback - function to be called after notes are loaded
 */
function addNoteDB(fromWeekly,myCallback) {
  const thisDay = new Date(calendar.currentData.viewTitle);
  const date = `${thisDay.getFullYear()}-${
    thisDay.getMonth() + 1
  }-${thisDay.getDate()}`;

  const noteString = document.getElementById("notelist").innerHTML;
  const note = {
    time: Math.floor(Date.now() / 1000),
    date,
    text: noteString,
  };

  const tx = db.transaction("personal_notes", "readwrite");
  tx.onerror = (e) => alert(` Error! ${e.target.error}  `);
  const pNotes = tx.objectStore("personal_notes");
  const request = pNotes.get(date);
  request.onerror = function err(error) {
    console.error(error);
  };
  request.onsuccess = (e) => {
    // if note exists view it, otherwise add note
    const data = e.target.result;
    if (data) {
      viewNote(myCallback);
    } else {
      pNotes.add(note);
    }
  };
} /* addNote */

/**
 * Creates a database and/or upgrades the database
 * @param {Boolean} fromWeekly - If it's from the weekly page
 * @param {Function} myCallback - function to be called after notes are loaded
 */
function createDB(fromWeekly,myCallback) {
  const request = indexedDB.open("noteDB", 1);

  // on upgrade needed --> if database doesn't exist
  request.onupgradeneeded = (e) => {
    db = e.target.result;

    const objStore = db.createObjectStore("personal_notes", {
      keyPath: "date",
    });
    objStore.createIndex("date", "date", { unique: false });

    // wait until notes are ready to be populated
    const transaction = e.target.transaction;
    transaction.oncomplete = function () {
      if(!fromWeekly){
        addNoteDB(fromWeekly,myCallback);
      }
    };

    console.log(
      `upgrade is called database name: ${db.name} version : ${db.version}`
    );
  };
  // on success
  request.onsuccess = (e) => {
    db = e.target.result;
    if(!fromWeekly){
      addNoteDB(fromWeekly,myCallback);
    }
    console.log(
      `success is called database name: ${db.name} version : ${db.version}`
    );
  };
  // on error
  request.onerror = (e) => {
    console.log(`error: ${e.target.error} was found `);
  };
} /* createDB  */

/**
 * Updates a note to the DB. Should be called after editing notes.s
 */
function updateNote() {
  const tx = db.transaction("personal_notes", "readwrite");
  const pNotes = tx.objectStore("personal_notes");

  const thisDay = new Date(calendar.currentData.viewTitle);
  const date = `${thisDay.getFullYear()}-${
    thisDay.getMonth() + 1
  }-${thisDay.getDate()}`;
  const request = pNotes.get(date);

  request.onerror = function err(error) {
    // Handle errors!
    console.log(error);
  };
  request.onsuccess = function success(e) {
    const data = e.target.result;
    data.text = document.getElementById("notelist").innerHTML;

    const requestUpdate = pNotes.put(data);
    requestUpdate.onerror = function err(error) {
      console.log(error);
    };
    requestUpdate.onsuccess = function successful() {
      console.log("updated");
    };
  };
} /* updateNote */

export { createDB, updateNote, viewNote, db, addNoteDB, viewNoteWeekly };
