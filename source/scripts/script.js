// db.js contains createDB, addNote, viewNote, updateNote
// TODO: Save sidebarOpen using IndexedDB, load it on page load, toggleMenu accordingly
let sidebarOpen = true;

// test comment
function toggleMenu() {
  let sidebar = document.getElementById("sidebar");
  let main = document.getElementsByTagName("main")[0];
  if (sidebarOpen) {
    sidebar.style.left = "calc(var(--sb-collapsed-width) - var(--sb-width))";
    main.style.marginLeft = "var(--sb-collapsed-width)";
    sidebarOpen = false;
  } else {
    sidebar.style.left = "0";
    main.style.marginLeft = "var(--sb-width)";
    sidebarOpen = true;
  }
}



window.onload = () => {
  document.getElementById("menubutton").onclick = toggleMenu;
  createDB();
  let shift = false;
  let bicons = ["fas fa-circle fa-fw", "fas fa-square fa-fw"];
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
}


