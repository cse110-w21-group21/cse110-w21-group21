/* eslint-disable */
import {
  createDB, updateNote, db, viewNote, addNoteDB,
} from "./db.js";

let shift = false;
let timer = null;
const bicons = [
  "fas fa-circle fa-fw",
  "fas fa-square fa-fw",
  "fas fa-star fa-fw",
];
// const bnames = ['Note', 'Task'];
const importantBicons = ["fas fa-star fa-fw"];

/**
 * Custom bullet-note element used for each editable bulleted item in the daily log
 * Creates the bullet note and populates the bullet dropdown menu
 */
class BulletNote extends HTMLElement {
  connectedCallback() {
    if (this.innerHTML.indexOf("textbox") === -1) {
      this.innerHTML = `
        <div class="${bicons[0]} bicon"></div>
        <ul class="bdropdown"></ul>
        <input type="time" class="bullettime">
        <p class="textbox" contenteditable=true></p>
        <div class="delete-note fas fa-trash fa-fw" onclick="deleteNote(this)"></div>
        `;
      let dropdown = this.querySelector(".bdropdown");
      dropdown.dataset.show = false;
      for (let i = 0; i < bicons.length; i += 1) {
        let option = document.createElement("li");
        option.classList.add("bdropdown-option");
        option.dataset.bindex = i;
        let optionIcon = document.createElement("div");
        optionIcon.className = bicons[i];
        optionIcon.classList.add("bdropdown-option-icon");
        option.appendChild(optionIcon);
        dropdown.appendChild(option);
        option.addEventListener("click", () => {
          let myIndex = option.dataset.bindex;
          this.querySelector(".bicon").className = `${bicons[myIndex]} bicon`;
          this.dataset.important = importantBicons.includes(bicons[myIndex]);
        });
      }
    }
  }

  /**
   * Sets the bullet icon of the note
   * @param {number} index - index of the bullet icon
   */
  set bullet(index) {
    this.querySelectorAll(".bicon")[0].className = `${bicons[index]} bicon`;
  }
}
customElements.define("bullet-note", BulletNote);

/**
 * Creates a new blank note
 * Should only be used to add the first note when there are no other notes
 */
function addNote() {
  const noteList = document.getElementById("notelist");
  const newNote = document.createElement("bullet-note");
  newNote.className = "bullet";
  newNote.dataset.starttime = false;
  newNote.dataset.important = false;
  noteList.appendChild(newNote);
  // newNote.getElementsByClassName("textbox")[0].focus();
}

window.deleteNote = function deleteNote(e) {
  e.parentNode.remove();
  if (
    document.getElementById("notelist").innerHTML.indexOf("bullet") === -1
  ) {
    addNote();
  }
}

/**
 * Loads the dropdown menus for each note and adds event listeners
 * Should be called after any time notes are loaded in daily log
 */
function loadDropdowns() {
  let myNotes = document.querySelectorAll('bullet-note');
  myNotes.forEach((n) => {
    let thisNote = n;
    let dropdown = thisNote.querySelector(".bdropdown");
    dropdown.innerHTML = "";
    dropdown.dataset.show = false;
    for (let i = 0; i < bicons.length; i += 1) {
      let option = document.createElement("li");
      option.classList.add("bdropdown-option");
      option.dataset.bindex = i;
      let optionIcon = document.createElement("div");
      optionIcon.className = bicons[i];
      optionIcon.classList.add("bdropdown-option-icon");
      option.appendChild(optionIcon);
      dropdown.appendChild(option);
      option.addEventListener("click", () => {
        let myIndex = option.dataset.bindex;
        thisNote.querySelector(".bicon").className = `${bicons[myIndex]} bicon`;
        thisNote.dataset.important = importantBicons.includes(bicons[myIndex]);
      });
    }
  });
}

/**
 * setEndOfContenteditable authored by Nico Burns on Stack Overflow
 * https://stackoverflow.com/questions/1125292/how-to-move-cursor-to-end-of-contenteditable-entity/3866442#3866442
 * https://stackoverflow.com/users/140293/nico-burns
 *
 * @param {Element} contentEditableElement
 */
function setEndOfContenteditable(contentEditableElement) {
  let range;
  let selection;
  // Firefox, Chrome, Opera, Safari, IE 9+
  if (document.createRange) {
    // Create a range (a range is a like the selection but invisible)
    range = document.createRange();
    // Select the entire contents of the element with the range
    range.selectNodeContents(contentEditableElement);
    // collapse the range to the end point. false means collapse to end rather than the start
    range.collapse(false);
    // get the selection object (allows you to change selection)
    selection = window.getSelection();
    // remove any selections already made
    selection.removeAllRanges();
    // make the range you have just created the visible selection
    selection.addRange(range);
  } else if (document.selection) {
    // IE 8 and lower
    // Create a range (a range is a like the selection but invisible)
    range = document.body.createTextRange();
    // Select the entire contents of the element with the range
    range.moveToElementText(contentEditableElement);
    // collapse the range to the end point. false means collapse to end rather than the start
    range.collapse(false);
    // Select the range (make it the visible selection
    range.select();
  }
}

/*
 * This method will start the DB process and
 * add the current days note if it exists
 */
window.onload = async () => {
  await createDB(false, loadDropdowns);
  addNote();
};

/*
 * This method will update the note db between
 * clicking on different pages
 */
window.onbeforeunload = () => {
  // save note data
  updateNote();
};

/**
 * Click listener
 * Used for the bullet dropdown on each bullet note
 * If element clicked is a bullet, open the corresponding dropdown
 * Otherwise, close all dropdowns
 */
document.addEventListener("click", (event) => {
  // close all dropdowns
  let dropwdowns = document.querySelectorAll(".bdropdown");
  dropwdowns.forEach((e) => {
    e.dataset.show = false;
  });
  // open dropdown for bullet note
  if (event.target.classList.contains("bicon")) {
    // toggleNoteImportance(event.target.parentNode);
    let myDropdown = event.target.parentNode.querySelector(".bdropdown");
    myDropdown.dataset.show = true;
  }
});

/**
 * Keyboard listener
 * Enter: Creates new note below current note
 * Shift-Enter: Creates new line in current note, does not create new note
 * Backspace: If current note is empty, delete current note
 */
document.getElementById("notelist").addEventListener("keydown", (event) => {
  // on every keydown reset timer
  if (timer != null) {
    clearTimeout(timer);
    timer = null;
  }
  // after 3 seconds of no keydowns update note
  timer = setTimeout(updateNote, 3000);
  if (event.key === "Shift") {
    shift = true;
  }
  if (event.key === "Enter" && event.target.className === "textbox" && !shift) {
    event.preventDefault();
    const noteList = document.getElementById("notelist");
    const newNote = document.createElement("bullet-note");
    newNote.className = "bullet";
    newNote.dataset.starttime = false;
    newNote.dataset.important = false;
    noteList.insertBefore(newNote, event.target.parentNode.nextSibling);
    newNote.getElementsByClassName("textbox")[0].focus();
  }
  if (
    event.key === "Backspace"
    && event.target.className === "textbox"
    && (event.target.innerHTML === "" || event.target.innerHTML === "<br>")
  ) {
    event.preventDefault();
    if (event.target.parentNode.previousElementSibling != null) {
      const textbox = event.target.parentNode.previousElementSibling.querySelector(
        ".textbox",
      );
      textbox.focus();
      setEndOfContenteditable(textbox);
    }
    event.target.parentNode.remove();
    if (
      document.getElementById("notelist").innerHTML.indexOf("bullet") === -1
    ) {
      addNote();
    }
  }
});

/**
 * Keyup listener
 * Used to check if shift key is released
 */
document.getElementById("notelist").addEventListener("keyup", (event) => {
  if (event.key === "Shift") {
    shift = false;
  }
});

/**
 * Bold text button
 */
document.getElementById("btnbold").addEventListener("click", () => {
  document.execCommand("bold");
});

/**
 * Used to prevent focus change when pressing bold text button
 */
document.getElementById("btnbold").addEventListener("mousedown", (event) => {
  event.preventDefault();
});

/**
 * Italic text button
 */
document.getElementById("btnitalic").addEventListener("click", () => {
  document.execCommand("italic");
});

/**
 * Used to prevent focus change when pressing italic text button
 */
document.getElementById("btnitalic").addEventListener("mousedown", (event) => {
  event.preventDefault();
});

/**
 * Underline text button
 */
document.getElementById("btnunder").addEventListener("click", () => {
  document.execCommand("underline");
});

/**
 * Used to prevent focus change when pressing underline text button
 */
document.getElementById("btnunder").addEventListener("mousedown", (event) => {
  event.preventDefault();
});

/**
 * Strikethrough text button
 */
document.getElementById("btnstrike").addEventListener("click", () => {
  document.execCommand("strikeThrough");
});

/**
 * Used to prevent focus change when pressing strikethrough text button
 */
document.getElementById("btnstrike").addEventListener("mousedown", (event) => {
  event.preventDefault();
});

/**
 * New Event button, adds a note with a time
 */
/*
document.getElementById('newevent').addEventListener('click', () => {
  const noteList = document.getElementById('notelist');
  const newNote = document.createElement('bullet-note');
  newNote.className = 'bullet';
  newNote.dataset.starttime = true;
  noteList.appendChild(newNote);
  newNote.bullet = 1;
  newNote.getElementsByClassName("textbox")[0].focus();
});
*/

/**
 * Used to save notes when enter is pressed
 */
document.getElementById("notelist").addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    updateNote();
  }
});

/**
 * Listener for prev/next buttons on calendar for daily log
 * Will change calendar date and update user's notes accordingly
 * Pulls up any saved notes for the selected day or a blank bullet
 * list for a new day
 */
document.addEventListener("click", (e) => {
  if (
    e.target.className === "fc-next-button fc-button fc-button-primary"
    || e.target.className === "fc-prev-button fc-button fc-button-primary"
    || e.target.className === "fc-icon fc-icon-chevron-right"
    || e.target.className === "fc-icon fc-icon-chevron-left"
    || e.target.className === "fc-today-button fc-button fc-button-primary"
  ) {
    const tx = db.transaction("personal_notes", "readwrite");
    const pNotes = tx.objectStore("personal_notes");
    const thisDay = new Date(calendar.currentData.viewTitle);
    const date = `${thisDay.getFullYear()}-${thisDay.getMonth() + 1
      }-${thisDay.getDate()}`;
    const request = pNotes.openCursor(date);
    request.onsuccess = function () {
      let cursor = e.target.result;
      if (cursor) {
        // date already exists in database
        viewNote(loadDropdowns);
      } else {
        // date does not exist in database
        document.getElementById("notelist").innerHTML = "";
        addNote();
        addNoteDB(false, loadDropdowns);
      }
    };
  }
});

export { addNote };