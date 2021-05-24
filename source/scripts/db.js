/* eslint-disable */
let db;

/**
 * Views a note for the current day, if it's from the weekly page
 * load only important notes.
 *
 * @param {fromWeekly} - Boolean - If it's from the weekly page
 * @param {event} - event default click event
 */
function viewNote(fromWeekly) {
  const tx = db.transaction("personal_notes", "readonly");
  const pNotes = tx.objectStore("personal_notes");

  const today = new Date();
  const date = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;
  console.log(date);
  const request = pNotes.get(date);

  request.onerror = function err(error) {
    // Handle errors!
    console.error(error);
  };
  // load the note from the specified date
  request.onsuccess = function success() {
    document.getElementById("notelist").innerHTML = request.result.text;
    // remove unimportant notes
    if (fromWeekly) {
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
} /* viewNote */

/**
 * Adds a note to the DB. Will be called from createDB to add a note.
 * @param {fromWeekly} - Boolean - If it's from the weekly page
 */
function addNoteDB(fromWeekly) {
  const today = new Date();
  const date = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;
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
      viewNote(fromWeekly);
    } else {
      pNotes.add(note);
    }
  };
} /* addNote */

/**
 * Creates a database and/or upgrades the database
 */
function createDB(fromWeekly) {
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
      addNoteDB(fromWeekly);
    };

    console.log(
      `upgrade is called database name: ${db.name} version : ${db.version}`
    );
  };
  // on success
  request.onsuccess = (e) => {
    db = e.target.result;
    addNoteDB(fromWeekly);
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

  const today = new Date();
  const date = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;
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

export { createDB, addNoteDB, updateNote, viewNote };
