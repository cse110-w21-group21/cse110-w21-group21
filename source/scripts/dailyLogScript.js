/* eslint import/extensions: "off" */
import { createDB, updateNote } from "./db.js";

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
 */
class BulletNote extends HTMLElement {
  connectedCallback() {
    if (this.innerHTML.indexOf("textbox") === -1) {
      this.innerHTML = `
        <div class="${bicons[0]} bicon"></div>
        <ul class="bdropdown"></ul>
        <input type="time" class="bullettime">
        <p class="textbox" contenteditable=true></p>
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
   * @param {number} index
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
  await createDB(false);
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
  // after 5 seconds of no keydowns update note
  timer = setTimeout(updateNote, 5000);
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
    event.key === "Backspace" &&
    event.target.className === "textbox" &&
    (event.target.innerHTML === "" || event.target.innerHTML === "<br>")
  ) {
    event.preventDefault();
    if (event.target.parentNode.previousElementSibling != null) {
      const textbox =
        event.target.parentNode.previousElementSibling.querySelector(
          ".textbox"
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
