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
  let startTime = document.getElementById('startTime').value;
  let endTime = document.getElementById('endTime').value;

  if(inputTitle === "" || startDate === "") {
    //TODO: throw some error
    //need to notify the user that their creation is invalid
  } else {
    if(endDate === "") {
      endDate = startDate;
    }

    if(startTimeElement.style.display === "block") {
      if(startTime !== "" && endTime !== "" && startTime < endTime) {
        currEnd=startDate+"T"+endTime;
        startDate+="T"+startTime;
      } else {
        // NEED AN ERROR TO SAY INVALID TIME RANGE
        return;
      }
    } else {
      currEnd = new Date(new Date(endDate));
      currEnd.setDate(currEnd.getDate() + 2);
      currEnd = formatDate(currEnd)
    }

    if(!isNaN(currEnd[0]) && currEnd > startDate) {
      existing = JSON.parse(existing);
      if(Array.isArray(existing)) {
        existing.push({ title: inputTitle, start: startDate, end: currEnd, color: colorSelection, description: description });
      } else {
        existing = { title: inputTitle, start: startDate, end: currEnd, color: colorSelection, description: description }; 
        existing = [ existing ];
      }
      localStorage.setItem('currentEvents', JSON.stringify(existing));
  
      createCalendar(existing);
      popCreate.close();
    } else {
      //the end date is before the start date
      //need to notify the user their creation is invalid
    }
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
  editStartTime: document.getElementById("editStartTime"),
  editEndTime: document.getElementById("editEndTime"),
  currentInfo: null,

  /**
   * Open the form
   * @param {eventinfo} info 
   */
  open : function (info) {
    popEdit.currentInfo = info;
    popEdit.editTitle.value = info.event.title;
    popEdit.editColor.value = info.event.backgroundColor;
    if (info.event.startStr.includes("T")) {
      let currEnd = info.event.endStr.split("T");
      let currStart = info.event.startStr.split("T");
      popEdit.editStart.value = currStart[0];
      popEdit.editEnd.value = currEnd[0];
      popEdit.editStartTime.value = currStart[1].substr(0,5);
      popEdit.editEndTime.value = currEnd[1].substr(0,5);
      document.getElementById("editTimeDIV").style.display = "block";
      popEdit.editEnd.disabled = true;
    } else {
      let currEnd = new Date(new Date(info.event.endStr));
      currEnd.setDate(currEnd.getDate());
      popEdit.editStart.value = info.event.startStr;
      popEdit.editEnd.value = formatDate(currEnd);
      document.getElementById("editTimeDIV").style.display = "none";
    }
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
        if(existing[i].start.split("T")[0] === popEdit.currentInfo.event.startStr.split("T")[0]) {
          if(existing[i].end.split("T")[0] === popEdit.currentInfo.event.endStr.split("T")[0]) {
            if(existing[i].color === popEdit.currentInfo.event.backgroundColor)
              if(existing[i].description === popEdit.currentInfo.event.extendedProps.description) {
                if(popEdit.editTitle.value === "" || popEdit.editStart.value === "") {
                  //TODO: throw some error
                  //need to notify the user that thier creation is invalid
                } else {
                  let currStart = popEdit.editStart.value;
                  if(document.getElementById("editTimeDIV").style.display === "block") {
                    if(popEdit.editStartTime.value !== "" && popEdit.editEndTime.value !== "" && popEdit.editStartTime.value < popEdit.editEndTime.value) {
                      currEnd=currStart+"T"+popEdit.editEndTime.value;
                      currStart+="T"+popEdit.editStartTime.value;
                    } else {
                      // NEED AN ERROR TO SAY INVALID TIME RANGE
                      return;
                    }
                  } else {
                    currEnd = new Date(new Date(popEdit.editEnd.value));
                    currEnd.setDate(currEnd.getDate() + 2);
                    currEnd = formatDate(currEnd);
                  }

                  if(!isNaN(currEnd[0]) && currEnd > popEdit.editStart.value) {
                    existing[i].title = popEdit.editTitle.value;
                    existing[i].start = currStart;
                    existing[i].end = currEnd;
                    existing[i].color = popEdit.editColor.value;
                    existing[i].description = popEdit.editDescription.value;
                  } else {
                    //the end date is before the start date
                    //need to notify the user that their creation is invalid
                  }
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

/**
 * format date to proper fullcalendar syntax
 * @param {Date} date 
 * @returns formatted date 
 */
function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
};

const startTimeElement = document.getElementById('timeDIV');
document.getElementById('isDayEvent').addEventListener('click', () => {
  if(startTimeElement.style.display === "none") {
    startTimeElement.style.display = "block";
    document.getElementById("end").disabled = true;
  } else {
    startTimeElement.style.display = "none";
    document.getElementById("end").disabled = false;
  }
});