//prefixes of implementation that we want to test
window.indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB;

//prefixes of window.IDB objects
window.IDBTransaction =
  window.IDBTransaction ||
  window.webkitIDBTransaction ||
  window.msIDBTransaction;
window.IDBKeyRange =
  window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

if (!window.indexedDB) {
  window.alert("Your browser doesn't support a stable version of IndexedDB.");
}

window.onload = () => {
  let shift = false;
  let bicons = ["fas fa-circle fa-fw", "fas fa-square fa-fw"];
  let bnames = ["Note", "Event"];
  let db = null;
  createDB();

  document.getElementById("noteList").addEventListener("click", (event) => {
    if (event.target.classList.contains("fas")) {
      console.log("test");
    }
  });

  document.getElementById("noteList").addEventListener("keydown", (event) => {
    if (event.key == "Shift") {
      shift = true;
    }
    if (event.key == "Enter" && event.target.className == "textbox" && !shift) {
      event.preventDefault();
      let noteList = document.getElementById("noteList");
      let newNote = document.createElement("li");
      let newNoteText = document.createElement("p");
      let newNoteBullet = document.createElement("div");
      //let newNoteTime = document.createElement("input");
      newNoteText.className = "textbox";
      newNoteText.contentEditable = true;
      newNoteBullet.className = bicons[0];
      //newNoteTime.className = "bullettime";
      //newNoteTime.type = "time";
      newNote.className = "bullet";
      newNote.appendChild(newNoteBullet);
      //newNote.appendChild(newNoteTime);
      newNote.appendChild(newNoteText);
      noteList.insertBefore(newNote, event.target.parentNode.nextSibling);
      newNoteText.focus();
    }
    if (
      event.key == "Backspace" &&
      event.target.className == "textbox" &&
      (event.target.innerHTML === "" || event.target.innerHTML === "<br>")
    ) {
      event.preventDefault();
      let textbox = event.target.parentNode.previousElementSibling.querySelector(
        ".textbox"
      );
      textbox.focus();
      setEndOfContenteditable(textbox);
      event.target.parentNode.remove();
    }
  });

  document.getElementById("noteList").addEventListener("keyup", (event) => {
    if (event.key == "Shift") {
      shift = false;
    }
  });

  document.getElementById("btnBold").addEventListener("click", () => {
    document.execCommand("bold");
  });
  document.getElementById("btnBold").addEventListener("mousedown", () => {
    event.preventDefault();
  });

  document.getElementById("btnItalic").addEventListener("click", () => {
    document.execCommand("italic");
  });
  document.getElementById("btnItalic").addEventListener("mousedown", () => {
    event.preventDefault();
  });

  document.getElementById("btnUnder").addEventListener("click", () => {
    document.execCommand("underline");
  });
  document.getElementById("btnUnder").addEventListener("mousedown", (event) => {
    event.preventDefault();
  });

  document.getElementById("btnStrike").addEventListener("click", () => {
    document.execCommand("strikeThrough");
  });
  document
    .getElementById("btnStrike")
    .addEventListener("mousedown", (event) => {
      event.preventDefault();
    });
  document.getElementById("btnAddNote").addEventListener("click", addNote);
  document.getElementById("btnViewNote").addEventListener("click", viewNote);
  document
    .getElementById("btnUpdateNote")
    .addEventListener("click", updateNote);

  document.getElementById("newevent").addEventListener("click", () => {
    let noteList = document.getElementById("noteList");
    let newNote = document.createElement("li");
    let newNoteText = document.createElement("p");
    let newNoteTime = document.createElement("input");
    let newNoteBullet = document.createElement("div");
    newNoteText.className = "textbox";
    newNoteText.contentEditable = true;
    newNoteTime.className = "bullettime";
    newNoteBullet.className = bicons[1];
    newNoteTime.type = "time";
    fbic;
    newNote.className = "bullet";
    newNote.appendChild(newNoteBullet);
    newNote.appendChild(newNoteTime);
    newNote.appendChild(newNoteText);
    noteList.appendChild(newNote);
    newNoteText.focus();
  });
  document.getElementById("newevent").addEventListener("mousedown", (event) => {
    event.preventDefault();
  });

  /*
  setEndOfContenteditable authored by Nico Burns on Stack Overflow
  https://stackoverflow.com/questions/1125292/how-to-move-cursor-to-end-of-contenteditable-entity/3866442#3866442
  https://stackoverflow.com/users/140293/nico-burns
  */
  function setEndOfContenteditable(contentEditableElement) {
    var range, selection;
    if (document.createRange) {
      //Firefox, Chrome, Opera, Safari, IE 9+
      range = document.createRange(); //Create a range (a range is a like the selection but invisible)
      range.selectNodeContents(contentEditableElement); //Select the entire contents of the element with the range
      range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
      selection = window.getSelection(); //get the selection object (allows you to change selection)
      selection.removeAllRanges(); //remove any selections already made
      selection.addRange(range); //make the range you have just created the visible selection
    } else if (document.selection) {
      //IE 8 and lower
      range = document.body.createTextRange(); //Create a range (a range is a like the selection but invisible)
      range.moveToElementText(contentEditableElement); //Select the entire contents of the element with the range
      range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
      range.select(); //Select the range (make it the visible selection
    }
  }
  function createDB() {
    const request = indexedDB.open("noteDB", 1);

    // on upgrade needed --> if database doesn't exist
    request.onupgradeneeded = (e) => {
      db = e.target.result;

      let objStore = db.createObjectStore("personal_notes", {
        keyPath: "date",
      });

      console.log(
        `upgrade is called database name: ${db.name} version : ${db.version}`
      );
    };
    //on success
    request.onsuccess = (e) => {
      db = e.target.result;
      console.log(
        `success is called database name: ${db.name} version : ${db.version}`
      );
    };
    //on error
    request.onerror = (e) => {
      console.log(`error: ${e.target.error} was found `);
    };
  } /* createDB  */

  function addNote(event) {
    // allRecords.innerHTML = "";
    const today = new Date();
    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    const noteString = document.getElementById("noteList").innerHTML;
    const note = {
      time: Math.floor(Date.now() / 1000),
      date: date,
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

    const today = new Date();
    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    const request = pNotes.get(date);

    request.onerror = function (event) {
      // Handle errors!
      console.log(error);
    };
    request.onsuccess = function (event) {
      // Do something with the request.result!
      document.getElementById("noteList").innerHTML = request.result.text;
    };

    event.preventDefault();
  } /* viewNote */

  function updateNote(event) {
    const tx = db.transaction("personal_notes", "readwrite");
    const pNotes = tx.objectStore("personal_notes");

    const today = new Date();
    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    const request = pNotes.get(date);

    request.onerror = function (event) {
      // Handle errors!
      console.log(error);
    };
    request.onsuccess = function (event) {
      // Do something with the request.result!
      let data = event.target.result;
      data.text = document.getElementById("noteList").innerHTML;

      let requestUpdate = pNotes.put(data);
      requestUpdate.onerror = function (event) {
        console.log(error);
      };
      requestUpdate.onsuccess = function (event) {
        console.log("updated");
      };
    };

    event.preventDefault();
  } /* updateNote */
};
