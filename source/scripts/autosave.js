var timer = null;

function getSticky() {
    var title = document.getElementsByClassName("note-title");
    var textarea = document.getElementsByClassName("note-textarea");
    return [title[0], textarea[0]];
}

function getContainer() {
    return document.getElementById('sticky-note-container');
}

function save() {
    var sticky = getSticky();
    if (sticky) {
        localStorage.setItem("AUTOSAVE_title" + document.location, sticky[0].value);
        localStorage.setItem("AUTOSAVE_textarea" + document.location, sticky[1].value);
    }
    // var container = getContainer();
    // if (container) {
    //     localStorage.setItem("AUTOSAVE_container" + document.location, container.innerHTML);
    // }
}

function restore() {
    var saved_title = localStorage.getItem("AUTOSAVE_title" + document.location);
    var saved_textarea = localStorage.getItem("AUTOSAVE_textarea" + document.location);
    var sticky = getSticky();
    if ((saved_title || saved_textarea) && sticky) {
        sticky[0].value = saved_title;
        sticky[1].value = saved_textarea;
    }
    // var saved_container = localStorage.getItem("AUTOSAVE_container" + document.location)
    // var container = getContainer();
    // if (container && saved_container) {
    //     container.innerHTML = saved_container;
    // }
}

function start() {
    var editor = getSticky();
    if (editor[0].value.length || editor[1].value.length <= 0) {
        restore();
    }
    if (timer) {
        clearInterval(timer);
        timer = null;
    }

    // autosaving every 5 seconds
    timer = setInterval(save, 3000);
}

start();