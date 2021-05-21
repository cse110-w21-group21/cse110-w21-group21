/* eslint-disable */

let db;
function createDB() {
  const request = indexedDB.open("noteDB", 1);

  // on upgrade needed --> if database doesn't exist
  request.onupgradeneeded = (e) => {
    db = e.target.result;

    const objStore = db.createObjectStore("personal_notes", {
      keyPath: "date",
    });
    objStore.createIndex("date", "date", { unique: false });
    console.log(
      `upgrade is called database name: ${db.name} version : ${db.version}`
    );
  };
  // on success
  request.onsuccess = (e) => {
    db = e.target.result;
    console.log(
      `success is called database name: ${db.name} version : ${db.version}`
    );
  };
  // on error
  request.onerror = (e) => {
    console.log(`error: ${e.target.error} was found `);
  };
} /* createDB  */

function addNoteDB(event) {
  // allRecords.innerHTML = "";
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
  console.log(note);

  const tx = db.transaction("personal_notes", "readwrite");
  tx.onerror = (e) => alert(` Error! ${e.target.error}  `);
  const pNotes = tx.objectStore("personal_notes");
  pNotes.add(note);
  event.preventDefault();
} /* addNote */

function viewNote(event) {
  const tx = db.transaction("personal_notes", "readonly");
  const pNotes = tx.objectStore("personal_notes");

  const thisDay = new Date(calendar.currentData.viewTitle);

  const date = `${thisDay.getFullYear()}-${
    thisDay.getMonth() + 1
  }-${thisDay.getDate()}`;

  console.log(date);
  console.log(pNotes.get(date));
  const request = pNotes.get(date);

  request.onerror = function err(error) {
    // Handle errors!
    console.log(error);
  };
  request.onsuccess = function success() {
    // Do something with the request.result!
    console.log(request.result);
    document.getElementById("notelist").innerHTML = request.result.text;
  };

  event.preventDefault();
} /* viewNote */

function updateNote(event) {
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
  request.onsuccess = function success(event) {
    // Do something with the request.result!
    const data = event.target.result;
    data.text = document.getElementById("notelist").innerHTML;

    const requestUpdate = pNotes.put(data);
    requestUpdate.onerror = function err(error) {
      console.log(error);
    };
    requestUpdate.onsuccess = function s() {
      console.log("updated");
    };
  };

  event.preventDefault();
} /* updateNote */


//calendar.currentData.toolbarConfig.headerToolbar.left[0].addEventListener(() => {viewNote()});
//calendar.currentData.toolbarConfig.headerToolbar.left[1].addEventListener(() => {viewNote()});