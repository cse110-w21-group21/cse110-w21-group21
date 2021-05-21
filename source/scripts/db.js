let db;

/**
 * Creates a database and/or upgrades the database
 */
function createDB() {
  const request = indexedDB.open('noteDB', 1);

  // on upgrade needed --> if database doesn't exist
  request.onupgradeneeded = (e) => {
    db = e.target.result;

    const objStore = db.createObjectStore('personal_notes', {
      keyPath: 'date',
    });
    objStore.createIndex('date', 'date', { unique: false });
    console.log(
      `upgrade is called database name: ${db.name} version : ${db.version}`,
    );
  };
  // on success
  request.onsuccess = (e) => {
    db = e.target.result;
    console.log(
      `success is called database name: ${db.name} version : ${db.version}`,
    );
  };
  // on error
  request.onerror = (e) => {
    console.log(`error: ${e.target.error} was found `);
  };
} /* createDB  */

/**
 * Adds a note to the DB. Should be called when first creating a note
 * for the current day.
 *
 * @param {event} - event default click event
 */
function addNoteDB(event) {
  // allRecords.innerHTML = "";
  const today = new Date();
  const date = `${today.getFullYear()}-${today.getMonth() + 1
  }-${today.getDate()}`;
  const noteString = document.getElementById('notelist').innerHTML;
  const note = {
    time: Math.floor(Date.now() / 1000),
    date,
    text: noteString,
  };
  console.log(note);

  const tx = db.transaction('personal_notes', 'readwrite');
  tx.onerror = (e) => alert(` Error! ${e.target.error}  `);
  const pNotes = tx.objectStore('personal_notes');
  pNotes.add(note);
  event.preventDefault();
} /* addNote */

/**
 * Views a note for the current day, if it's from the weekly page
 * load only important notes.
 *
 * @param {fromWeekly} - Boolean - If it's from the weekly page
 * @param {event} - event default click event
 */
function viewNote(event, fromWeekly) {
  const tx = db.transaction('personal_notes', 'readonly');
  const pNotes = tx.objectStore('personal_notes');

  const today = new Date();
  const date = `${today.getFullYear()}-${today.getMonth() + 1
  }-${today.getDate()}`;
  console.log(date);
  const request = pNotes.get(date);

  request.onerror = function err(error) {
    // Handle errors!
    console.log(error);
  };
  request.onsuccess = function success() {
    // Do something with the request.result!
    console.log(request.result);
    document.getElementById('notelist').innerHTML = request.result.text;
    if (fromWeekly) {
      let unimportantNotes = document.querySelectorAll('bullet-note[data-important="false"]');
      unimportantNotes.forEach((u) => { u.remove(); });
      let noteTextboxes = document.querySelectorAll('.textbox');
      noteTextboxes.forEach((t) => {
        let t2 = t;
        t2.contentEditable = false;
      });
    }
  };

  event.preventDefault();
} /* viewNote */

/**
 * Updates a note to the DB. Should be called after editing notes.
 *
 * @param {event} - event default click event
 */
function updateNote(event) {
  const tx = db.transaction('personal_notes', 'readwrite');
  const pNotes = tx.objectStore('personal_notes');

  const today = new Date();
  const date = `${today.getFullYear()}-${today.getMonth() + 1
  }-${today.getDate()}`;
  const request = pNotes.get(date);

  request.onerror = function err(error) {
    // Handle errors!
    console.log(error);
  };
  request.onsuccess = function success(e) {
    // Do something with the request.result!
    const data = e.target.result;
    data.text = document.getElementById('notelist').innerHTML;

    const requestUpdate = pNotes.put(data);
    requestUpdate.onerror = function err(error) {
      console.log(error);
    };
    requestUpdate.onsuccess = function s() {
      console.log('updated');
    };
  };

  event.preventDefault();
} /* updateNote */

export {
  createDB, addNoteDB, updateNote, viewNote,
};
