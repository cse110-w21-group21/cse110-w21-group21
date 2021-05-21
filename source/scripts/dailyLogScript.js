/* eslint-disable */

let shift = false;
const bicons = ['fas fa-circle fa-fw bicon', 'fas fa-square fa-fw bicon'];
// const bnames = ['Note', 'Event'];

/**
 * Custom bullet-note element used for each editable bulleted item in the daily log
 */
class BulletNote extends HTMLElement {
  connectedCallback() {
    if (this.innerHTML.indexOf('textbox') === -1) {
      this.innerHTML = `
        <div class="${bicons[0]}"></div>
        <input type="time" class="bullettime">
        <p class="textbox" contenteditable=true></p>
        `;
    }
  }

  /**
   * @param {number} index
   */
  set bullet(index) {
    this.querySelectorAll('.bicon')[0].className = bicons[index];
  }
}
customElements.define('bullet-note', BulletNote);

/**
 * Creates a new blank note
 * Should only be used to add the first note when there are no other notes
 */
function addNote() {
  const noteList = document.getElementById('notelist');
  const newNote = document.createElement('bullet-note');
  newNote.className = 'bullet';
  newNote.dataset.starttime = false;
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

window.onload = () => {
  createDB();
  addNote();
};

document.getElementById("btnAddNote").addEventListener("click", addNoteDB);
document.getElementById("btnViewNote").addEventListener("click", viewNote);
document.getElementById("btnUpdateNote").addEventListener("click", updateNote);

/**
 * TODO: Click bullet point to change bullet icon
 */
document.getElementById('notelist').addEventListener('click', (event) => {
  if (event.target.classList.contains('bicon')) {
    // console.log("test");
  }
});

/**
 * Keyboard listener
 * Enter: Creates new note below current note
 * Shift-Enter: Creates new line in current note, does not create new note
 * Backspace: If current note is empty, delete current note
 */
document.getElementById('notelist').addEventListener('keydown', (event) => {
  if (event.key === 'Shift') {
    shift = true;
  }
  if (event.key === 'Enter' && event.target.className === 'textbox' && !shift) {
    event.preventDefault();
    const noteList = document.getElementById('notelist');
    const newNote = document.createElement('bullet-note');
    newNote.className = 'bullet';
    newNote.dataset.starttime = false;
    noteList.insertBefore(newNote, event.target.parentNode.nextSibling);
    newNote.getElementsByClassName('textbox')[0].focus();
  }
  if (
    event.key === 'Backspace'
    && event.target.className === 'textbox'
    && (event.target.innerHTML === '' || event.target.innerHTML === '<br>')
  ) {
    event.preventDefault();
    if (event.target.parentNode.previousElementSibling != null) {
      const textbox = event.target.parentNode.previousElementSibling.querySelector(
        '.textbox',
      );
      textbox.focus();
      setEndOfContenteditable(textbox);
    }
    event.target.parentNode.remove();
    if (document.getElementById('notelist').innerHTML.indexOf('bullet') === -1) {
      addNote();
    }
  }
});

document.getElementById('notelist').addEventListener('keyup', (event) => {
  if (event.key === 'Shift') {
    shift = false;
  }
});

/**
 * Bold text button
 */
document.getElementById('btnbold').addEventListener('click', () => {
  document.execCommand('bold');
});

/**
 * Used to prevent focus change when pressing bold text button
 */
document.getElementById('btnbold').addEventListener('mousedown', (event) => {
  event.preventDefault();
});

/**
 * Italic text button
 */
document.getElementById('btnitalic').addEventListener('click', () => {
  document.execCommand('italic');
});

/**
 * Used to prevent focus change when pressing italic text button
 */
document.getElementById('btnitalic').addEventListener('mousedown', (event) => {
  event.preventDefault();
});

/**
 * Underline text button
 */
document.getElementById('btnunder').addEventListener('click', () => {
  document.execCommand('underline');
});

/**
 * Used to prevent focus change when pressing underline text button
 */
document.getElementById('btnunder').addEventListener('mousedown', (event) => {
  event.preventDefault();
});

/**
 * Strikethrough text button
 */
document.getElementById('btnstrike').addEventListener('click', () => {
  document.execCommand('strikeThrough');
});

/**
 * Used to prevent focus change when pressing strikethrough text button
 */
document.getElementById('btnstrike').addEventListener('mousedown', (event) => {
  event.preventDefault();
});

/**
 * New Event button, adds a note with a time
 */
document.getElementById('newevent').addEventListener('click', () => {
  const noteList = document.getElementById('notelist');
  const newNote = document.createElement('bullet-note');
  newNote.className = 'bullet';
  newNote.dataset.starttime = true;
  noteList.appendChild(newNote);
  newNote.bullet = 1;
  newNote.getElementsByClassName('textbox')[0].focus();
});

/**
 * Used to prevent focus change when pressing New Event button
 */
document.getElementById('newevent').addEventListener('mousedown', (event) => {
  event.preventDefault();
});