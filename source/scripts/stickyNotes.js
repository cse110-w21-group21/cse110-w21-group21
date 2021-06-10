/* eslint no-unused-vars: "off" */
/* eslint no-continue: "off" */
/* eslint no-alert: "off" */
/* eslint func-names: "off" */

let addNote = document.getElementById('note-add-btn');
let mainNote = document.querySelectorAll('.note');
let noteContainer = document.getElementById('sticky-note-container');
let colorList = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
let numberOfStickies = 0;

let redButton = document.querySelectorAll('#sticky-btn-red');
let orangeButton = document.querySelectorAll('#sticky-btn-orange');
let yellowButton = document.querySelectorAll('#sticky-btn-yellow');
let greenButton = document.querySelectorAll('#sticky-btn-green');
let blueButton = document.querySelectorAll('#sticky-btn-blue');
let purpleButton = document.querySelectorAll('#sticky-btn-purple');
let deleteButton = document.querySelectorAll('#sticky-btn-delete')

function reloadVariables() {
    mainNote = document.querySelectorAll('.note');
    redButton = document.querySelectorAll('#sticky-btn-red');
    orangeButton = document.querySelectorAll('#sticky-btn-orange');
    yellowButton = document.querySelectorAll('#sticky-btn-yellow');
    greenButton = document.querySelectorAll('#sticky-btn-green');
    blueButton = document.querySelectorAll('#sticky-btn-blue');
    purpleButton = document.querySelectorAll('#sticky-btn-purple');
    deleteButton = document.querySelectorAll('#sticky-btn-delete');
}

let onClickColorBtn = function (num, color) {
    mainNote[num].className = 'note note-' + color;
    let noteColors = localStorage.getItem('notepadColors');
    if(noteColors != null) {
        noteColors = JSON.parse(noteColors);
        if(noteColors[num]) {
            noteColors[num] = color;
            localStorage.setItem('notepadColors', JSON.stringify(noteColors));
        }
    }
}

let handlers = new Map();

function addEventListenerColorBtn(i) {

    let wrapAddRedBtn = onClickColorBtn.bind(null, i, 'red');
    let wrapAddOrangeBtn = onClickColorBtn.bind(null, i, 'orange');
    let wrapAddYellowBtn = onClickColorBtn.bind(null, i, 'yellow');
    let wrapAddGreenBtn = onClickColorBtn.bind(this, i, 'green');
    let wrapAddBlueBtn = onClickColorBtn.bind(this, i, 'blue');
    let wrapAddPurpleBtn = onClickColorBtn.bind(this, i, 'purple');

    handlers.set(i, [wrapAddRedBtn, wrapAddOrangeBtn, wrapAddYellowBtn, wrapAddGreenBtn, wrapAddBlueBtn, wrapAddPurpleBtn]);

    redButton[i].addEventListener('click', wrapAddRedBtn, false);
    orangeButton[i].addEventListener('click', wrapAddOrangeBtn, false);
    yellowButton[i].addEventListener('click', wrapAddYellowBtn, false);
    greenButton[i].addEventListener('click', wrapAddGreenBtn, false);
    blueButton[i].addEventListener('click', wrapAddBlueBtn, false);
    purpleButton[i].addEventListener('click', wrapAddPurpleBtn, false);
}

function removeEventListenerColorBtn(i) {
    redButton[i].removeEventListener('click', handlers.get(i)[0], false);
    orangeButton[i].removeEventListener('click', handlers.get(i)[1], false);
    yellowButton[i].removeEventListener('click', handlers.get(i)[2], false);
    greenButton[i].removeEventListener('click', handlers.get(i)[3], false);
    blueButton[i].removeEventListener('click', handlers.get(i)[4], false);
    purpleButton[i].removeEventListener('click', handlers.get(i)[5], false);
    handlers.delete(i);
}

function addEventListenerDeleteBtn(i) {
    
    deleteButton[i].addEventListener('click', function() {

        if (numberOfStickies === 0) {
            alert("cannot remove the last note!");
        } else {
            let j;
            for (j = 0; j <= numberOfStickies; j = j + 1) {
                removeEventListenerColorBtn(j);
            }
            // remove sticky
            if(mainNote[i] === undefined) {
                mainNote[i-1].remove();
                numberOfStickies = numberOfStickies - 1;
                // reload variables
                reloadVariables();
                let notepadHeaders = localStorage.getItem('notepadHeaders');
                let notepadBodies = localStorage.getItem('notepadBodies');
                let notepadColors = localStorage.getItem('notepadColors');
                if(notepadHeaders != null) {
                    notepadHeaders = JSON.parse(notepadHeaders);
                    if(notepadHeaders[i-1] != null) {
                        notepadHeaders.splice(i-1,1);
                        localStorage.setItem('notepadHeaders', JSON.stringify(notepadHeaders));
                    }
                    notepadBodies = JSON.parse(notepadBodies);
                    if(notepadBodies[i-1] != null) {
                        notepadBodies.splice(i-1,1);
                        localStorage.setItem('notepadBodies', JSON.stringify(notepadBodies));
                    }
                    notepadColors = JSON.parse(notepadColors);
                    if(notepadColors[i-1]) {
                        notepadColors.splice(i-1,1);
                        localStorage.setItem('notepadColors', JSON.stringify(notepadColors));
                    }
                }
            } else {
                mainNote[i].remove();
                numberOfStickies = numberOfStickies - 1;
                // reload variables
                reloadVariables();
                let notepadHeaders = localStorage.getItem('notepadHeaders');
                let notepadBodies = localStorage.getItem('notepadBodies');
                let notepadColors = localStorage.getItem('notepadColors');
                if(notepadHeaders != null) {
                    notepadHeaders = JSON.parse(notepadHeaders);
                    if(notepadHeaders[i] != null) {
                        notepadHeaders.splice(i,1);
                        localStorage.setItem('notepadHeaders', JSON.stringify(notepadHeaders));
                    }
                    notepadBodies = JSON.parse(notepadBodies);
                    if(notepadBodies[i] != null) {
                        notepadBodies.splice(i,1);
                        localStorage.setItem('notepadBodies', JSON.stringify(notepadBodies));
                    }
                    notepadColors = JSON.parse(notepadColors);
                    if(notepadColors[i]) {
                        notepadColors.splice(i,1);
                        localStorage.setItem('notepadColors', JSON.stringify(notepadColors));
                    }
                }
            }
            // add color button listeners for the rest of page
            for (j = 0; j <= numberOfStickies; j = j + 1) {
                addEventListenerColorBtn(j);
            }
        }
    });
}

addNote.addEventListener('click', function() {
    let cloneMainNote = mainNote[numberOfStickies].cloneNode(true);
    let randomColor = colorList[Math.floor(Math.random() * colorList.length)];
    cloneMainNote.querySelectorAll('input')[0].value = '';
    cloneMainNote.querySelectorAll('textarea')[0].value = '';
    cloneMainNote.className = 'note note-' + randomColor; 

    let noteColors = localStorage.getItem('notepadColors');
    noteColors = JSON.parse(noteColors);
    noteColors.push(randomColor);
    localStorage.setItem('notepadColors', JSON.stringify(noteColors));

    noteContainer.appendChild(cloneMainNote);
    reloadVariables();
    numberOfStickies = numberOfStickies + 1;
    addEventListenerColorBtn(numberOfStickies);
    addEventListenerDeleteBtn(numberOfStickies);
});

// setting up the first note on the page
addEventListenerColorBtn(0);
addEventListenerDeleteBtn(0);

function saveHeader() {
    let noteHeaders = [];
    for(let i = 0; i < mainNote.length; i += 1) {
        noteHeaders.push(mainNote[i].querySelector('input').value);
    }
    localStorage.setItem('notepadHeaders', JSON.stringify(noteHeaders));
};

function saveBody() {
    let noteBody = [];
    for(let i = 0; i < mainNote.length; i += 1) {
    noteBody.push(mainNote[i].querySelector('textarea').value);
    }
    localStorage.setItem('notepadBodies', JSON.stringify(noteBody));
};

document.addEventListener('DOMContentLoaded', function(event) {
    let notepadHeaders = localStorage.getItem('notepadHeaders');
    let notepadBodies = localStorage.getItem('notepadBodies');
    let notepadColors = localStorage.getItem('notepadColors');
    if(notepadColors === null) {
        localStorage.setItem('notepadColors', JSON.stringify(['red']));
    }
    notepadColors = JSON.parse(notepadColors);

    if(notepadHeaders !== null) {
        notepadHeaders = JSON.parse(notepadHeaders);
        if(notepadColors.length > notepadHeaders.length) {
            notepadColors.splice(notepadHeaders.length, notepadColors.length - notepadHeaders.length);
            localStorage.setItem('notepadColors', JSON.stringify(notepadColors));
        }
        for(let i = 0; i < notepadHeaders.length; i+= 1) {
            if(i === 0) {
                mainNote[i].querySelector('input').value = notepadHeaders[i];
                mainNote[i].className = 'note note-' + notepadColors[i];
                continue;
            }
            let cloneMainNote = mainNote[numberOfStickies].cloneNode(true);
            cloneMainNote.querySelectorAll('input')[0].value = notepadHeaders[i];
            cloneMainNote.querySelectorAll('textarea')[0].value = '';
            cloneMainNote.className = 'note note-' + notepadColors[i]; 
            noteContainer.appendChild(cloneMainNote);
            reloadVariables();
            numberOfStickies = numberOfStickies + 1;
            addEventListenerColorBtn(numberOfStickies);
            addEventListenerDeleteBtn(numberOfStickies);
        }
    }
    if(notepadBodies !== null) {
        notepadBodies = JSON.parse(notepadBodies);
        for(let j = 0; j < notepadBodies.length; j+= 1) {
            mainNote[j].querySelector('textarea').value = notepadBodies[j];
        }
    }
});