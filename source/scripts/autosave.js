var timer = null;

function getSticky() {
    var title = document.getElementsByClassName("note-title");
    var textarea = document.getElementsByClassName("note-textarea");
    return [title[0], textarea[0]];
}

function save() {
    var sticky = getSticky();
    if (sticky) {
        localStorage.setItem("AUTOSAVE_title" + document.location, sticky[0].value);
        localStorage.setItem("AUTOSAVE_textarea" + document.location, sticky[1].value);
    }
}

function restore() {
    var savedTitle = localStorage.getItem("AUTOSAVE_title" + document.location);
    var savedTextarea = localStorage.getItem("AUTOSAVE_textarea" + document.location);
    var sticky = getSticky();
    if ((savedTitle || savedTextarea) && sticky) {
        sticky[0].value = savedTitle;
        sticky[1].value = savedTextarea;
    }
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
    timer = setInterval(save, 3000);
}

start();