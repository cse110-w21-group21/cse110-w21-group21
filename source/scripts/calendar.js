/* eslint-disable */
var calendar;

/**
 * Render the calendar and its logic
 * @param {events} data 
 */
function createCalendar(data) {
  var calendarEl = document.getElementById("calendar");

  calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    aspectRatio: 2,
    customButtons: {
      create: {
        text: 'create event',
        click: function () {
          popCreate.open();
        }
      },
    },
    headerToolbar: {
      right: 'create today prev,next'
    },

    /**
     * upon clicking a date move to that day
     * @param {Date} date 
     */
    dateClick: function (date) {
      localStorage.setItem('dateClicked', date.dateStr);
      location.href = "./dailyLog.html";
    },
    
    /**
     * upon clicking an event open the edit/delete form
     * @param {event} info 
     */
    eventClick: function (info) {
      popEdit.open(info);
    },

    events: data
  });

  calendar.render();
}

/** Create the calendar on load */
document.addEventListener('DOMContentLoaded', function () {
  let existing = localStorage.getItem('currentEvents');
  createCalendar(JSON.parse(existing));
});

/** Resize the calendar upon sidebar toggle */
const menuToggle = document.querySelector('main');
menuToggle.addEventListener('transitionend', () => {
  calendar.updateSize();
});

const eventCreation = document.getElementById('createEventForm');

/** Create an event and store it into local storage */
eventCreation.addEventListener('submit', function () {
  let inputTitle = document.getElementById('title').value;
  let startDate = document.getElementById('start').value;
  let endDate = document.getElementById('end').value;
  let colorSelection = document.getElementById('colorSelect').value;
  let description = document.getElementById('description').value;
  let existing = localStorage.getItem('currentEvents');

  if(inputTitle === "" || startDate === "") {
    //TODO: throw some error
    //need to notify the user that thier creation is invalid
  } else {
    if(startDate === endDate) {
      endDate = "";
    }
    let currEnd = new Date(new Date(endDate));
    currEnd.setDate(currEnd.getDate() + 2);

    console.log(currEnd.toUTCString().split('T')[0]);
    existing = JSON.parse(existing);
    if(Array.isArray(existing)) {
      existing.push({ title: inputTitle, start: startDate, end: endDate, color: colorSelection, description: description });
    } else {
      existing = { title: inputTitle, start: startDate, end: endDate, color: colorSelection, description: description }; 
      existing = [ existing ];
    }
    localStorage.setItem('currentEvents', JSON.stringify(existing));

    createCalendar(existing);
    popCreate.close();
  }
});

/**
 * popCreate is the functionality for rendering the create form
 */
var popCreate = {
  pWrap : document.getElementById("popupCreateEventForm"),

  open : function () {
    popCreate.pWrap.classList.add("open");
  },

  close : function () {
    popCreate.pWrap.classList.remove("open");
  }
};

/** Listen to the close create form button */
document.getElementById('popCloseCreateForm').addEventListener('click', () => {
  popCreate.close();
});

/**
 * popEdit is the functionality for rendering the edit/delete form
 */
var popEdit = {
  pWrap : document.getElementById("popupEditEventForm"),
  editTitle: document.getElementById("editTitle"),
  editColor: document.getElementById("editColorSelect"),
  editStart: document.getElementById("editStart"),
  editEnd: document.getElementById("editEnd"),
  editDescription: document.getElementById("editDescription"),
  currentInfo: null,

  /**
   * Open the form
   * @param {eventinfo} info 
   */
  open : function (info) {
    popEdit.currentInfo = info;
    popEdit.editTitle.value = info.event.title;
    popEdit.editColor.value = info.event.backgroundColor;
    popEdit.editStart.value = info.event.startStr;
    popEdit.editEnd.value = info.event.endStr;
    popEdit.editDescription.value = info.event.extendedProps.description;
    popEdit.pWrap.classList.add("open");
  },

  /** Close the form */
  close : function () {
    popEdit.pWrap.classList.remove("open");
  },

  /** Delete an event */
  delete : function () {
    popEdit.pWrap.classList.remove("open");
    let existing = localStorage.getItem('currentEvents');

    existing = JSON.parse(existing);

    /** Check to make sure the event is the right one */
    for (let i = 0; i < existing.length; i += 1) {
      if(existing[i].title === popEdit.currentInfo.event.title) {
        if(existing[i].start === popEdit.currentInfo.event.startStr) {
          if(existing[i].end === popEdit.currentInfo.event.endStr) {
            if(existing[i].color === popEdit.currentInfo.event.backgroundColor)
              if(existing[i].description === popEdit.currentInfo.event.extendedProps.description) {
                existing.splice(i,1);
              }
          }
        }
      }
    }

    /** Reset the saved currentEvents in localstorage */
    localStorage.setItem('currentEvents', JSON.stringify(existing));

    popEdit.currentInfo.event.remove()
  }
};

/** Listen for edit form submission */
document.getElementById('editEventForm').addEventListener('submit', () => {
  if (popEdit.editTitle === "" || popEdit.editStart === "") {
    //TODO: throw some sort of error here
    // need to notify the user that their edit is invalid
  } else {
    let existing = localStorage.getItem('currentEvents');

    existing = JSON.parse(existing);

    /** Check to make sure the event is the right one */
    for (let i = 0; i < existing.length; i += 1) {
      if(existing[i].title === popEdit.currentInfo.event.title) {
        if(existing[i].start === popEdit.currentInfo.event.startStr) {
          if(existing[i].end === popEdit.currentInfo.event.endStr) {
            if(existing[i].color === popEdit.currentInfo.event.backgroundColor)
              if(existing[i].description === popEdit.currentInfo.event.extendedProps.description) {
                if(popEdit.editTitle.value === "" || popEdit.editStart.value === "") {
                  //TODO: throw some error
                  //need to notify the user that thier creation is invalid
                } else {
                  if(popEdit.editStart.value === popEdit.editEnd.value) {
                    popEdit.editEnd.value = "";
                  }
                  existing[i].title = popEdit.editTitle.value;
                  existing[i].start = popEdit.editStart.value;
                  existing[i].end = popEdit.editEnd.value;
                  existing[i].color = popEdit.editColor.value;
                  existing[i].description = popEdit.editDescription.value;
                }
              }
          }
        }
      }
    }

    /** Reset the saved currentEvents in localstorage */
    localStorage.setItem('currentEvents', JSON.stringify(existing));
  }
});

/** Listen for close form button */
document.getElementById('popCloseEditForm').addEventListener('click', () => {
  popEdit.close();
});

/** Listen for delete event button */
document.getElementById('deleteEvent').addEventListener('click', () => {
  popEdit.delete();
})
