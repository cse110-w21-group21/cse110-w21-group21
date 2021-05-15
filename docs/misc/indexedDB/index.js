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
  let db = null;
  const btnAddNote = document.getElementById("btnAddNote");
  const btnViewNotes = document.getElementById("btnViewNotes");
  const btnReset = document.getElementById("reset");
  const bulletTxt = document.getElementById("text");
  const bulletImp = document.getElementById("bulletImp");
  const reminder = document.getElementById("reminderTime");
  const allRecords = document.getElementById("allRecords");
  const divv = document.getElementById("divv");
  const parent = document.getElementById("Parent");

  createDB();
  btnAddNote.addEventListener("click", addNote);
  btnViewNotes.addEventListener("click", viewNotes);
  btnReset.addEventListener("click", reset);
  divv.addEventListener("keyup", addListener);

  function addListener(e) {
    if (e.code === "Enter") {
      const node = document.createElement("DIV");

      node.contentEditable = true;
      // recursion
      node.addEventListener("keyup", addListener);
      parent.appendChild(node);
      // console.log(node);
      console.log(this.innerHTML);

      // get rid of extra line break when nothing is entered in the div
      if (this.innerHTML === "<div><br></div><div><br></div>") {
        document.execCommand("delete");
      }
      document.execCommand("delete");

      console.log(parent.innerText);
      node.focus();
      e.preventDefault();
    }
  }

  function viewNotes(event) {
    const tx = db.transaction("personal_notes", "readonly");
    const pNotes = tx.objectStore("personal_notes");
    const request = pNotes.openCursor();
    allRecords.innerHTML = "";
    request.onsuccess = (e) => {
      const cursor = e.target.result;
      if (cursor) {
        const node = document.createElement("LI"); // Create a <li> node
        const textnode = document.createTextNode(
          `Time: ${cursor.value.time} :: Date: ${cursor.value.date} :: 
          Text: ${cursor.value.text} :: BulletImportance: ${cursor.value.bulletImp} :: 
          Reminder: ${cursor.value.reminder}`
        ); // Create a text node
        node.appendChild(textnode); // Append the text to <li>
        allRecords.appendChild(node); // Append <li> to <ul>
        cursor.continue();
      }
    };
    event.preventDefault();
  }

  function reset(event) {
    allRecords.innerHTML = "";
  }

  function addNote(event) {
    allRecords.innerHTML = "";
    const today = new Date();
    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    const note = {
      time: Math.floor(Date.now() / 1000),
      date: date,
      text: bulletTxt.value,
      bulletImp: bulletImp.value,
      reminder: reminder.value,
    };
    console.log(note);
    const tx = db.transaction("personal_notes", "readwrite");
    tx.onerror = (e) => alert(` Error! ${e.target.error}  `);
    const pNotes = tx.objectStore("personal_notes");
    pNotes.add(note);
    event.preventDefault();
  }

  function createDB() {
    const request = indexedDB.open("noteDB", 1);

    // on upgrade needed --> if database doesn't exist
    request.onupgradeneeded = (e) => {
      db = e.target.result;
      /* note = {
                    title: "note1",
                    text: "this is a note"
                }*/
      const pNotes = db.createObjectStore("personal_notes", {
        keyPath: "time",
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
  }
};

function deleteData() {
  // open a read/write db transaction, ready for deleting the data
  const transaction = db.transaction(["personal_notes"], "readwrite");

  // report on the success of the transaction completing, when everything is done
  transaction.oncomplete = function (event) {
    console.log("<li>Transaction completed.</li>");
  };

  transaction.onerror = function (event) {
    console.log(
      "<li>Transaction not opened due to error: " + transaction.error + "</li>"
    );
  };

  // create an object store on the transaction
  const objectStore = transaction.objectStore("personal_notes");

  var objectStoreRequest = objectStore.delete("Walk dog");

  objectStoreRequest.onsuccess = function (event) {
    console.log("<li>Request successful.</li>");
  };
}
