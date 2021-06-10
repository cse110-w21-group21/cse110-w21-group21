/*let timer = null;

function getSticky() {
    let title = document.getElementsByClassName("note-title");
    let textarea = document.getElementsByClassName("note-textarea");
    return [title[0], textarea[0]];
}

function save() {
    let sticky = getSticky();
    if (sticky) {
        localStorage.setItem("AUTOSAVE_title" + document.location, sticky[0].value);
        localStorage.setItem("AUTOSAVE_textarea" + document.location, sticky[1].value);
    }
}

function restore() {
    let savedTitle = localStorage.getItem("AUTOSAVE_title" + document.location);
    let savedTextarea = localStorage.getItem("AUTOSAVE_textarea" + document.location);
    let sticky = getSticky();
    if ((savedTitle || savedTextarea) && sticky) {
        sticky[0].value = savedTitle;
        sticky[1].value = savedTextarea;
    }
}

function start() {
    let editor = getSticky();
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
*/